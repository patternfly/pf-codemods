const evk = require("eslint-visitor-keys");

export function moveSpecifiers(
  specifiersToMove,
  fromPackage,
  toPackage,
  messageAfterSpecifierPathChange
) {
  return function (context) {
    const src = context.getSourceCode();
    const { imports: fromPackageImports, exports: fromPackageExports } =
      getFromPackage(context, fromPackage, specifiersToMove);

    const getSpecifiersToMove = (specifiers) => {
      const specs = specifiers.filter((specifier) => {
        const comments = src.getCommentsAfter(specifier);

        return (
          !comments?.length ||
          !comments?.find((comment) =>
            comment?.value?.includes("data-codemods")
          )
        );
      });
      return specs;
    };
    const importSpecifiersToMove = getSpecifiersToMove(fromPackageImports);
    const exportSpecifiersToMove = getSpecifiersToMove(fromPackageExports);

    if (!importSpecifiersToMove.length && !exportSpecifiersToMove.length) {
      return {};
    }

    const getModifiedToPackage = (firstSpecifier) => {
      // expecting @patternfly/{package} or
      // @patternfly/{package}/{designator} where designator is deprecated
      const toParts = toPackage.split("/");

      if (
        !firstSpecifier?.parent?.source?.value?.includes("dist/esm") ||
        toParts[0] !== "@patternfly"
      ) {
        return;
      }

      const fromParts = firstSpecifier.parent.source.value.split("/");
      //expecting @patternfly/{package}/dist/esm/components/{Component}/index.js
      //needing toPath to look like fromPath with the designator before /components
      if (toParts.length === 3) {
        fromParts.splice(4, 0, toParts[2]);
        return fromParts.join("/");
      }
      // Expecting @patternfly/{package}/dist/esm/next/components/{Component}/index.js
      // Needing toPath to look like fromPath *without* the designator before /components
      if (toParts.length === 2) {
        return fromParts.filter((part) => part !== "next").join("/");
      }
    };
    const modifiedToPackageImport = getModifiedToPackage(
      importSpecifiersToMove[0]
    );
    const modifiedToPackageExport = getModifiedToPackage(
      exportSpecifiersToMove[0]
    );

    const getExistingDeclaration = (nodeType, modifiedPackage) => {
      return src.ast.body.find((node) => {
        const specifierReference =
          nodeType === "ImportDeclaration"
            ? importSpecifiersToMove[0]
            : exportSpecifiersToMove[0];

        return (
          node?.type === nodeType &&
          [modifiedPackage, toPackage].includes(node?.source?.value) &&
          specifierReference?.parent?.importKind === node?.importKind &&
          specifierReference?.parent?.exportKind === node?.exportKind
        );
      });
    };
    const existingToPackageImportDeclaration = getExistingDeclaration(
      "ImportDeclaration",
      modifiedToPackageImport
    );
    const existingToPackageExportDeclaration = getExistingDeclaration(
      "ExportNamedDeclaration",
      modifiedToPackageExport
    );

    const createSpecifierString = (specifier) => {
      const specifierText = src.getText(specifier);
      const specifierComments = src.getCommentsAfter(specifier);

      return `${specifierText}${
        specifierComments.length
          ? " " +
            specifierComments.map((comment) => `/*${comment.value}*/`).join("")
          : ""
      }`;
    };
    const getExistingSpecifiersFromDeclaration = (declaration) =>
      declaration?.specifiers?.map((specifier) =>
        createSpecifierString(specifier)
      ) || [];
    const existingToPackageImportSpecifiers =
      getExistingSpecifiersFromDeclaration(existingToPackageImportDeclaration);
    const existingToPackageExportSpecifiers =
      getExistingSpecifiersFromDeclaration(existingToPackageExportDeclaration);

    return {
      ImportDeclaration(node) {
        const [newToPackageSpecifiers, fromPackageSpecifiers] = splitSpecifiers(
          node,
          importSpecifiersToMove.map((imp) => imp?.imported?.name)
        );

        if (
          !newToPackageSpecifiers.length ||
          !pfPackageMatches(fromPackage, node.source.value)
        ) {
          return;
        }

        const newAliasToPackageSpecifiers = newToPackageSpecifiers.map(
          (importSpecifier) => {
            const importString = src.getText(importSpecifier);

            return /^@patternfly\/react-core\/(dist\/(esm|js)\/)?next/.test(
              importSpecifier.parent?.source?.value
            )
              ? `${importString} /* data-codemods */`
              : importString;
          }
        );
        const newToPackageImportDeclaration = `import${
          node.importKind === "type" ? " type" : ""
        } {\n\t${[
          ...existingToPackageImportSpecifiers,
          ...newAliasToPackageSpecifiers,
        ].join(`,\n\t`)}\n} from '${modifiedToPackageImport || toPackage}';`;

        context.report({
          node,
          message:
            `${newToPackageSpecifiers
              .map((s) => s.imported.name)
              .join(", ")
              .replace(/, ([^,]+)$/, ", and $1")}` +
            `${newToPackageSpecifiers.length > 1 ? " have " : " has "}${
              messageAfterSpecifierPathChange ||
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
                  `import${
                    node.importKind === "type" ? " type" : ""
                  } {\n\t${fromPackageSpecifiers
                    .map((specifier) => createSpecifierString(specifier))
                    .join(",\n\t")}\n} from '${node.source.value}';`
                )
              );
            }
            return fixes;
          },
        });
      },

      ExportNamedDeclaration(node) {
        const [newToPackageSpecifiers, fromPackageSpecifiers] = splitSpecifiers(
          node,
          exportSpecifiersToMove.map((exp) => exp?.local?.name)
        );

        if (
          !newToPackageSpecifiers.length ||
          !pfPackageMatches(fromPackage, node?.source?.value)
        ) {
          return;
        }
        const newToPackageExportDeclaration = `export${
          node.exportKind === "type" ? " type" : ""
        } {\n\t${[
          ...existingToPackageExportSpecifiers,
          ...newToPackageSpecifiers.map((exportSpecifier) => {
            const exportString = src.getText(exportSpecifier);

            return /^@patternfly\/react-core\/(dist\/(esm|js)\/)?next/.test(
              exportSpecifier.parent?.source?.value
            )
              ? `${exportString} /* data-codemods */`
              : exportString;
          }),
        ].join(`,\n\t`)}\n} from '${modifiedToPackageExport || toPackage}';`;

        context.report({
          node,
          message:
            `${newToPackageSpecifiers
              .map((s) => s.local.name)
              .join(", ")
              .replace(/, ([^,]+)$/, ", and $1")}` +
            `${newToPackageSpecifiers.length > 1 ? " have " : " has "}${
              messageAfterSpecifierPathChange ||
              "been moved. Running the fix flag will update your exports."
            }`,
          fix(fixer) {
            //no other exports left, replace the fromPackage
            if (
              !fromPackageSpecifiers.length &&
              !existingToPackageExportDeclaration
            ) {
              return fixer.replaceText(node, newToPackageExportDeclaration);
            }
            const fixes = [];
            if (existingToPackageExportDeclaration) {
              fixes.push(
                fixer.replaceText(
                  existingToPackageExportDeclaration,
                  newToPackageExportDeclaration
                )
              );
            } else {
              fixes.push(
                fixer.insertTextAfter(
                  node,
                  `\n${newToPackageExportDeclaration}`
                )
              );
            }
            if (!fromPackageSpecifiers.length) {
              fixes.push(fixer.remove(node));
            } else {
              fixes.push(
                fixer.replaceText(
                  node,
                  `export${
                    node.exportKind === "type" ? " type" : ""
                  } {\n\t${fromPackageSpecifiers
                    .map((specifier) => {
                      const specifierText = src.getText(specifier);
                      const specifierComments =
                        src
                          .getCommentsAfter(specifier)
                          .map((comment) => comment?.value) || [];
                      return specifierComments.length
                        ? `${specifierText} /* ${specifierComments.join("")} */`
                        : specifierText;
                    })
                    .join(",\n\t")}\n} from '${node?.source?.value}';`
                )
              );
            }
            return fixes;
          },
        });
      },
    };
  };
}

export function splitSpecifiers(declaration, specifiersToSplit) {
  let keepSpecifiers = [];

  const takeSpecifiers = declaration.specifiers.filter((specifier) => {
    const specifierName = specifier?.exported
      ? specifier.local?.name
      : specifier?.imported?.name;

    return (
      specifiersToSplit.includes(specifierName) ||
      (keepSpecifiers.push(specifier) && false)
    );
  });
  return [takeSpecifiers, keepSpecifiers];
}

/**
 *
 * @param {*} specifiers
 * @returns {String[]} an array of alias imports
 */
export function createAliasImportSpecifiers(specifiers) {
  return specifiers.map((imp) => {
    const { imported, local } = imp;

    if (imported.name !== local.name) {
      return `${imported.name} as ${local.name}`;
    }
    return imported.name;
  });
}

export function renamePropsOnNode(context, imports, node, renames) {
  const componentName = imports.find((imp) => imp.local.name === node.name.name)
    ?.imported.name;

  if (componentName) {
    const renamedProps = renames[componentName];

    node.attributes
      .filter((attribute) => renamedProps.hasOwnProperty(attribute.name?.name))
      .forEach((attribute) => {
        const newPropObject = renamedProps[attribute.name.name];

        const message = newPropObject.message
          ? newPropObject.message instanceof Function
            ? newPropObject.message(node)
            : newPropObject.message
          : undefined;

        if (
          newPropObject.newName === undefined ||
          newPropObject.newName === ""
        ) {
          context.report({
            node,
            message:
              message ||
              `${attribute.name.name} prop for ${node.name.name} has been removed`,
            fix(fixer) {
              return fixer.replaceText(attribute, "");
            },
          });
        } else {
          context.report({
            node,
            message:
              message ||
              `${attribute.name.name} prop for ${node.name.name} has been ${
                newPropObject.replace ? "replaced with" : "renamed to"
              } ${newPropObject.newName}`,
            fix(fixer) {
              return fixer.replaceText(
                newPropObject.replace ? attribute : attribute.name,
                newPropObject.newName
              );
            },
          });
        }
      });
  }
}

/**
 * 
 * @param {*} renames 
 * structure of the renames object:
 * {
 *    ComponentOne: {
        propA: {
          newName: "newPropA",
          message: (node) => `propA prop has been renamed to newPropA for ${node.name.name}, some custom message`, // message is optional, default message will always be provided
        },
        isSmall: {
          newName: 'size="sm"',
          replace // when replace is present, it will replace the entire prop, including its value (e.g. isSmall={true} will be replaced with size="sm")
        }
      },
      ComponentTwo: {
        propToDelete: {
          newName: "" // removing a prop is done by an empty string newName
          message: "propToDelete has been deleted on ComponentTwo" // message can also be a string, but function is preferable to keep the node name, when using aliased import of a component
        },
        propToDeleteShort: "", // shorter way to remove a prop
        propToRenameShort: "someNewPropName", // shorter way to rename a prop
        propToDeleteAlternativeWay: {}, // this will also work for removing a prop
      }
 * }
 * @param {string} packageName
 * @returns 
 */
export function renameProps(renames, packageName = "@patternfly/react-core") {
  return function (context) {
    const imports = getFromPackage(context, packageName).imports.filter(
      (specifier) => Object.keys(renames).includes(specifier.imported.name)
    );

    if (imports.length === 0) {
      return {};
    }

    Object.keys(renames).forEach((component) => {
      Object.entries(renames[component]).forEach(([oldName, value]) => {
        if (typeof value === "string") {
          renames[component][oldName] = { newName: value };
        }
      });
    });

    return {
      JSXOpeningElement(node) {
        renamePropsOnNode(context, imports, node, renames);
      },
    };
  };
}

export function renameComponents(
  componentMap,
  condition = (_context, _package) => true,
  message = (prevName, newName) =>
    `${prevName} has been replaced with ${newName}`,
  packageName = "@patternfly/react-core"
) {
  return function (context) {
    const { imports, exports } = getFromPackage(context, packageName);

    const filteredImports = imports.filter((specifier) =>
      Object.keys(componentMap).includes(specifier?.imported?.name)
    );
    const filteredExports = exports.filter((specifier) =>
      Object.keys(componentMap).includes(specifier?.local?.name)
    );
    const renameComponentFunctions = {};

    if (
      (!filteredImports.length && !filteredExports.length) ||
      !condition(context, packageName)
    ) {
      return renameComponentFunctions;
    }

    if (filteredImports.length) {
      renameComponentFunctions["ImportDeclaration"] = function (node) {
        ensureImports(context, node, packageName, [
          ...new Set(Object.values(componentMap)),
        ]);
      };
      renameComponentFunctions["JSXIdentifier"] = function (node) {
        const nodeName = node?.name;
        const importedNode = filteredImports.find(
          (imp) => imp?.local?.name === nodeName
        );
        if (
          filteredImports.find((imp) => imp?.imported?.name === nodeName) &&
          importedNode?.imported?.name === importedNode?.local?.name // don't rename an aliased component
        ) {
          // if data-codemods attribute, do nothing
          const parentNode = node?.parent;
          const isOpeningTag = parentNode?.type === "JSXOpeningElement";
          const openingTagAttributes = isOpeningTag
            ? parentNode?.attributes
            : parentNode?.parent?.openingElement?.attributes;
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
            context.getSourceCode().getText(node).replace(nodeName, newName);
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
      };
    }

    if (filteredExports.length) {
      renameComponentFunctions["ExportNamedDeclaration"] = function (node) {
        const exportedNode = node?.specifiers?.find((specifier) =>
          filteredExports
            .map((exp) => exp?.local?.name)
            .includes(specifier?.local?.name)
        );

        if (exportedNode) {
          const nodeName = exportedNode?.local?.name;
          const newName = componentMap[nodeName];
          context.report({
            node,
            message: message(nodeName, newName),
            fix(fixer) {
              return fixer.replaceText(exportedNode.local, newName);
            },
          });
        }
      };
    }

    return renameComponentFunctions;
  };
}

export function ensureImports(context, node, packageName, imports) {
  if (!pfPackageMatches(packageName, node.source.value)) {
    return;
  }
  const { imports: patternflyImports } = getFromPackage(context, packageName);
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
export function addCallbackParam(
  componentsArray,
  propMap,
  message = (propName, componentName, paramName) =>
    `The "${propName}" prop for ${componentName} has been updated so that the "${paramName}" parameter is the first parameter. "${propName}" handlers may require an update.`
) {
  return function (context) {
    const { imports: reactCoreImports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );
    const { imports: deprecatedImports } = getFromPackage(
      context,
      "@patternfly/react-core/deprecated"
    );
    const imports = [...reactCoreImports, ...deprecatedImports].filter(
      (specifier) => componentsArray.includes(specifier?.imported?.name)
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
                  nodeToReplace: attribute.value?.expression,
                };

                if (propProperties.type === "ArrowFunctionExpression") {
                  propProperties.params = attribute.value?.expression?.params;
                } else if (propProperties.type === "Identifier") {
                  const matchingVariable = findVariableDeclaration(
                    propProperties.name,
                    context.getSourceCode().getScope(node)
                  );
                  const matchingDefinition = matchingVariable?.defs.find(
                    (def) => def.name?.name === propProperties.name
                  );

                  propProperties.params =
                    matchingDefinition?.type === "FunctionName"
                      ? matchingDefinition?.node?.params
                      : matchingDefinition?.node?.init?.params;

                  const isPotentialUseStateHook = (definition) =>
                    definition?.type === "Variable" &&
                    definition?.node.id?.type === "ArrayPattern" &&
                    definition?.node.init?.type === "CallExpression";

                  if (isPotentialUseStateHook(matchingDefinition)) {
                    const callee = matchingDefinition?.node.init.callee;
                    const reactImports = getFromPackage(
                      context,
                      "react"
                    ).imports;

                    const defaultSpecifierName = reactImports.find(
                      (spec) => spec.type === "ImportDefaultSpecifier"
                    )?.local.name;

                    const useStateLocalName = reactImports.find(
                      (spec) => spec.imported?.name === "useState"
                    )?.local.name;

                    const isStateSetter = (callee) =>
                      (callee.type === "Identifier" &&
                        callee.name === useStateLocalName) ||
                      (callee.type === "MemberExpression" &&
                        callee.object.name === defaultSpecifierName &&
                        callee.property.name === "useState");

                    if (isStateSetter(callee)) {
                      propProperties.isStateSetter = true;
                      propProperties.stateType =
                        matchingDefinition?.node.init.typeParameters?.params[0].typeName?.name;
                    }
                  }
                } else if (propProperties.type === "MemberExpression") {
                  const memberExpression = attribute.value?.expression;
                  if (memberExpression.object.type === "ThisExpression") {
                    const parentClass = findAncestor(
                      memberExpression,
                      (current) => current.type === "ClassDeclaration"
                    );
                    const methods = parentClass?.body?.body;
                    const methodDefinition = methods?.find(
                      (method) =>
                        method.key.type === "Identifier" &&
                        method.key.name === memberExpression.property.name
                    );

                    propProperties.params = methodDefinition?.value?.params;
                    propProperties.isThisExpression = true;
                  }
                }
                const { type, params } = propProperties;

                const parameterConfig = propMap[attribute.name.name];
                const isParamAdditionOnly = typeof parameterConfig === "string";
                const newOrDefaultParamName = isParamAdditionOnly
                  ? parameterConfig
                  : parameterConfig.defaultParamName;

                let potentialParamMatchers = `(^_?${newOrDefaultParamName.replace(
                  /^_+/,
                  ""
                )}$)`;
                const otherMatchersString = parameterConfig.otherMatchers
                  ?.toString()
                  .slice(1, -1);

                if (otherMatchersString) {
                  potentialParamMatchers += `|(${otherMatchersString})`;
                }

                const firstParamName = params && params[0]?.name;

                // if the first parameter is already the expected "fixed" result, early return with no error
                if (
                  firstParamName &&
                  new RegExp(potentialParamMatchers).test(firstParamName)
                ) {
                  return;
                }

                // if a simple string is passed for the parameter just assign it to newParam like we used to and skip everything else
                if (isParamAdditionOnly) {
                  newParam = parameterConfig;
                } else {
                  const {
                    defaultParamName,
                    previousParamIndex,
                    otherMatchers,
                  } = parameterConfig;

                  const paramNameAtGivenIndex =
                    params?.length && params[previousParamIndex]?.name;

                  // if the expected index of the newParam exceeds the number of current params just set treat it like a param addition with the default param value
                  if (previousParamIndex >= params?.length || !params?.length) {
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
                      message: message(
                        attribute.name.name,
                        node.name.name,
                        defaultParamName
                      ),
                    });
                    return;
                  }
                }

                if (
                  (params?.length >= 1 &&
                    ["ArrowFunctionExpression", "Identifier"].includes(type)) ||
                  propProperties.isThisExpression ||
                  propProperties.isStateSetter
                ) {
                  context.report({
                    node,
                    message: message(
                      attribute.name.name,
                      node.name.name,
                      newParam
                    ),
                    fix(fixer) {
                      const fixes = [];

                      if (propProperties.isStateSetter) {
                        const typeText = propProperties.stateType
                          ? `: ${propProperties.stateType}`
                          : "";
                        fixes.push(
                          fixer.replaceText(
                            propProperties.nodeToReplace,
                            `(${newParam}, val${typeText}) => ${propProperties.name}(val)`
                          )
                        );
                      } else if (
                        propProperties.isThisExpression ||
                        type === "Identifier"
                      ) {
                        if (!params || params.length === 0) {
                          return fixes;
                        }

                        const newParamsText = `${newParam}, ${params
                          .filter((p) => p.name !== newParam)
                          .map((p) => context.getSourceCode().getText(p))
                          .join(", ")}`;

                        fixes.push(
                          fixer.replaceText(
                            propProperties.nodeToReplace,
                            `(${newParamsText}) => ${context
                              .getSourceCode()
                              .getText(propProperties.nodeToReplace)}(${params
                              .map((p) => p.name)
                              .join(", ")})`
                          )
                        );
                      } else {
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
export function getAllJSXElements(context) {
  const jsxElements = [];

  const traverse = (node) => {
    if (!node) {
      return;
    }
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

export function findVariableDeclaration(name, scope) {
  while (scope !== null) {
    const variable = scope.variables.find((v) => v.name === name);

    if (variable) {
      return variable;
    }

    scope = scope.upper;
  }
  return undefined;
}

export function findAncestor(node, conditionCallback = (_current) => false) {
  let current = node?.parent;

  while (current) {
    if (conditionCallback(current)) {
      return current;
    }

    current = current.parent;
  }

  return undefined;
}
