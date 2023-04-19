const evk = require("eslint-visitor-keys");

function moveSpecifiers(
  importsToMove,
  fromPackage,
  toPackage,
  messageAfterImportNameChange,
  messageAfterElementNameChange,
  aliasSuffix
) {
  return function (context) {
    const importNames = importsToMove.map((nameToMove) => nameToMove.name);
    const importSpecifiersToMove = getPackageImports(
      context,
      fromPackage,
      importNames
    );
    if (!importSpecifiersToMove.length) return {};

    let modifiedToPackage = "";
    if (importSpecifiersToMove[0].parent.source.value.includes("dist/esm")) {
      //expecting @patternfly/{package}/{designator} where designator is next/deprecated
      const toParts = toPackage.split("/");
      //expecting @patternfly/{package}/dist/esm/components/{Component}/index.js
      //needing toPath to look like fromPath with the designator before /components
      const fromParts = importSpecifiersToMove[0].parent.source.value.split("/");
      if (toParts[0] === "@patternfly" && toParts.length === 3) {
        fromParts.splice(4, 0, toParts[2])
        modifiedToPackage = fromParts.join("/");
      }
    }

    const propValuesToUpdate = [];
    const componentsToUpdate = importsToMove
      .filter(
        (importToMove) =>
          importToMove.type === "component" ||
          (propValuesToUpdate.push(importToMove.name) && false)
      )
      .map((importToMove) => importToMove.name);

    const src = context.getSourceCode();
    const existingToPackageImportDeclaration = src.ast.body.find(
      (node) =>
        node.type === "ImportDeclaration" && [modifiedToPackage, toPackage].includes(node.source.value)
    );
    const existingToPackageSpecifiers =
      existingToPackageImportDeclaration?.specifiers?.map((specifier) =>
        src.getText(specifier)
      ) || [];

    return {
      ImportDeclaration(node) {
        const [newToPackageSpecifiers, fromPackageSpecifiers] =
          splitImportSpecifiers(node, importNames);

        if (!newToPackageSpecifiers.length || !pfPackageMatches(fromPackage, node.source.value))
          return {};

        const newAliasToPackageSpecifiers = createAliasImportSpecifiers(
          newToPackageSpecifiers,
          aliasSuffix
        );
        const newToPackageImportDeclaration = `import {\n\t${[
          ...existingToPackageSpecifiers,
          ...newAliasToPackageSpecifiers,
        ].join(`,\n\t`)}\n} from '${modifiedToPackage || toPackage}';`;

        context.report({
          node,
          message:
            `${newToPackageSpecifiers
              .map((s) => s.imported.name)
              .join(", ")
              .replace(/, ([^,]+)$/, ", and $1")}` +
            `${newToPackageSpecifiers.length > 1 ? " have " : " has "}${
              messageAfterImportNameChange ||
              "been moved. Running the fix flag will update your imports."
            }`,
          fix(fixer) {
            //no other imports left, replace the fromPackage
            if (
              !fromPackageSpecifiers.length &&
              !existingToPackageImportDeclaration
            ) {
              return fixer.replaceText(node, newToPackageImportDeclaration);
            }
            const fixes = [];
            if (existingToPackageImportDeclaration) {
              fixes.push(
                fixer.replaceText(
                  existingToPackageImportDeclaration,
                  newToPackageImportDeclaration
                )
              );
            } else {
              fixes.push(
                fixer.insertTextAfter(
                  node,
                  `\n${newToPackageImportDeclaration}`
                )
              );
            }
            if (!fromPackageSpecifiers.length) {
              fixes.push(fixer.remove(node));
            } else {
              fixes.push(
                fixer.replaceText(
                  node,
                  `import {\n\t${fromPackageSpecifiers
                    .map((specifier) => src.getText(specifier))
                    .join(",\n\t")}\n} from '${node.source.value}';`
                )
              );
            }
            return fixes;
          },
        });
      },
      JSXElement(node) {
        if (!aliasSuffix) return;
        // Fixer for importsToMove objects with "component" type
        if (
          importSpecifiersToMove.some(
            (imp) =>
              imp.local.name === node.openingElement.name.name &&
              imp.imported.name === imp.local.name &&
              componentsToUpdate.includes(imp.imported.name)
          )
        ) {
          context.report({
            node,
            message: `${node.openingElement.name.name} ${
              messageAfterElementNameChange ||
              "has been moved to a new package. Running the fix flag will update the name."
            }`,
            fix(fixer) {
              const fixes = [
                fixer.replaceText(
                  node.openingElement.name,
                  `${node.openingElement.name.name}${aliasSuffix}`
                ),
              ];
              if (!node.openingElement.selfClosing) {
                fixes.push(
                  fixer.replaceText(
                    node.closingElement.name,
                    `${node.openingElement.name.name}${aliasSuffix}`
                  )
                );
              }
              return fixes;
            },
          });
        }

        // Fixer for importsToMove objects with non-"component" type
        const existingPropsToUpdate = node.openingElement.attributes.filter(
          (attr) => {
            if (attr.value) {
              const propValue =
                attr.value.expression?.object?.name ||
                attr.value.expression?.name;
              return propValuesToUpdate.includes(propValue);
            }
          }
        );
        if (existingPropsToUpdate.length) {
          existingPropsToUpdate.forEach((propToUpdate) => {
            const currentPropToUpdate =
              propToUpdate.value?.expression?.object ||
              propToUpdate.value?.expression;

            context.report({
              node,
              message: `${currentPropToUpdate?.name} ${
                messageAfterElementNameChange ||
                "has been moved to a new package. Running the fix flag will update the name."
              }`,
              fix(fixer) {
                return fixer.replaceTextRange(
                  currentPropToUpdate.range,
                  `${currentPropToUpdate?.name}${aliasSuffix}`
                );
              },
            });
          });
        }
      },
    };
  };
}

