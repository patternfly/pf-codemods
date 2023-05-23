const ruleTester = require("./ruletester");

function getAddCallbackParamMessage(componentName, propName, newParamName) {
  return `The "${propName}" prop for ${componentName} has been updated so that the "${newParamName}" parameter is the first parameter. "${propName}" handlers may require an update.`;
}

function getValidAddCallbackParamTests(
  componentNameArray,
  propNameArray,
  newParamName
) {
  let tests = [];

  componentNameArray.forEach((componentName) => {
    tests.push({
      code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} />;`,
    });
    tests.push({
      code: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js'; <${componentName} />;`,
    });
    propNameArray.forEach((propName) => {
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={() => handler()} />;`,
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(${newParamName}) => handler()} />;`,
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; const handler = () => {}; <${componentName} ${propName}={handler} />;`,
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; const handler = (${newParamName}) => {}; <${componentName} ${propName}={handler} />;`,
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; function handler() {}; <${componentName} ${propName}={handler} />;`,
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; function handler(${newParamName}) {}; <${componentName} ${propName}={handler} />;`,
      });
      tests.push({ code: `<${componentName} ${propName} />;` });
    });
  });
  return tests;
}

function getInvalidAddCallbackParamTests(
  componentNameArray,
  propNameArray,
  newParamName,
  previousParamIndex,
  createMessageCallback
) {
  let tests = [];

  componentNameArray.forEach((componentName) => {
    propNameArray.forEach((propName) => {
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(id) => handler(id)} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(${newParamName}, id) => handler(id)} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js'; <${componentName} ${propName}={(id) => handler(id)} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js'; <${componentName} ${propName}={(${newParamName}, id) => handler(id)} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(id: bar) => handler(id)} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(${newParamName}, id: bar) => handler(id)} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={id => handler(id)} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(${newParamName}, id) => handler(id)} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} as ${componentName}Deprecated } from '@patternfly/react-core/deprecated'; const handler = (id) => {}; <${componentName}Deprecated ${propName}={handler} />;`,
        output: `import { ${componentName} as ${componentName}Deprecated } from '@patternfly/react-core/deprecated'; const handler = (${newParamName}, id) => {}; <${componentName}Deprecated ${propName}={handler} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName + "Deprecated",
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; const handler = (id: bar) => {}; <${componentName} ${propName}={handler} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; const handler = (${newParamName}, id: bar) => {}; <${componentName} ${propName}={handler} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; function handler(id) {}; <${componentName} ${propName}={handler} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; function handler(${newParamName}, id) {}; <${componentName} ${propName}={handler} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; function handler(id: bar) {}; <${componentName} ${propName}={handler} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; function handler(${newParamName}, id: bar) {}; <${componentName} ${propName}={handler} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={this.handler} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={this.handler} />;`,
        errors: [
          {
            message: createMessageCallback(
              componentName,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} as PF${componentName} } from '@patternfly/react-core'; <PF${componentName} ${propName}={(id) => handler(id)} />;`,
        output: `import { ${componentName} as PF${componentName} } from '@patternfly/react-core'; <PF${componentName} ${propName}={(${newParamName}, id) => handler(id)} />;`,
        errors: [
          {
            message: createMessageCallback(
              `PF${componentName}`,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });
      tests.push({
        code: `import { ${componentName} as PF${componentName} } from '@patternfly/react-core'; <PF${componentName} ${propName}={(id: bar) => handler(id)} />;`,
        output: `import { ${componentName} as PF${componentName} } from '@patternfly/react-core'; <PF${componentName} ${propName}={(${newParamName}, id: bar) => handler(id)} />;`,
        errors: [
          {
            message: createMessageCallback(
              `PF${componentName}`,
              propName,
              newParamName
            ),
            type: "JSXOpeningElement",
          },
        ],
      });

      // only add these tests if this is not being used as part of the test suite for a param swap, or if the swapped param would come after the 'text' param in the below tests
      if (!previousParamIndex || previousParamIndex > 1) {
        tests.push({
          code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(id, text) => handler(id)} />;`,
          output: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(${newParamName}, id, text) => handler(id)} />;`,
          errors: [
            {
              message: createMessageCallback(
                componentName,
                propName,
                newParamName
              ),
              type: "JSXOpeningElement",
            },
          ],
        });
        tests.push({
          code: `import { ${componentName} } from '@patternfly/react-core'; const handler = (id, text) => {}; <${componentName} ${propName}={handler} />;`,
          output: `import { ${componentName} } from '@patternfly/react-core'; const handler = (${newParamName}, id, text) => {}; <${componentName} ${propName}={handler} />;`,
          errors: [
            {
              message: createMessageCallback(
                componentName,
                propName,
                newParamName
              ),
              type: "JSXOpeningElement",
            },
          ],
        });
        tests.push({
          code: `import { ${componentName} } from '@patternfly/react-core'; function handler(id, text) {}; <${componentName} ${propName}={handler} />;`,
          output: `import { ${componentName} } from '@patternfly/react-core'; function handler(${newParamName}, id, text) {}; <${componentName} ${propName}={handler} />;`,
          errors: [
            {
              message: createMessageCallback(
                componentName,
                propName,
                newParamName
              ),
              type: "JSXOpeningElement",
            },
          ],
        });
        tests.push({
          code: `import { ${componentName} as PF${componentName} } from '@patternfly/react-core'; <PF${componentName} ${propName}={(id, text) => handler(id)} />;`,
          output: `import { ${componentName} as PF${componentName} } from '@patternfly/react-core'; <PF${componentName} ${propName}={(${newParamName}, id, text) => handler(id)} />;`,
          errors: [
            {
              message: createMessageCallback(
                `PF${componentName}`,
                propName,
                newParamName
              ),
              type: "JSXOpeningElement",
            },
          ],
        });
      }
    });
  });
  return tests;
}

