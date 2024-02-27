import { getFromPackage, findVariableDeclaration } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10017
// https://github.com/patternfly/patternfly-react/pull/10036
// Possible TODOs: check for variable references passed in as values
module.exports = {
  meta: { fixable: "code" },
  create: function (context: {
    getScope: () => {
      upper: any;
      variables: { defs: { node: { init: { value: string } } }[] }[];
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
        ["DrawerContent", "DrawerPanelContent", "DrawerSection"].includes(
          specifier.imported.name
        )
    );
    const colorVariantEnumImport = imports.filter(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "DrawerColorVariant"
    );

    return !componentImports.length && !colorVariantEnumImport.length
      ? {}
      : {
          MemberExpression(node: {
            object: { name: string };
            property: { name: string };
          }) {
            if (
              colorVariantEnumImport
                .map((imp: { local: { name: any } }) => imp.local.name)
                .includes(node.object.name)
            ) {
              if (node.property.name === "light200") {
                context.report({
                  node,
                  message:
                    "The `light200` property for the DrawerColorVariant enum has been replaced with the `secondary` property.",
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                  }) {
                    return fixer.replaceText(node.property, "secondary");
                  },
                });
              }
            }
          },
          JSXOpeningElement(node: { name: { name: any }; attributes: any[] }) {
            if (
              componentImports
                .map((imp: { local: { name: any } }) => imp.local.name)
                .includes(node.name.name)
            ) {
              const attribute = node.attributes.find(
                (attr: { name: { name: string } }) =>
                  attr.name?.name === "colorVariant"
              );

              if (attribute && attribute.value.value === "light-200") {
                context.report({
                  node,
                  message: `The "light-200" value for the \`colorVariant\` prop has been replaced with the "secondary" value for ${node.name.name}.`,
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                  }) {
                    return fixer.replaceText(attribute.value, '"secondary"');
                  },
                });
              }
            }
          },
        };
  },
};
