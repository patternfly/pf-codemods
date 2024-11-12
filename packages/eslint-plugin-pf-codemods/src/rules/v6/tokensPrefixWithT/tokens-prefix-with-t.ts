import { Rule } from "eslint";
import {
  IdentifierWithParent,
  ImportDefaultSpecifierWithParent,
  ImportSpecifierWithParent,
  getDefaultImportsFromPackage,
  getFromPackage,
  getImportPath,
} from "../../helpers";
import { Identifier, ImportSpecifier } from "estree-jsx";
import { tokensToPrefixWithT } from "shared-helpers/dist/tokenLists";

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
      const newToken = `t_${oldToken}`;

      context.report({
        node,
        message: `React tokens, whose value is a Patternfly token variable (has prefix --pf-t), are now prefixed with t_`,
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

    return {
      ImportSpecifier(node: ImportSpecifier) {
        if (tokenSpecifiers.includes(node)) {
          const token = node.imported.name;
          if (tokensToPrefixWithT.has(token)) {
            replaceToken(node, token);
          }
        }
      },
      ImportDefaultSpecifier(node: ImportDefaultSpecifierWithParent) {
        const specifierWithToken = defaultTokenSpecifiers.find(
          ({ specifier }) => node === specifier
        );

        if (!specifierWithToken) {
          return;
        }

        const { token } = specifierWithToken;

        if (tokensToPrefixWithT.has(token)) {
          replaceToken(node, token);
        }
      },
      Identifier(node: Identifier) {
        const parentType = (node as IdentifierWithParent).parent?.type;
        // handle ImportSpecifier and ImportDefaultSpecifier separately
        if (
          parentType === "ImportSpecifier" ||
          parentType === "ImportDefaultSpecifier"
        ) {
          return;
        }

        const specifierWithToken = defaultTokenSpecifiers.find(
          ({ specifier }) => node.name === specifier.local.name
        );

        if (specifierWithToken) {
          const { token } = specifierWithToken;
          if (tokensToPrefixWithT.has(token)) {
            replaceToken(node, token);
          }
        }

        const unaliasedTokenSpecifier = tokenSpecifiers.find(
          (specifier) =>
            specifier.local.name === specifier.imported.name &&
            node.name === specifier.local.name
        );

        if (unaliasedTokenSpecifier && tokensToPrefixWithT.has(node.name)) {
          replaceToken(node, node.name);
        }
      },
    };
  },
};