function getInvalidSwapCallbackParamTests(
  componentNameArray,
  propNameArray,
  previousParamIndex,
  newParamName,
  createMessageCallback
) {
  let tests = getInvalidAddCallbackParamTests(
    componentNameArray,
    propNameArray,
    newParamName,
    previousParamIndex,
    createMessageCallback
  );

  const formattedNewParamName =
    newParamName[0] === "_" ? newParamName.slice(1) : newParamName;

  const expectedVariations = [];
  const genericArgs = ["id", "text", "foo", "bar", "bash", "bang"];

  switch (formattedNewParamName) {
    case "event":
      expectedVariations.push(
        ...["e", "_e", "ev", "_ev", "evt", "_evt", "event", "_event"]
      );
      break;
  }

  if (expectedVariations.length) {
    componentNameArray.forEach((componentName) => {
      propNameArray.forEach((propName) => {
        expectedVariations.forEach((variation) => {
          const stringifyArgs = (args) => {
            return args.reduce((acc, arg) => `${acc}, ${arg}`, "").slice(2);
          };

          const selectedGenericArgs = genericArgs.slice(0, previousParamIndex);

          const initialArgs = stringifyArgs([
            ...selectedGenericArgs,
            variation,
          ]);
          const fixedArgs = stringifyArgs([variation, ...selectedGenericArgs]);

          tests.push({
            code: `import { ${componentName} } from '@patternfly/react-core'; function handler(${initialArgs}) {}; <${componentName} ${propName}={handler} />;`,
            output: `import { ${componentName} } from '@patternfly/react-core'; function handler(${fixedArgs}) {}; <${componentName} ${propName}={handler} />;`,
            errors: [
              {
                message: createMessageCallback(
                  componentName,
                  propName,
                  variation
                ),
                type: "JSXOpeningElement",
              },
            ],
          });
          tests.push({
            code: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js'; function handler(${initialArgs}) {}; <${componentName} ${propName}={handler} />;`,
            output: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js'; function handler(${fixedArgs}) {}; <${componentName} ${propName}={handler} />;`,
            errors: [
              {
                message: createMessageCallback(
                  componentName,
                  propName,
                  variation
                ),
                type: "JSXOpeningElement",
              },
            ],
          });
        });
      });
    });
  }

  return tests;
}

