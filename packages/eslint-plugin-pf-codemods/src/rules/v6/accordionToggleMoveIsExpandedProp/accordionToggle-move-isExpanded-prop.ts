import { getFromPackage, findAncestor } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9876
module.exports = {
  meta: { fixable: "code" },
  create: function (context: {
    getSourceCode: () => {
      getText(node: any): string;
    };
    report: (arg0: {
      node: any;
      message: string;
      fix(fixer: any): any;
    }) => void;
  }) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "AccordionToggle"
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: { name: { name: any }; attributes: any[] }) {
            if (
              componentImports
                .map((imp: { local: { name: any } }) => imp.local.name)
                .includes(node.name.name)
            ) {
              const attribute = node.attributes.find(
                (attr: { name: { name: string } }) =>
                  attr.name?.name === "isExpanded"
              );
              if (attribute) {
                context.report({
                  node,
                  message:
                    "The `isExpanded` prop for AccordionToggle has been moved to AccordionItem.",
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                    insertTextAfter: (arg0: string, arg1: string) => any;
                  }) {
                    const accordionItemAncestor = findAncestor(
                      node,
                      (current) =>
                        current?.openingElement?.name?.name === "AccordionItem"
                    );
                    const attributeValue = context
                      .getSourceCode()
                      .getText(attribute);
                    return [
                      fixer.replaceText(attribute, ""),
                      fixer.insertTextAfter(
                        accordionItemAncestor.openingElement.name,
                        ` ${attributeValue}`
                      ),
                    ];
                  },
                });
              }
            }
          },
        };
  },
};
