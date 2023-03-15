function getPackageImports(context, packageName) {
  return context
    .getSourceCode()
    .ast.body.filter((node) => node.type === "ImportDeclaration")
    .filter((node) => node.source.value === packageName)
    .map((node) => node.specifiers)
    .reduce((acc, val) => acc.concat(val), []);
}

function renameProps0(context, imports, node, renames) {
  if (imports.map((imp) => imp.local.name).includes(node.name.name)) {
    const renamedProps =
      renames[node.name.name] ||
      renames[
        imports.find((imp) => imp.local?.name === node.name.name)?.imported
          ?.name
      ];
    node.attributes
      .filter(
        (attribute) =>
          attribute.name && renamedProps.hasOwnProperty(attribute.name.name)
      )
      .forEach((attribute) => {
        if (renamedProps[attribute.name.name] === "") {
          context.report({
            node,
            message: `${attribute.name.name} prop for ${node.name.name} has been removed`,
            fix(fixer) {
              return fixer.replaceText(attribute, "");
            },
          });
        } else {
          context.report({
            node,
            message: `${attribute.name.name} prop for ${
              node.name.name
            } has been renamed to ${renamedProps[attribute.name.name]}`,
            fix(fixer) {
              return fixer.replaceText(
                attribute.name,
                renamedProps[attribute.name.name]
              );
            },
          });
        }
      });
  }
}

function renameProps(renames, packageName = "@patternfly/react-core") {
  return function (context) {
    const imports = getPackageImports(context, packageName).filter(
      (specifier) => Object.keys(renames).includes(specifier.imported.name)
    );

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            renameProps0(context, imports, node, renames);
          },
        };
  };
}

function renameProp(
  components,
  propMap,
  message,
  replaceAttribute,
  leaveComment = true
) {
  if (typeof components === "string") {
    components = [components];
  }
  return function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => components.includes(specifier.imported.name)
    );
    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (imports.find((imp) => imp.local.name === node.name.name)) {
              const namedAttributes = node.attributes.filter(
                (attr) => attr.name
              );

              namedAttributes
                .filter((attr) => Object.keys(propMap).includes(attr.name.name))
                .forEach((attribute) => {
                  const newName = propMap[attribute.name.name];
                  context.report({
                    node,
                    message: message(node, attribute, newName),
                    fix(fixer) {
                      // Delete entire prop if newName is empty
                      if (!newName || replaceAttribute) {
                        /**
                         * (dallas)
                         * TODO: remove extra space? the following works but issues arise when attempting to remove multiple props.
                         * i assume the ranges become invalid in the forEach loop? even though it seems to track attr correctly
                         * (see datalist-remove-ondrags for example)
                         *
                         * const tokenBefore = context.getSourceCode().getTokenBefore(attribute);
                         * return fixer.replaceTextRange([tokenBefore.range[1], attribute.range[1]], '');
                         *
                         * or
                         *
                         * return fixer.replaceTextRange([attribute.range[0] - 1, attribute.range[1]], '');
                         */
                        return fixer.replaceText(attribute, newName);
                      }
                      const newNameAttrName = newName.split("=")[0];
                      // Leave a comment if there's an existing prop with this name
                      if (
                        namedAttributes.find(
                          (attr) => attr.name.name === newNameAttrName
                        )
                      ) {
                        return fixer.replaceText(
                          attribute,
                          leaveComment ? `/* ${newName} */` : ""
                        );
                      }
                      return fixer.replaceText(attribute.name, newName);
                    },
                  });
                });
            }
          },
        };
  };
}

function renameComponents(
  componentMap,
  condition = (_context, _package) => true,
  message = (prevName, newName) =>
    `${prevName} has been replaced with ${newName}`,
  package = "@patternfly/react-core"
) {
  return function (context) {
    const imports = getPackageImports(context, package).filter((specifier) =>
      Object.keys(componentMap).includes(specifier.imported.name)
    );

    return imports.length === 0 || !condition(context, package)
      ? {}
      : {
          ImportDeclaration(node) {
            ensureImports(context, node, package, Object.values(componentMap));
          },
          JSXIdentifier(node) {
            const nodeName = node.name;
            const importedNode = imports.find(
              (imp) => imp.local.name === nodeName
            );
            if (
              imports.find((imp) => imp.imported.name === nodeName) &&
              importedNode.imported.name === importedNode.local.name // don't rename an aliased component
            ) {
              // if data-codemods attribute, do nothing
              const parentNode = node.parent;
              const isOpeningTag = parentNode.type === "JSXOpeningElement";
              const openingTagAttributes = isOpeningTag
                ? parentNode.attributes
                : parentNode.parent.openingElement.attributes;
              const hasDataAttr =
                openingTagAttributes &&
                openingTagAttributes.filter(
                  (attr) => attr.name?.name === "data-codemods"
                ).length;
              if (hasDataAttr) {
                return;
              }
              // if no data-codemods && opening tag, add attribute & rename
              // if no data-codemods && closing tag, rename
              const newName = componentMap[nodeName];
              const updateTagName = (node) =>
                context
                  .getSourceCode()
                  .getText(node)
                  .replace(nodeName, newName);
              const addDataAttr = (jsxStr) =>
                `${jsxStr.slice(0, -1)} data-codemods="true">`;
              const newOpeningParentTag = newName.includes("Toolbar")
                ? addDataAttr(updateTagName(parentNode))
                : updateTagName(parentNode);
              context.report({
                node,
                message: message(nodeName, newName),
                fix(fixer) {
                  return isOpeningTag
                    ? fixer.replaceText(parentNode, newOpeningParentTag)
                    : fixer.replaceText(node, updateTagName(node));
                },
              });
            }
          },
        };
  };
}