function pfPackageMatches(packageName, nodeSrc) {
  const parts = packageName.split("/");
  const regex = new RegExp('^' +
    parts[0] + '\/' + parts[1] +
    '(\/dist\/esm)?' +
    (parts[2] ? ('\/' + parts[2]) : '') +
    '(\/components\/.*)?$'
  );
  return regex.test(nodeSrc)
}

/**
 *
 * @param context
 * @param {string} packageName
 * @param {string[]} importNames
 * @returns {ImportSpecifier[]} an array of imports
 */
function getPackageImports(context, packageName, importNames = []) {
  const specifiers = context
    .getSourceCode()
    .ast.body.filter((node) => node.type === "ImportDeclaration")
    .filter((node) => {
      if(packageName.startsWith("@patternfly")) {
        return pfPackageMatches(packageName, node.source.value);
      }
      return node.source.value === packageName
    })
    .map((node) => node.specifiers)
    .reduce((acc, val) => acc.concat(val), []);
  return !importNames.length
    ? specifiers
    : specifiers.filter((s) => importNames.includes(s.imported?.name));
}

function splitImportSpecifiers(importDeclaration, importsToSplit) {
  let keepImports = [];
  const takeImports = importDeclaration.specifiers.filter(
    (specifier) =>
      importsToSplit.includes(specifier?.imported?.name) ||
      (keepImports.push(specifier) && false)
  );
  return [takeImports, keepImports];
}

/**
 *
 * @param {*} specifiers
 * @param {string} aliasSuffix
 * @returns {String[]} an array of alias imports
 */
function createAliasImportSpecifiers(specifiers, aliasSuffix) {
  return specifiers.map((imp) => {
    const { imported, local } = imp;

    if (imported.name !== local.name) {
      return `${imported.name} as ${local.name}`;
    }
    return `${imported.name}${
      aliasSuffix ? ` as ${imported.name}${aliasSuffix}` : ""
    }`;
  });
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
            ensureImports(context, node, package, [
              ...new Set(Object.values(componentMap)),
            ]);
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
  if (!pfPackageMatches(package, node.source.value)) {
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
// example:           { onClick: { defaultParamName: '_event', previousParamIndex: 1, otherMatchers?: /^_?(ev\w*|e$)/ } }
function addCallbackParam(componentsArray, propMap) {
  return function (context) {
    const imports = [
      ...getPackageImports(context, "@patternfly/react-core"),
      ...getPackageImports(context, "@patternfly/react-core/deprecated")
    ].filter(
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
                  const matchingDefinition = matchingVariable?.defs.find(
                    (def) => def.name?.name === propProperties.name
                  );

                  propProperties.params =
                    matchingDefinition?.type === "FunctionName"
                      ? matchingDefinition?.node?.params
                      : matchingDefinition?.node?.init?.params;
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
                    params?.length && params[previousParamIndex]?.name;

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
                        const tokenBeforeCurrentUse =
                          context.getTokenBefore(currentUseOfNewParam);
                        const targetRange = [
                          tokenBeforeCurrentUse.range[0],
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
                        fixes.push(createParamAdditionFix(params));
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

/**
 *
 * @param context
 * @returns {JSXElement[]} an array of all JSXElements in the file
 */
function getAllJSXElements(context) {
  const jsxElements = [];

  const traverse = (node) => {
    if (node.type === "JSXElement") {
      jsxElements.push(node);
    }

    for (const childKey of evk.KEYS[node.type] || []) {
      const child = node[childKey];

      if (Array.isArray(child)) {
        child.forEach((c) => traverse(c));
      } else if (child && typeof child === "object") {
        traverse(child);
      }
    }
  };

  traverse(context.getSourceCode().ast);

  return jsxElements;
}

module.exports = {
  createAliasImportSpecifiers,
  ensureImports,
  getPackageImports,
  moveSpecifiers,
  pfPackageMatches,
  renameProp,
  renameProps0,
  renameProps,
  renameComponents,
  splitImportSpecifiers,
  addCallbackParam,
  getAllJSXElements,
};
