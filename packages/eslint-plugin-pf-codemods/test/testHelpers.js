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
        code: `import { ${componentName} } from '@patternfly/react-core';
        class MyClass {
          handleChange(id) {}
          render() {
            return <${componentName} ${propName}={this.handleChange} />;
          }
        }`,
        output: `import { ${componentName} } from '@patternfly/react-core';
        class MyClass {
          handleChange(id) {}
          render() {
            return <${componentName} ${propName}={(${newParamName}, id) => this.handleChange(id)} />;
          }
        }`,
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
        code: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js';
        class MyClass {
          handleChange(id) {}
          render() {
            return <${componentName} ${propName}={this.handleChange} />;
          }
        }`,
        output: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js';
        class MyClass {
          handleChange(id) {}
          render() {
            return <${componentName} ${propName}={(${newParamName}, id) => this.handleChange(id)} />;
          }
        }`,
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
        output: `import { ${componentName} as ${componentName}Deprecated } from '@patternfly/react-core/deprecated'; const handler = (id) => {}; <${componentName}Deprecated ${propName}={(${newParamName}, id) => handler(id)} />;`,
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
        output: `import { ${componentName} } from '@patternfly/react-core'; const handler = (id: bar) => {}; <${componentName} ${propName}={(${newParamName}, id: bar) => handler(id)} />;`,
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
        output: `import { ${componentName} } from '@patternfly/react-core'; function handler(id) {}; <${componentName} ${propName}={(${newParamName}, id) => handler(id)} />;`,
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
        output: `import { ${componentName} } from '@patternfly/react-core'; function handler(id: bar) {}; <${componentName} ${propName}={(${newParamName}, id: bar) => handler(id)} />;`,
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
          output: `import { ${componentName} } from '@patternfly/react-core'; const handler = (id, text) => {}; <${componentName} ${propName}={(${newParamName}, id, text) => handler(id, text)} />;`,
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
          output: `import { ${componentName} } from '@patternfly/react-core'; function handler(id, text) {}; <${componentName} ${propName}={(${newParamName}, id, text) => handler(id, text)} />;`,
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
            output: `import { ${componentName} } from '@patternfly/react-core'; function handler(${initialArgs}) {}; <${componentName} ${propName}={(${fixedArgs}) => handler(${initialArgs})} />;`,
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
            output: `import { ${componentName} } from '@patternfly/react-core/dist/esm/components/${componentName}/index.js'; function handler(${initialArgs}) {}; <${componentName} ${propName}={(${fixedArgs}) => handler(${initialArgs})} />;`,
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

