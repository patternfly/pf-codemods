import { Rule } from "eslint";
import {
  getDefaultDeclarationString,
  getDefaultImportsFromPackage,
  getFromPackage,
} from "../../helpers";
import { ImportDeclaration, ImportSpecifier, Literal } from "estree-jsx";
import { oldTokens } from "./tokenLists/oldTokens";
import { oldCssVarNamesV5 } from "./tokenLists/oldCssVarNamesV5";

module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const tokensPackage = "@patternfly/react-tokens";

    const { imports: tokenSpecifiers } = getFromPackage(context, tokensPackage);

    const defaultTokensWithDeclaration = getDefaultImportsFromPackage(
      context,
      tokensPackage
    )
      .map((specifier) => ({
        path: getDefaultDeclarationString(specifier),
        declaration: specifier.parent,
      }))
      .filter(({ path }) => path !== undefined)
      .map(({ path, declaration }) => ({
        token: (path as string).split("/").pop() as string,
        declaration,
      }));

    const getMessage = (tokenName: string) =>
      `${tokenName} is an old CSS token. About half of our tokens have been replaced with newer ones. To find a suitable replacement token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

    return {
      ImportSpecifier(node: ImportSpecifier) {
        if (tokenSpecifiers.includes(node)) {
          const tokenName = node.imported.name;
          if (oldTokens.includes(tokenName)) {
            context.report({
              node,
              message: getMessage(tokenName),
            });
          }
        }
      },
      ImportDeclaration(node: ImportDeclaration) {
        const tokenWithDeclaration = defaultTokensWithDeclaration.find(
          ({ declaration }) => node.source.value === declaration?.source.value
        );

        if (
          tokenWithDeclaration &&
          oldTokens.includes(tokenWithDeclaration.token)
        ) {
          context.report({
            node,
            message: getMessage(tokenWithDeclaration.token),
          });
        }
      },
      Literal(node: Literal) {
        if (
          typeof node.value === "string" &&
          [...oldCssVarNames, ...oldCssVars].includes(node.value)
        ) {
          context.report({
            node,
            message: getMessage(node.value),
          });
        }
      },
    };
  },
};

// consumers may run class-name-updater before codemods, so we have to check also old tokens with v6 prefix
const oldCssVarNamesV6 = oldCssVarNamesV5.map((cssVarName) =>
  cssVarName.replace("v5", "v6")
);
const oldCssVarNames = [...oldCssVarNamesV5, ...oldCssVarNamesV6];
const oldCssVars = oldCssVarNames.map((cssVarName) => `var(${cssVarName})`);