function addCallbackParamTester(
  ruleName,
  componentNames,
  propNames,
  newParamName = "_event",
  createMessageCallback = getAddCallbackParamMessage
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);
  const componentNameArray =
    typeof componentNames === "string" ? [componentNames] : componentNames;
  const propNameArray = typeof propNames === "string" ? [propNames] : propNames;

  ruleTester.run(ruleName, rule, {
    valid: getValidAddCallbackParamTests(
      componentNameArray,
      propNameArray,
      newParamName
    ),
    invalid: getInvalidAddCallbackParamTests(
      componentNameArray,
      propNameArray,
      newParamName,
      undefined,
      createMessageCallback
    ),
  });
}

function swapCallbackParamTester(
  ruleName,
  componentNames,
  propNames,
  previousParamIndex,
  newParamName = "_event",
  createMessageCallback = getAddCallbackParamMessage
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);
  const componentNameArray =
    typeof componentNames === "string" ? [componentNames] : componentNames;
  const propNameArray = typeof propNames === "string" ? [propNames] : propNames;

  ruleTester.run(ruleName, rule, {
    valid: getValidAddCallbackParamTests(
      componentNameArray,
      propNameArray,
      newParamName
    ),
    invalid: getInvalidSwapCallbackParamTests(
      componentNameArray,
      propNameArray,
      previousParamIndex,
      newParamName,
      createMessageCallback
    ),
  });
}

function splitImports(importsToSplit) {
  const otherSpecifiers = [];
  const componentSpecifiers = importsToSplit
    .filter(
      (importToMove) =>
        importToMove.type === "component" ||
        (otherSpecifiers.push(importToMove.name) && false)
    )
    .map((importToMove) => importToMove.name);

  return [componentSpecifiers, otherSpecifiers];
}

function getMoveSpecifiersValidtests(specifiersToMoveArray) {
  const tests = [];
  const [componentSpecifiers, otherSpecifiers] = splitImports(
    specifiersToMoveArray
  );

  componentSpecifiers.forEach((componentSpecifier) => {
    tests.push({
      code: `import { ${componentSpecifier} } from '@patternfly/react-core/next'; <${componentSpecifier} />;`,
    });
    tests.push({
      code: `import { ${componentSpecifier} } from '@patternfly/react-core/deprecated'; <${componentSpecifier} />;`,
    });
    tests.push({
      code: `import { ${componentSpecifier} } from '@patternfly/react-core/dist/esm/deprecated/components/${componentSpecifier}/index.js'; <${componentSpecifier} />;`,
    });
    tests.push({
      code: `export { ${componentSpecifier} as CustomExport } from '@patternfly/react-core/deprecated';`,
    });
    tests.push({
      code: `export { ${componentSpecifier} as CustomExport } from '@patternfly/react-core/dist/esm/deprecated/components/${componentSpecifier}/index.js';`,
    });
    tests.push({
      code: `<${componentSpecifier} />;`,
    });
    tests.push({
      code: `import { ${componentSpecifier} } from 'foo'; <${componentSpecifier} />;`,
    });
  });

  otherSpecifiers.forEach((otherSpecifier) => {
    tests.push({
      code: `import { ${otherSpecifier} } from '@patternfly/react-core/deprecated'; <Bar prop={${otherSpecifier}} />;`,
    });
    tests.push({
      code: `import { ${otherSpecifier} } from '@patternfly/react-core/dist/esm/deprecated/components/${otherSpecifier}/index.js'; <Bar prop={${otherSpecifier}} />;`,
    });
    tests.push({
      code: `export { ${otherSpecifier} as CustomExport } from '@patternfly/react-core/deprecated';`,
    });
    tests.push({
      code: `export { ${otherSpecifier} as CustomExport } from '@patternfly/react-core/dist/esm/deprecated/components/${otherSpecifier}/index.js';`,
    });
    tests.push({
      code: `<Bar prop={${otherSpecifier}} />;`,
    });
    tests.push({
      code: `import { ${otherSpecifier} } from 'foo'; <Bar prop={${otherSpecifier}} />;`,
    });
  });
  return tests;
}

