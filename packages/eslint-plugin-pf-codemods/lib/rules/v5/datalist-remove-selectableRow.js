const { getFromPackage, findVariableDeclaration } = require("../../helpers");

//https://github.com/patternfly/patternfly-react/pull/8827
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const dataListImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.find((specifier) => specifier.imported.name == "DataList");

    if (!dataListImport) {
      return {};
    }

    let rangeStartsToReplaceConst = [];

    const sourceCode = context.getSourceCode();

    const getObjectProp = (expr, propName) =>
      expr.properties.find(
        (prop) =>
          (prop.key.type === "Identifier" && prop.key.name === propName) ||
          (prop.key.type === "Literal" && prop.key.value === propName)
      );

    const handleObjectExpression = (expr, toReplace) => {
      const propVal = getObjectProp(expr, "onChange")?.value;

      if (!propVal) {
        return;
      }

      if (propVal.type === "Identifier") {
        toReplace.push([expr, sourceCode.getText(propVal)]);
        handleIdentifierOfFunction(propVal, toReplace);
      } else if (
        ["ArrowFunctionExpression", "FunctionExpression"].includes(
          propVal.type
        ) &&
        [1, 2].includes(propVal.params.length)
      ) {
        toReplace.push([expr, sourceCode.getText(propVal)]);
      }
    };

    const handleRightAssignmentSide_Object = (node, toReplace) => {
      if (node.type === "ObjectExpression") {
        handleObjectExpression(node, toReplace);
      } else if (node.type === "Identifier") {
        handleIdentifierOfObject(node, toReplace);
      }
    };

    const handleIdentifierOfObject = (identifier, toReplace) => {
      const variable = findVariableDeclaration(
        identifier.name,
        sourceCode.getScope(identifier)
      );

      const nodesUsingVariable = variable?.references.map(
        (ref) => ref.identifier.parent
      );

      nodesUsingVariable.forEach((n) => {
        if (
          n.type === "MemberExpression" &&
          (n.property.name === "onChange" || n.property.value === "onChange") &&
          n.parent.type === "AssignmentExpression"
        ) {
          rangeStartsToReplaceConst.push(
            variable?.defs[0].node.parent.range[0]
          );
          toReplace.push([n, sourceCode.getText(n.object)]);
          handleRightAssignmentSide_Function(n.parent.right, toReplace);
        } else if (
          n.type === "AssignmentExpression" &&
          n.left.name === identifier.name
        ) {
          handleRightAssignmentSide_Object(n.right, toReplace);
        }
      });

      const variableValue = variable?.defs[0].node.init;
      variableValue &&
        handleRightAssignmentSide_Object(variableValue, toReplace);
    };

    const handleRightAssignmentSide_Function = (node, toReplace) => {
      if (node.type === "Identifier") {
        handleIdentifierOfFunction(node, toReplace);
      }
    };

    const handleIdentifierOfFunction = (identifier, toReplace) => {
      const variable = findVariableDeclaration(
        identifier.name,
        sourceCode.getScope(identifier)
      );

      const variableType = variable?.defs[0].type;
      const variableNode = variable?.defs[0].node;

      if (variableType === "Variable") {
        const nodesUsingVariable = variable.references.map(
          (ref) => ref.identifier.parent
        );

        nodesUsingVariable.forEach((n) => {
          if (
            n.type === "AssignmentExpression" &&
            n.left.name === identifier.name
          ) {
            handleRightAssignmentSide_Function(n.right, toReplace);
          }
        });

        variableNode.init &&
          handleRightAssignmentSide_Function(variableNode.init, toReplace);
      }
    };

    return {
      JSXOpeningElement(node) {
        if (node.name.name !== dataListImport.local.name) {
          return;
        }

        const selectableRowAttr = node.attributes.find(
          (attr) =>
            attr.name?.name === "selectableRow" &&
            attr.value?.type === "JSXExpressionContainer"
        );

        if (!selectableRowAttr) {
          return;
        }

        let toReplace = [];
        const expr = selectableRowAttr.value.expression;

        if (expr.type === "ObjectExpression") {
          handleObjectExpression(expr, toReplace);
        }

        if (expr.type === "Identifier") {
          handleIdentifierOfObject(expr, toReplace);
        }

        toReplace.push([selectableRowAttr.name, "onSelectableRowChange"]);

        toReplace.length &&
          context.report({
            message: `DataList's selectableRow property has been replaced with onSelectableRowChange. The order of the params in the callback has also been updated so that the event param is first.`,
            node,
            fix: function (fixer) {
              return [
                ...toReplace.map(([oldValue, newValue]) =>
                  fixer.replaceText(oldValue, newValue)
                ),
                ...[...new Set(rangeStartsToReplaceConst)].map((rangeStart) =>
                  fixer.replaceTextRange(
                    [rangeStart, rangeStart + "const".length],
                    "let"
                  )
                ),
              ];
            },
          });
      },
    };
  },
};
