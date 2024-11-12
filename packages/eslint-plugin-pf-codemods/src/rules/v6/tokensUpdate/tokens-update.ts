import { Rule } from "eslint";
import {
  IdentifierWithParent,
  ImportDefaultSpecifierWithParent,
  ImportSpecifierWithParent,
  getDefaultImportsFromPackage,
  getFromPackage,
  getImportPath,
} from "../../helpers";
import { Identifier, ImportSpecifier, Literal } from "estree-jsx";
import {
  oldTokens,
  oldCssVarNames,
  globalNonColorTokensMap,
  oldGlobalNonColorTokens,
  globalNonColorCssVarNamesMap,
  oldGlobalColorCssVarNames,
  oldGlobalColorTokens,
} from "shared-helpers/dist/tokenLists";

module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const tokensPackage = "@patternfly/react-tokens";

    const { imports: tokenSpecifiers } = getFromPackage(context, tokensPackage);

    const defaultTokenSpecifiers = getDefaultImportsFromPackage(
      context,
      tokensPackage
    )
      .map((specifier) => ({
        specifier,
        path: getImportPath(specifier),
      }))
      .filter(({ path }) => path !== undefined)
      .map(({ specifier, path }) => ({
        specifier,
        token: (path as string).split("/").pop() as string,
      }));

    const getWarnMessage = (tokenName: string) =>
      `${tokenName} is an old CSS token. About half of our tokens have been replaced with newer ones. To find a suitable replacement token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

    const getFixMessage = (oldToken: string, newToken: string) =>
      `${oldToken} is an old CSS token and has been replaced with ${newToken}. If you want to use a different token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

    const getColorFixMessage = (oldToken: string, isReactToken = true) =>
      `${oldToken} is an old color token. This codemod will replace it with a temporary hot pink color token ${
        isReactToken ? "t_temp_dev_tbd" : "--pf-t--temp--dev--tbd"
      } to prevent build errors. You should find a suitable replacement token in our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

    const shouldReplaceToken = (token: string) =>
      oldGlobalNonColorTokens.has(token) &&
      globalNonColorTokensMap[token as keyof typeof globalNonColorTokensMap] !==
        "SKIP";

    const getTokenPathFix = (
      fixer: Rule.RuleFixer,
      node: ImportSpecifierWithParent | ImportDefaultSpecifierWithParent,
      oldToken: string,
      newToken: string
    ) => {
      const packagePath = getImportPath(node);
      if (packagePath && packagePath.includes(oldToken)) {
        const newPath = packagePath.replace(oldToken, newToken);
        return fixer.replaceText(node.parent?.source!, `"${newPath}"`);
      }
    };

    const replaceToken = (
      node:
        | ImportSpecifierWithParent
        | ImportDefaultSpecifierWithParent
        | Identifier,
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
          if (node.type === "Identifier") {
            return fixer.replaceText(node, newToken);
          }

          const tokenPathFix = getTokenPathFix(fixer, node, oldToken, newToken);

          return [
            fixer.replaceText(
              node.type === "ImportSpecifier" ? node.imported : node,
              newToken
            ),
            ...(tokenPathFix ? [tokenPathFix] : []),
          ];
        },
      });
    };

    const updateColorTokenImport = (
      node: ImportSpecifierWithParent | ImportDefaultSpecifierWithParent,
      token: string
    ) => {
      // either has an aliased named import, or a default import with a custom name (not matching the token in an import path)
      const hasAlias = node.local.name !== token;

      const comment = `/* CODEMODS: you should update this color token${
        hasAlias ? `, original v5 token was ${token}` : ""
      } */`;

      context.report({
        node,
        message: getColorFixMessage(token),
        fix(fixer) {
          const fixes = [];
          const tokenPathFix = getTokenPathFix(
            fixer,
            node,
            token,
            "t_temp_dev_tbd"
          );

          if (tokenPathFix) {
            fixes.push(tokenPathFix);
          }

          if (node.type === "ImportSpecifier") {
            fixes.push(
              fixer.replaceText(
                node,
                `t_temp_dev_tbd as ${node.local.name} ${comment}`
              )
            );
          } else {
            fixes.push(fixer.insertTextAfter(node, comment));
          }

          return fixes;
        },
      });
    };

    const handleToken = (
      node: ImportSpecifierWithParent | ImportDefaultSpecifierWithParent,
      token: string
    ) => {
      if (oldGlobalColorTokens.has(token)) {
        updateColorTokenImport(node, token);
        return;
      }

      if (shouldReplaceToken(token)) {
        replaceToken(node, token);
        return;
      }

      if (oldTokens.has(token)) {
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
      ImportDefaultSpecifier(node: ImportDefaultSpecifierWithParent) {
        const specifierWithToken = defaultTokenSpecifiers.find(
          ({ specifier }) => node === specifier
        );

        if (!specifierWithToken) {
          return;
        }

        handleToken(node, specifierWithToken.token);
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

        const tokenInfo = defaultTokenSpecifiers.find(
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

        if (oldGlobalColorCssVarNames.has(varName)) {
          const comment = `/* CODEMODS: original v5 color was ${varName} */`;

          context.report({
            node,
            message: getColorFixMessage(varName, false),
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

        if (oldCssVarNames.has(varName)) {
          context.report({
            node,
            message: getWarnMessage(varName),
          });
        }
      },
    };
  },
};
