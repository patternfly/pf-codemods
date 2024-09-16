import { Rule } from "eslint";
import {
  IdentifierWithParent,
  ImportSpecifierWithParent,
  getDefaultImportsFromPackage,
  getFromPackage,
  getImportPath,
} from "../../helpers";
import {
  Identifier,
  ImportDeclaration,
  ImportSpecifier,
  Literal,
} from "estree-jsx";
import {
  oldTokens,
  oldCssVarNamesV5,
  globalNonColorTokensMap,
  oldGlobalNonColorTokens,
  globalNonColorCssVarNamesMap,
  oldGlobalColorCssVarNames,
  oldGlobalColorTokens,
} from "../../../tokenLists";

module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const tokensPackage = "@patternfly/react-tokens";

    const { imports: tokenSpecifiers } = getFromPackage(context, tokensPackage);

    const defaultTokenImports = getDefaultImportsFromPackage(
      context,
      tokensPackage
    )
      .map((specifier) => ({
        specifier,
        path: getImportPath(specifier),
        declaration: specifier.parent,
      }))
      .filter(({ path }) => path !== undefined)
      .map(({ specifier, path, declaration }) => ({
        specifier,
        token: (path as string).split("/").pop() as string,
        declaration,
      }));

    const getWarnMessage = (tokenName: string) =>
      `${tokenName} is an old CSS token. About half of our tokens have been replaced with newer ones. To find a suitable replacement token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

    const getFixMessage = (oldToken: string, newToken: string) =>
      `${oldToken} is an old CSS token and has been replaced with ${newToken}. If you want to use a different token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

    const getColorFixMessage = (oldToken: string, isReactToken = false) =>
      `${oldToken} is an old color token. This codemod will replace it with a temporary hot pink color token ${
        isReactToken ? "temp_dev_tbd" : "--pf-t--temp--dev--tbd"
      } to prevent build errors. You should find a suitable replacement token in our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

    const shouldReplaceToken = (token: string) =>
      oldGlobalNonColorTokens.includes(token) &&
      globalNonColorTokensMap[token as keyof typeof globalNonColorTokensMap] !==
        "SKIP";

    const replaceToken = (
      node: ImportDeclaration | ImportSpecifier | Identifier,
      oldToken: string
    ) => {
      const newToken =
        globalNonColorTokensMap[
          oldToken as keyof typeof globalNonColorTokensMap
        ];

      context.report({
        node,
        message: getFixMessage(oldToken, newToken),
        fix(fixer) {
          if (node.type === "ImportDeclaration") {
            const newDeclaration = node.source.value
              ?.toString()
              .replace(oldToken, newToken) as string;

            return [
              fixer.replaceText(node.specifiers[0], newToken),
              fixer.replaceText(node.source, `"${newDeclaration}"`),
            ];
          }

          if (node.type === "ImportSpecifier") {
            return fixer.replaceText(node.imported, newToken);
          }

          return fixer.replaceText(node, newToken);
        },
      });
    };

    const updateColorTokenImport = (
      node: ImportSpecifierWithParent | ImportDeclaration,
      token: string
    ) => {
      if (node.type === "ImportDeclaration") {
        context.report({
          node,
          message: getColorFixMessage(token, true),
          fix(fixer) {
            const newDeclaration = node.source.value
              ?.toString()
              .replace(token, "temp_dev_tbd") as string;

            return [
              fixer.insertTextAfter(
                node.specifiers[0],
                "/* CODEMODS: you should update this color token */"
              ),
              fixer.replaceText(node.source, `"${newDeclaration}"`),
            ];
          },
        });
        return;
      }

      const hasAlias = node.local.name !== node.imported.name;
      const comment = `/* CODEMODS: you should update this color token${
        hasAlias ? `, original v5 token was ${node.imported.name}` : ""
      } */`;

      context.report({
        node,
        message: getColorFixMessage(token, true),
        fix(fixer) {
          const fixes = [
            fixer.replaceText(
              node,
              `temp_dev_tbd as ${node.local.name} ${comment}`
            ),
          ];

          const packagePath = getImportPath(node) as string;
          if (packagePath.includes(token)) {
            const newPath = packagePath.replace(token, "temp_dev_tbd");
            fixes.push(fixer.replaceText(node.parent?.source!, `"${newPath}"`));
          }

          return fixes;
        },
      });
    };

    const handleToken = (
      node: ImportSpecifier | ImportDeclaration,
      token: string
    ) => {
      if (oldGlobalColorTokens.includes(token)) {
        updateColorTokenImport(node, token);
        return;
      }

      if (shouldReplaceToken(token)) {
        replaceToken(node, token);
        return;
      }

      if (oldTokens.includes(token)) {
        context.report({
          node,
          message: getWarnMessage(token),
        });
      }
    };

    return {
      ImportSpecifier(node: ImportSpecifier) {
        if (tokenSpecifiers.includes(node)) {
          const token = node.imported.name;
          handleToken(node, token);
        }
      },
      ImportDeclaration(node: ImportDeclaration) {
        const tokenWithDeclaration = defaultTokenImports.find(
          ({ declaration }) => node.source.value === declaration?.source.value
        );

        if (!tokenWithDeclaration) {
          return;
        }

        handleToken(node, tokenWithDeclaration.token);
      },
      Identifier(node: Identifier) {
        const parentType = (node as IdentifierWithParent).parent?.type;
        // handle ImportSpecifier and ImportDeclaration separately
        if (
          parentType === "ImportSpecifier" ||
          parentType === "ImportDefaultSpecifier"
        ) {
          return;
        }

        const tokenInfo = defaultTokenImports.find(
          ({ specifier }) => node.name === specifier.local.name
        );

        if (tokenInfo && shouldReplaceToken(tokenInfo.token)) {
          replaceToken(node, tokenInfo.token);
        }

        const unaliasedTokenSpecifier = tokenSpecifiers.find(
          (specifier) =>
            specifier.local.name === specifier.imported.name &&
            node.name === specifier.local.name
        );

        if (unaliasedTokenSpecifier && shouldReplaceToken(node.name)) {
          replaceToken(node, node.name);
        }
      },
      Literal(node: Literal) {
        if (typeof node.value !== "string") {
          return;
        }

        let varName = node.value;
        const varRegex = /var\(([^)]+)\)/;
        const varRegexMatch = node.value.match(varRegex);

        if (varRegexMatch) {
          varName = varRegexMatch[1];
        }

        if (oldGlobalColorCssVarNames.includes(varName)) {
          const comment = `/* CODEMODS: original v5 color was ${varName} */`;

          context.report({
            node,
            message: getColorFixMessage(varName),
            fix(fixer) {
              return fixer.replaceText(
                node,
                varRegexMatch
                  ? `"var(--pf-t--temp--dev--tbd)"${comment}`
                  : `"--pf-t--temp--dev--tbd"${comment}`
              );
            },
          });
          return;
        }

        const newVarName =
          globalNonColorCssVarNamesMap[
            varName as keyof typeof globalNonColorCssVarNamesMap
          ];

        const shouldReplaceVar = newVarName && newVarName !== "SKIP";

        if (shouldReplaceVar) {
          context.report({
            node,
            message: getFixMessage(varName, newVarName),
            fix(fixer) {
              return fixer.replaceText(
                node,
                varRegexMatch ? `"var(${newVarName})"` : `"${newVarName}"`
              );
            },
          });
          return;
        }

        if (oldCssVarNames.includes(varName)) {
          context.report({
            node,
            message: getWarnMessage(node.value),
          });
        }
      },
    };
  },
};

// consumers may have run the old class-name-updater before codemods, so we should check also old tokens with v6 prefix
const oldCssVarNamesV6 = oldCssVarNamesV5.map((cssVarName) =>
  cssVarName.replace("v5", "v6")
);
const oldCssVarNames = [...oldCssVarNamesV5, ...oldCssVarNamesV6];