function getMoveSpecifiersValidtests(
  specifiersToMoveArray,
  movingFrom = "deprecated"
) {
  const tests = [];

  specifiersToMoveArray.forEach((specifier) => {
    const package = specifier.includes("Table") ? "table" : "core";

    // Previously fixed import or pre-existing comment
    tests.push({
      code: `import { ${specifier} /* data-codemods */ } from '@patternfly/react-${package}';`,
    });
    // No @patternfly/react-core import
    tests.push({
      code: `import { ${specifier} } from 'foo';`,
    });
    // No @patternfly/react-core export
    tests.push({
      code: `export { ${specifier} as CustomExport } from 'foo';`,
    });

    if (movingFrom === "deprecated") {
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/next';`,
      });
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/deprecated';`,
      });
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
      });
      // Export
      tests.push({
        code: `export { ${specifier} as CustomExport } from '@patternfly/react-${package}/deprecated';`,
      });
      // Export from dist
      tests.push({
        code: `export { ${specifier} as CustomExport } from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
      });
    }

    if (movingFrom === "next") {
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}';`,
      });
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
      });
      // Export
      tests.push({
        code: `export { ${specifier} as CustomExport } from '@patternfly/react-${package}';`,
      });
      // Export from dist
      tests.push({
        code: `export { ${specifier} as CustomExport } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
      });
    }
  });

  return tests;
}

function getMoveSpecifiersInvalidtests(
  specifiersToMoveArray,
  newImplementation,
  movingFrom = "deprecated"
) {
  const tests = [];
  const endOfMessage = newImplementation
    ? `, but we suggest using our ${newImplementation} implementation.`
    : ".";
  const createErrors = (specifierName, isExportTest) => [
    {
      message:
        movingFrom === "deprecated"
          ? `${specifierName} has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package${endOfMessage}`
          : `${specifierName} has been promoted as our default implementation. Running the fix flag will update your imports and/or exports.`,
      type: isExportTest ? "ExportNamedDeclaration" : "ImportDeclaration",
    },
  ];

  specifiersToMoveArray.forEach((specifier) => {
    const package = specifier.includes("Table") ? "table" : "core";
    const importErrors = createErrors(specifier);
    const exportErrors = createErrors(specifier, true);

    if (movingFrom === "deprecated") {
      // No existing deprecated import + no other core import
      tests.push({
        code: `import {${specifier} } from '@patternfly/react-${package}';`,
        output: `import {\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });
      // No existing deprecated import + another core import
      tests.push({
        code: `import {${specifier}, Foo } from '@patternfly/react-${package}';`,
        output: `import {\n\tFoo\n} from '@patternfly/react-${package}';\nimport {\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });
      // No existing deprecated import + another core import with comment
      tests.push({
        code: `import {${specifier}, Foo /* data-codemods */ } from '@patternfly/react-${package}';`,
        output: `import {\n\tFoo /* data-codemods */\n} from '@patternfly/react-${package}';\nimport {\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });
      // Another existing deprecated import with comment + no other core import
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}';\nimport { Foo /* data-codemods */ } from '@patternfly/react-${package}/deprecated';`,
        output: `\nimport {\n\tFoo /* data-codemods */,\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });
      // Another existing deprecated import + no other core import
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}';\nimport { Foo } from '@patternfly/react-${package}/deprecated';`,
        output: `\nimport {\n\tFoo,\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });
      // Import from dist: no existing deprecated import + no other core import
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        output: `import {\n\t${specifier}\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
        errors: importErrors,
      });
      // Import from dist: another existing deprecated import + no other core import
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';\nimport { Foo } from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
        output: `\nimport {\n\tFoo,\n\t${specifier}\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
        errors: importErrors,
      });
      // Aliased import
      tests.push({
        code: `import { ${specifier} as PF${specifier} } from '@patternfly/react-${package}';`,
        output: `import {\n\t${specifier} as PF${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });
      // Aliased import from dist: No existing deprecated import + no other core import
      tests.push({
        code: `import { ${specifier} as PF${specifier} } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        output: `import {\n\t${specifier} as PF${specifier}\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
        errors: importErrors,
      });
      // Aliased import from dist: Another existing deprecated import + no other core import
      tests.push({
        code: `import { ${specifier} as PF${specifier} } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js'; import { Foo } from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
        output: ` import {\n\tFoo,\n\t${specifier} as PF${specifier}\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
        errors: importErrors,
      });
      // With type
      tests.push({
        code: `import type {${specifier} } from '@patternfly/react-${package}';\nimport { Foo } from '@patternfly/react-${package}/deprecated';\nimport type { FooType } from '@patternfly/react-${package}/deprecated';`,
        output: `\nimport { Foo } from '@patternfly/react-${package}/deprecated';\nimport type {\n\tFooType,\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });
      tests.push({
        code: `import type {${specifier} } from '@patternfly/react-${package}';\nimport { Foo } from '@patternfly/react-${package}/deprecated';`,
        output: `import type {\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';\nimport { Foo } from '@patternfly/react-${package}/deprecated';`,
        errors: importErrors,
      });

      // No existing deprecated export + no other core export
      tests.push({
        code: `export {${specifier} as CustomExport } from '@patternfly/react-${package}';`,
        output: `export {\n\t${specifier} as CustomExport\n} from '@patternfly/react-${package}/deprecated';`,
        errors: exportErrors,
      });
      // No existing deprecated export + another core export
      tests.push({
        code: `export {${specifier} as CustomExport, Foo as Bar } from '@patternfly/react-${package}';`,
        output: `export {\n\tFoo as Bar\n} from '@patternfly/react-${package}';\nexport {\n\t${specifier} as CustomExport\n} from '@patternfly/react-${package}/deprecated';`,
        errors: exportErrors,
      });
      // Another existing deprecated export + no other core export
      tests.push({
        code: `export {${specifier} as CustomExport } from '@patternfly/react-${package}';\nexport { Foo as Bar } from '@patternfly/react-${package}/deprecated';`,
        output: `\nexport {\n\tFoo as Bar,\n\t${specifier} as CustomExport\n} from '@patternfly/react-${package}/deprecated';`,
        errors: exportErrors,
      });
      // Export from dist
      tests.push({
        code: `export {${specifier} as CustomExport } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        output: `export {\n\t${specifier} as CustomExport\n} from '@patternfly/react-${package}/dist/esm/deprecated/components/${specifier}/index.js';`,
        errors: exportErrors,
      });
      // With type
      tests.push({
        code: `export type {${specifier} } from '@patternfly/react-${package}';\nexport { Foo } from '@patternfly/react-${package}/deprecated';\nexport type { FooType } from '@patternfly/react-${package}/deprecated';`,
        output: `\nexport { Foo } from '@patternfly/react-${package}/deprecated';\nexport type {\n\tFooType,\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';`,
        errors: exportErrors,
      });
      tests.push({
        code: `export type {${specifier} } from '@patternfly/react-${package}';\nexport { Foo } from '@patternfly/react-${package}/deprecated';`,
        output: `export type {\n\t${specifier}\n} from '@patternfly/react-${package}/deprecated';\nexport { Foo } from '@patternfly/react-${package}/deprecated';`,
        errors: exportErrors,
      });
    }

    if (movingFrom === "next") {
      // No other next import + no existing core import
      tests.push({
        code: `import {${specifier} } from '@patternfly/react-${package}/next';`,
        output: `import {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: importErrors,
      });
      // No other next import + existing core import
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/next';\nimport { Foo } from '@patternfly/react-${package}';`,
        output: `\nimport {\n\tFoo,\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: importErrors,
      });
      // Another next import + no existing core import
      tests.push({
        code: `import {${specifier}, Foo } from '@patternfly/react-${package}/next';`,
        output: `import {\n\tFoo\n} from '@patternfly/react-${package}/next';\nimport {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: importErrors,
      });
      // Another next import with comment + no existing core import
      tests.push({
        code: `import {${specifier}, Foo /* data-codemods */ } from '@patternfly/react-${package}/next';`,
        output: `import {\n\tFoo /* data-codemods */\n} from '@patternfly/react-${package}/next';\nimport {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: importErrors,
      });
      // Import from dist: no other next import + no existing core import
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/dist/esm/next/components/${specifier}/index.js';`,
        output: `import {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        errors: importErrors,
      });
      // Import from dist: no other next import + existing core import
      tests.push({
        code: `import { ${specifier} } from '@patternfly/react-${package}/dist/esm/next/components/${specifier}/index.js';\nimport { Foo } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        output: `\nimport {\n\tFoo,\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        errors: importErrors,
      });
      // Aliased import
      tests.push({
        code: `import { ${specifier} as PF${specifier} } from '@patternfly/react-${package}/next';`,
        output: `import {\n\t${specifier} as PF${specifier} /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: importErrors,
      });
      // Aliased import from dist: No other next import + no existing core import
      tests.push({
        code: `import { ${specifier} as PF${specifier} } from '@patternfly/react-${package}/dist/esm/next/components/${specifier}/index.js';`,
        output: `import {\n\t${specifier} as PF${specifier} /* data-codemods */\n} from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        errors: importErrors,
      });
      // Aliased import from dist: No other next import + existing core import
      tests.push({
        code: `import { ${specifier} as PF${specifier} } from '@patternfly/react-${package}/dist/esm/next/components/${specifier}/index.js'; import { Foo } from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        output: ` import {\n\tFoo,\n\t${specifier} as PF${specifier} /* data-codemods */\n} from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        errors: importErrors,
      });

      // No other next export + no existing core export
      tests.push({
        code: `export {${specifier} as CustomExport } from '@patternfly/react-${package}/next';`,
        output: `export {\n\t${specifier} as CustomExport /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: exportErrors,
      });
      // Another next export + no existing core export
      tests.push({
        code: `export {${specifier} as CustomExport, Foo as Bar } from '@patternfly/react-${package}/next';`,
        output: `export {\n\tFoo as Bar\n} from '@patternfly/react-${package}/next';\nexport {\n\t${specifier} as CustomExport /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: exportErrors,
      });
      // No other next export + existing core export
      tests.push({
        code: `export {${specifier} as CustomExport } from '@patternfly/react-${package}/next';\nexport { Foo as Bar } from '@patternfly/react-${package}';`,
        output: `\nexport {\n\tFoo as Bar,\n\t${specifier} as CustomExport /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: exportErrors,
      });
      // Export from dist
      tests.push({
        code: `export {${specifier} as CustomExport } from '@patternfly/react-${package}/dist/esm/next/components/${specifier}/index.js';`,
        output: `export {\n\t${specifier} as CustomExport /* data-codemods */\n} from '@patternfly/react-${package}/dist/esm/components/${specifier}/index.js';`,
        errors: exportErrors,
      });
      // With type
      tests.push({
        code: `export type {${specifier} } from '@patternfly/react-${package}/next';\nexport { Foo } from '@patternfly/react-${package}';\nexport type { FooType } from '@patternfly/react-${package}';`,
        output: `\nexport { Foo } from '@patternfly/react-${package}';\nexport type {\n\tFooType,\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-${package}';`,
        errors: exportErrors,
      });
    }
  });

  return tests;
}

function createMoveSpecifiersTester(
  ruleName,
  specifiersToMoveArray,
  newImplementation,
  movingFrom = "deprecated"
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);

  ruleTester.run(ruleName, rule, {
    valid: getMoveSpecifiersValidtests(specifiersToMoveArray, movingFrom),
    invalid: getMoveSpecifiersInvalidtests(
      specifiersToMoveArray,
      newImplementation,
      movingFrom
    ),
  });
}

module.exports = {
  addCallbackParamTester,
  swapCallbackParamTester,
  createMoveSpecifiersTester,
};
