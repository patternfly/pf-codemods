import { Rule } from "eslint";
import { JSXAttribute, JSXOpeningElement } from "estree-jsx";
import {
  getAllImportsFromPackage,
  checkMatchingJSXOpeningElement,
  getAttribute,
  getAttributeValue,
} from "../../helpers";

// https://github.com/patternfly/react-component-groups/pull/244
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const basePackage = "@patternfly/react-component-groups";
    const componentImports = getAllImportsFromPackage(context, basePackage, [
      "UnavailableContent",
    ]);

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (!checkMatchingJSXOpeningElement(node, componentImports)) {
              return;
            }

            const statusPageLinkTextProp = getAttribute(
              node,
              "statusPageLinkText"
            );
            const statusPageLinkTextString =
              (getAttributeValue(
                context,
                statusPageLinkTextProp?.value
              ) as string) ?? "status page";

            if (statusPageLinkTextProp && statusPageLinkTextString.length) {
              const firstChar = statusPageLinkTextString.charAt(0);

              if (firstChar !== firstChar.toUpperCase()) {
                context.report({
                  node,
                  message:
                    "In react-component-groups, UnavailableContent's status page link button has changed to a primary button. Consider capitalizing the `statusPageLinkText` prop.",
                  fix(fixer) {
                    return fixer.replaceText(
                      statusPageLinkTextProp.value!,
                      `"${firstChar.toUpperCase()}${statusPageLinkTextString.slice(
                        1
                      )}"`
                    );
                  },
                });
              }
            }

            const preStatusLinkTextProp = getAttribute(
              node,
              "unavailableBodyPreStatusLinkText"
            );
            const postStatusLinkTextProp = getAttribute(
              node,
              "unavailableBodyPostStatusLinkText"
            );

            if (!preStatusLinkTextProp && !postStatusLinkTextProp) {
              return;
            }

            const preStatusLinkTextString =
              getAttributeValue(context, preStatusLinkTextProp?.value) ??
              "Try refreshing the page. If the problem persists, contact your organization administrator or visit our";
            const postStatusLinkTextString =
              getAttributeValue(context, postStatusLinkTextProp?.value) ??
              "for known outages.";

            const bodyTextAttribute = `bodyText="${preStatusLinkTextString} ${statusPageLinkTextString} ${postStatusLinkTextString}"`;

            context.report({
              node,
              message:
                "In react-component-groups, we have replaced UnavailableContent's props `unavailableBodyPreStatusLinkText` and `unavailableBodyPostStatusLinkText` with one `bodyText` prop.",
              fix(fixer) {
                if (preStatusLinkTextProp && postStatusLinkTextProp) {
                  return [
                    fixer.replaceText(preStatusLinkTextProp, bodyTextAttribute),
                    fixer.remove(postStatusLinkTextProp),
                  ];
                }

                return fixer.replaceText(
                  (preStatusLinkTextProp ||
                    postStatusLinkTextProp) as JSXAttribute,
                  bodyTextAttribute
                );
              },
            });
          },
        };
  },
};
