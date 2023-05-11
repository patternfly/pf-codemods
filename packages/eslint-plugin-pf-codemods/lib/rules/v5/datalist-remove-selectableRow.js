const {
  getFromPackage,
  findVariableDeclaration,
  getAllJSXElements,
} = require("../../helpers");

//https://github.com/patternfly/patternfly-react/pull/8827
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const dataListImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name == "DataList");

    if (!dataListImport) {
      return {};
    }

    let rangeStartsToReplaceConst = [];

    const sc = context.getSourceCode();

    const getObjectProp = (expr, propName) =>
      expr.properties.find(
        (prop) =>
          (prop.key.type === "Identifier" && prop.key.name === propName) ||
          (prop.key.type === "Literal" && prop.key.value === propName)
      );

    const swapCallbackParam = (params, toReplace) => {
      if (params.length === 1) {
        toReplace.push([params[0], `event, ${sc.getText(params[0])}`]);
      } else if (params.length === 2) {
        toReplace.push(
          [params[0], sc.getText(params[1])],
          [params[1], sc.getText(params[0])]
        );
      }
    };

    const handleObjectExpression = (expr, toReplace) => {
      const propVal = getObjectProp(expr, "onChange")?.value;

      if (!propVal) {
        return;
      }

      if (propVal.type === "Identifier") {
        toReplace.push([expr, sc.getText(propVal)]);
        handleIdentifierOfFunction(propVal, toReplace);
      } else if (propVal.type === "ArrowFunctionExpression") {
        const paramsLen = propVal.params.length;
        if (1 <= paramsLen <= 2) {
          toReplace.push([
            expr,
            `(${
              paramsLen === 1 ? "event" : sc.getText(propVal.params[1])
            }, ${sc.getText(propVal.params[0])}) => ${sc.getText(
              propVal.body
            )}`,
          ]);
        }
      } else if (propVal.type === "FunctionExpression") {
        const paramsLen = propVal.params.length;
        if (1 <= paramsLen <= 2) {
          toReplace.push([
            expr,
            `function ${propVal.id ? sc.getText(propVal.id) : ""}(${
              paramsLen === 1 ? "event" : sc.getText(propVal.params[1])
            }, ${sc.getText(propVal.params[0])}) ${sc.getText(propVal.body)}`,
          ]);
        }
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
        sc.getScope(identifier)
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
          rangeStartsToReplaceConst.push(variable?.defs[0].node.parent.range[0]);
          toReplace.push([n, sc.getText(n.object)]);
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
      if (node.type.includes("FunctionExpression")) {
        swapCallbackParam(node.params, toReplace);
      } else if (node.type === "Identifier") {
        handleIdentifierOfFunction(node, toReplace);
      }
    };

    const handleIdentifierOfFunction = (identifier, toReplace) => {
      const variable = findVariableDeclaration(
        identifier.name,
        sc.getScope(identifier)
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

      if (variableType === "FunctionName") {
        swapCallbackParam(variableNode.params, toReplace);
      }
    };

    const jsxOpeningsElementsToFix = getAllJSXElements(context)
      .map((elem) => elem.openingElement)
      .filter(
        (openingElem) =>
          openingElem.name.name === dataListImport.local.name &&
          openingElem.attributes.some(
            (attr) =>
              attr.name.name === "selectableRow" &&
              attr.value?.type === "JSXExpressionContainer"
          )
      );

    let toReplace = [];

    for (const elem of jsxOpeningsElementsToFix) {
      const selectableRowAttr = elem.attributes.find(
        (attr) =>
          attr.name?.name === "selectableRow" &&
          attr.value?.type === "JSXExpressionContainer"
      );

      if (!selectableRowAttr) {
        continue;
      }

      const expr = selectableRowAttr.value.expression;

      if (expr.type === "ObjectExpression") {
        handleObjectExpression(expr, toReplace);
      }

      if (expr.type === "Identifier") {
        handleIdentifierOfObject(expr, toReplace);
      }

      toReplace.push([selectableRowAttr.name, "onSelectableRowChange"]);
    }

    // Having the same fix more than once would lead to errors
    let toReplaceUnique = [];

    for (const [oldVal, newVal] of toReplace) {
      if (
        toReplaceUnique.every(
          ([oldUnique, newUnique]) =>
            oldUnique !== oldVal || newUnique !== newVal
        )
      ) {
        toReplaceUnique.push([oldVal, newVal]);
      }
    }

    const reportMessage = `DataList's selectableRow property has been replaced with onSelectableRowChange. The order of the params in the callback has also been updated so that the event param is first.`;

    return {
      // We use Program node to perform a one-time fix to prevent swapping callback parameters back and forth
      Program(node) {
        toReplaceUnique.length &&
          context.report({
            message: reportMessage,
            node,
            fix: function (fixer) {
              return [
                ...toReplaceUnique.map(([oldValue, newValue]) =>
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
      // Only to report where the node is located
      JSXOpeningElement(node) {
        if (jsxOpeningsElementsToFix.includes(node)) {
          context.report({
            message: reportMessage,
            node,
          });
        }
      },
    };
  },
};