function getMoveSpecifiersInvalidtests(
  specifiersToMoveArray,
  newImplementation
) {
  const tests = [];
  const [componentSpecifiers, otherSpecifiers] = splitImports(
    specifiersToMoveArray
  );
  const endOfMessage = newImplementation
    ? `, but we suggest using our ${newImplementation} implementation.`
    : ".";
  const createImportErrors = (specifierName, selfClosing = true) => {
    const errorsArray = [
      {
        message: `${specifierName} has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package${endOfMessage}`,
        type: "ImportDeclaration",
      },
      {
        message: `${specifierName} has been deprecated. Running the fix flag will update names${endOfMessage}`,
        type: "JSXIdentifier",
      },
    ];

    if (!selfClosing) {
      errorsArray.push({
        message: `${specifierName} has been deprecated. Running the fix flag will update names${endOfMessage}`,
        type: "JSXIdentifier",
      });
    }

    return errorsArray;
  };
  const createExportError = (specifierName) => [
    {
      message: `${specifierName} has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package${endOfMessage}`,
      type: "ExportNamedDeclaration",
    },
  ];

  componentSpecifiers.forEach((componentSpecifier) => {
    const package = componentSpecifier.includes("Table") ? "table" : "core";

    tests.push({
      code: `import {${componentSpecifier} } from '@patternfly/react-${package}'; <${componentSpecifier} />`,
      output: `import {\n\t${componentSpecifier} as ${componentSpecifier}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentSpecifier}Deprecated />`,
      errors: createImportErrors(componentSpecifier),
    });
    tests.push({
      code: `export {${componentSpecifier} as CustomExport } from '@patternfly/react-${package}';`,
      output: `export {\n\t${componentSpecifier} as CustomExport\n} from '@patternfly/react-${package}/deprecated';`,
      errors: createExportError(componentSpecifier),
    });
    tests.push({
      code: `import {${componentSpecifier} } from '@patternfly/react-${package}'; <${componentSpecifier}.Provider />`,
      output: `import {\n\t${componentSpecifier} as ${componentSpecifier}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentSpecifier}Deprecated.Provider />`,
      errors: [
        {
          message: `${componentSpecifier} has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package${endOfMessage}`,
          type: "ImportDeclaration",
        },
        {
          message: `${componentSpecifier} has been deprecated. Running the fix flag will update names${endOfMessage}`,
          type: "JSXIdentifier",
        },
      ],
    });
    tests.push({
      code: `export {${componentSpecifier} as CustomExport } from '@patternfly/react-${package}';\nexport { Foo as Bar } from '@patternfly/react-${package}/deprecated';`,
      output: `\nexport {\n\tFoo as Bar,\n\t${componentSpecifier} as CustomExport\n} from '@patternfly/react-${package}/deprecated';`,
      errors: createExportError(componentSpecifier),
    });
    tests.push({
      code: `import {${componentSpecifier} } from '@patternfly/react-${package}'; <${componentSpecifier}.Provider />`,
      output: `import {\n\t${componentSpecifier} as ${componentSpecifier}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentSpecifier}Deprecated.Provider />`,
      errors: createImportErrors(componentSpecifier),
    });
    tests.push({
      code: `import {${componentSpecifier}, Foo } from '@patternfly/react-${package}'; <${componentSpecifier} />`,
      output: `import {\n\tFoo\n} from '@patternfly/react-${package}';\nimport {\n\t${componentSpecifier} as ${componentSpecifier}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentSpecifier}Deprecated />`,
      errors: createImportErrors(componentSpecifier),
    });
    tests.push({
      code: `import { ${componentSpecifier}, Foo } from '@patternfly/react-${package}'; <${componentSpecifier}></${componentSpecifier}>`,
      output: `import {\n\tFoo\n} from '@patternfly/react-${package}';\nimport {\n\t${componentSpecifier} as ${componentSpecifier}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentSpecifier}Deprecated></${componentSpecifier}Deprecated>`,
      errors: createImportErrors(componentSpecifier, false),
    });
    tests.push({
      code: `import { ${componentSpecifier} } from '@patternfly/react-${package}';\nimport { Foo } from '@patternfly/react-${package}/deprecated'; <${componentSpecifier} />`,
      output: `\nimport {\n\tFoo,\n\t${componentSpecifier} as ${componentSpecifier}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentSpecifier}Deprecated />`,
      errors: createImportErrors(componentSpecifier),
    });
    tests.push({
      code: `import { ${componentSpecifier} } from '@patternfly/react-${package}/dist/esm/components/${componentSpecifier}/index.js';\nimport { Foo } from '@patternfly/react-${package}/dist/esm/deprecated/components/${componentSpecifier}/index.js'; <${componentSpecifier} />`,
      output: `\nimport {\n\tFoo,\n\t${componentSpecifier} as ${componentSpecifier}Deprecated\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${componentSpecifier}/index.js'; <${componentSpecifier}Deprecated />`,
      errors: createImportErrors(componentSpecifier),
    });
    tests.push({
      code: `export {${componentSpecifier} as CustomExport } from '@patternfly/react-${package}/dist/esm/components/${componentSpecifier}/index.js';`,
      output: `export {\n\t${componentSpecifier} as CustomExport\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${componentSpecifier}/index.js';`,
      errors: createExportError(componentSpecifier),
    });
    tests.push({
      code: `import { ${componentSpecifier} as PF${componentSpecifier} } from '@patternfly/react-${package}'; <PF${componentSpecifier} />`,
      output: `import {\n\t${componentSpecifier} as PF${componentSpecifier}\n} from '@patternfly/react-${package}/deprecated'; <PF${componentSpecifier} />`,
      errors: [
        {
          message: `${componentSpecifier} has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package${endOfMessage}`,
          type: "ImportDeclaration",
        },
      ],
    });
    tests.push({
      code: `import { ${componentSpecifier} as PF${componentSpecifier} } from '@patternfly/react-${package}/dist/esm/components/${componentSpecifier}/index.js'; import { Foo } from '@patternfly/react-${package}/dist/esm/deprecated/components/${componentSpecifier}/index.js'; <PF${componentSpecifier} />`,
      output: ` import {\n\tFoo,\n\t${componentSpecifier} as PF${componentSpecifier}\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${componentSpecifier}/index.js'; <PF${componentSpecifier} />`,
      errors: [
        {
          message: `${componentSpecifier} has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package${endOfMessage}`,
          type: "ImportDeclaration",
        },
      ],
    });
    tests.push({
      code: `import { ${componentSpecifier} as PF${componentSpecifier} } from '@patternfly/react-${package}/dist/esm/components/${componentSpecifier}/index.js'; <PF${componentSpecifier} />`,
      output: `import {\n\t${componentSpecifier} as PF${componentSpecifier}\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${componentSpecifier}/index.js'; <PF${componentSpecifier} />`,
      errors: [
        {
          message: `${componentSpecifier} has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package${endOfMessage}`,
          type: "ImportDeclaration",
        },
      ],
    });
  });

  otherSpecifiers.forEach((otherSpecifier) => {
    const package = otherSpecifier.includes("Table") ? "table" : "core";
    tests.push({
      code: `import {${otherSpecifier} } from '@patternfly/react-${package}'; <Foo bar={${otherSpecifier}} />`,
      output: `import {\n\t${otherSpecifier} as ${otherSpecifier}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <Foo bar={${otherSpecifier}Deprecated} />`,
      errors: createImportErrors(otherSpecifier),
    });
    tests.push({
      code: `import {${otherSpecifier} } from '@patternfly/react-${package}/dist/esm/components/${otherSpecifier}/index.js'; <Foo bar={${otherSpecifier}} />`,
      output: `import {\n\t${otherSpecifier} as ${otherSpecifier}Deprecated\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${otherSpecifier}/index.js'; <Foo bar={${otherSpecifier}Deprecated} />`,
      errors: createImportErrors(otherSpecifier),
    });
  });
  return tests;
}

function createMoveSpecifiersTester(
  ruleName,
  specifiersToMoveArray,
  newImplementation
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);

  ruleTester.run(ruleName, rule, {
    valid: getMoveSpecifiersValidtests(specifiersToMoveArray),
    invalid: getMoveSpecifiersInvalidtests(
      specifiersToMoveArray,
      newImplementation
    ),
  });
}

module.exports = {
  addCallbackParamTester,
  swapCallbackParamTester,
  createMoveSpecifiersTester,
};
