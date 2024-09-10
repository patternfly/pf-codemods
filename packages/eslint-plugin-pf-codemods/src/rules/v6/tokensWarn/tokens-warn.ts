import { Rule } from "eslint";
import {
  IdentifierWithParent,
  getDefaultDeclarationString,
  getDefaultImportsFromPackage,
  getFromPackage,
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
  oldGlobalNonColorCssVarNames,
  globalNonColorCssVarNamesMap,
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
        path: getDefaultDeclarationString(specifier),
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

    const replaceTokenOrWarn = (
      node: ImportSpecifier | ImportDeclaration,
      token: string
    ) => {
      if (shouldReplaceToken(token)) {
        replaceToken(node, token);
      } else if (oldTokens.includes(token)) {
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
          replaceTokenOrWarn(node, token);
        }
      },
      ImportDeclaration(node: ImportDeclaration) {
        const tokenWithDeclaration = defaultTokenImports.find(
          ({ declaration }) => node.source.value === declaration?.source.value
        );

        if (!tokenWithDeclaration) {
          return;
        }

        replaceTokenOrWarn(node, tokenWithDeclaration.token);
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
        const match = node.value.match(varRegex);

        if (match) {
          varName = match[1];
        }

        const shouldReplaceVar =
          oldGlobalNonColorCssVarNames.includes(varName) &&
          globalNonColorCssVarNamesMap[
            varName as keyof typeof globalNonColorCssVarNamesMap
          ] !== "SKIP";

        if (shouldReplaceVar) {
          const newVarName =
            globalNonColorCssVarNamesMap[
              varName as keyof typeof globalNonColorCssVarNamesMap
            ];

          if (newVarName !== "SKIP") {
            context.report({
              node,
              message: getFixMessage(varName, newVarName),
              fix(fixer) {
                return fixer.replaceText(
                  node,
                  node.value?.toString().startsWith("var")
                    ? `"var(${newVarName})"`
                    : `"${newVarName}"`
                );
              },
            });
          }
        } else if (oldCssVarNames.includes(varName)) {
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