function ensureImports(context, node, package, imports) {
  if (node.source.value !== package) {
    return;
  }
  const patternflyImports = getPackageImports(context, package);
  const patternflyImportNames = patternflyImports.map(
    (imp) => imp.imported.name
  );
  const myImports = node.specifiers.map((imp) => imp.imported.name);
  const missingImports = imports
    .filter((imp) => !patternflyImportNames.includes(imp)) // not added by consumer
    .filter((imp) => !myImports.includes(imp)) // not added by this rule
    .join(", ");
  if (missingImports) {
    const lastSpecifier = node.specifiers[node.specifiers.length - 1];
    context.report({
      node,
      message: `add missing imports ${missingImports} from ${node.source.value}`,
      fix(fixer) {
        return fixer.insertTextAfter(lastSpecifier, `, ${missingImports}`);
      },
    });
  }
}

// propMap structure: { propName: { defaultParamName: string, previousParamIndex?: number, otherMatchers?: /regex/ } | string }
// example:           { onClick: { defaultParamName: '_event', previousParamIndex: 1, otherMatchers?: /_?(event|ev|e)/ } }
function addCallbackParam(componentsArray, propMap) {
  return function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => componentsArray.includes(specifier.imported.name)
    );

    return !imports.length
      ? {}
      : {
          JSXOpeningElement(node) {
            if (imports.map((imp) => imp.local.name).includes(node.name.name)) {
              const namedAttributes = node.attributes.filter((attr) =>
                Object.keys(propMap).includes(attr.name?.name)
              );

              namedAttributes.forEach((attribute) => {
                let newParam;

                const propProperties = {
                  type: attribute.value?.expression?.type,
                  name: attribute.value?.expression?.name,
                };

                if (propProperties.type === "ArrowFunctionExpression") {
                  propProperties.params = attribute.value?.expression?.params;
                } else if (propProperties.type === "Identifier") {
                  const currentScope = context.getScope();
                  const matchingVariable = currentScope.variables.find(
                    (variable) => variable.name === propProperties.name
                  );
                  const matchingDefinition = matchingVariable.defs.find(
                    (def) => def.name.name === propProperties.name
                  );

                  propProperties.params =
                    matchingDefinition.type === "FunctionName"
                      ? matchingDefinition.node.params
                      : matchingDefinition.node.init.params;
                }
                const { type, params } = propProperties;

                // if a simple string is passed for the parameter just assign it to newParam like we used to and skip everything else
                if (typeof propMap[attribute.name.name] === "string") {
                  newParam = propMap[attribute.name.name];
                } else {
                  const {
                    defaultParamName,
                    previousParamIndex,
                    otherMatchers,
                  } = propMap[attribute.name.name];

                  const paramNameAtGivenIndex =
                    params && params[previousParamIndex]?.name;

                  // if the expected index of the newParam exceeds the number of current params just set treat it like a param addition with the default param value
                  if (previousParamIndex >= params?.length) {
                    newParam = defaultParamName;
                  }

                  // if there is a param in the location where we expect the newParam to be, and it matches the supplied matcher, treat that matched value as the new param value
                  else if (paramNameAtGivenIndex?.match(otherMatchers)) {
                    newParam = paramNameAtGivenIndex;
                  }

                  // if it doesn't match the supplied matcher, early return with no fixer
                  else {
                    context.report({
                      node,
                      message: `The "${attribute.name.name}" prop for ${node.name.name} has been updated so that the "${defaultParamName}" parameter is the first parameter. "${attribute.name.name}" handlers may require an update.`,
                    });
                    return;
                  }
                }

                if (
                  (params?.length >= 1 &&
                    ["ArrowFunctionExpression", "Identifier"].includes(type)) ||
                  type === "MemberExpression"
                ) {
                  context.report({
                    node,
                    message: `The "${attribute.name.name}" prop for ${node.name.name} has been updated so that the "${newParam}" parameter is the first parameter. "${attribute.name.name}" handlers may require an update.`,
                    fix(fixer) {
                      const fixes = [];

                      const createParamAdditionFix = (params) => {
                        const firstParam = params[0];

                        const replacementParams = `${newParam}, ${context
                          .getSourceCode()
                          .getText(firstParam)}`;

                        const hasParenthesis =
                          context.getTokenBefore(firstParam).value === "(";

                        return fixer.replaceText(
                          firstParam,
                          hasParenthesis
                            ? replacementParams
                            : `(${replacementParams})`
                        );
                      };

                      const createRemoveCurrentParamUseFix = (
                        currentUseOfNewParam
                      ) => {
                        const targetRange = [
                          currentUseOfNewParam.range[0] - 2,
                          currentUseOfNewParam.range[1],
                        ];

                        return fixer.replaceTextRange(targetRange, "");
                      };

                      if (
                        !["ArrowFunctionExpression", "Identifier"].includes(
                          type
                        )
                      ) {
                        return fixes;
                      }

                      const currentIndexOfNewParam = params?.findIndex(
                        (param) => param.name === newParam
                      );

                      if (currentIndexOfNewParam > 0) {
                        const currentUseOfNewParam =
                          params[currentIndexOfNewParam];

                        fixes.push(
                          createRemoveCurrentParamUseFix(currentUseOfNewParam)
                        );
                        fixes.push(
                          createParamAdditionFix(
                            params,
                            currentUseOfNewParam.name
                          )
                        );
                      } else if (params[0].name !== newParam) {
                        fixes.push(createParamAdditionFix(params));
                      }

                      return fixes;
                    },
                  });
                }
              });
            }
          },
        };
  };
}

module.exports = {
  ensureImports,
  getPackageImports,
  renameProp,
  renameProps0,
  renameProps,
  renameComponents,
  addCallbackParam,
};
