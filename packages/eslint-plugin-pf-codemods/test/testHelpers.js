const ruleTester = require("./ruletester");

function getAddCallbackParamMessage(componentName, propName, newParamName) {
  return `The "${propName}" prop for ${componentName} has been updated so that the "${newParamName}" parameter is the first parameter. "${propName}" handlers may require an update.`;
}

function getValidAddCallbackParamTests(componentNameArray, propNameArray, newParamName) {
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
  previousParamIndex
) {
  let tests = [];

  componentNameArray.forEach((componentName) => {
    propNameArray.forEach((propName) => {
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(id) => handler(id)} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(${newParamName}, id) => handler(id)} />;`,
        errors: [
          {
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
            message: getAddCallbackParamMessage(
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
              message: getAddCallbackParamMessage(
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
              message: getAddCallbackParamMessage(
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
              message: getAddCallbackParamMessage(
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
              message: getAddCallbackParamMessage(
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
  newParamName
) {
  let tests = getInvalidAddCallbackParamTests(
    componentNameArray,
    propNameArray,
    newParamName,
    previousParamIndex
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
                message: getAddCallbackParamMessage(
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
                message: getAddCallbackParamMessage(
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
  newParamName = "_event"
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);
  const componentNameArray =
    typeof componentNames === "string" ? [componentNames] : componentNames;
  const propNameArray = typeof propNames === "string" ? [propNames] : propNames;

  ruleTester.run(ruleName, rule, {
    valid: getValidAddCallbackParamTests(componentNameArray, propNameArray, newParamName),
    invalid: getInvalidAddCallbackParamTests(
      componentNameArray,
      propNameArray,
      newParamName
    ),
  });
}

function swapCallbackParamTester(
  ruleName,
  componentNames,
  propNames,
  previousParamIndex,
  newParamName = "_event"
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);
  const componentNameArray =
    typeof componentNames === "string" ? [componentNames] : componentNames;
  const propNameArray = typeof propNames === "string" ? [propNames] : propNames;

  ruleTester.run(ruleName, rule, {
    valid: getValidAddCallbackParamTests(componentNameArray, propNameArray, newParamName),
    invalid: getInvalidSwapCallbackParamTests(
      componentNameArray,
      propNameArray,
      previousParamIndex,
      newParamName
    ),
  });
}

function splitImports(importsToSplit) {
  const otherImports = [];
  const componentImports = importsToSplit
    .filter(
      (importToMove) =>
        importToMove.type === "component" ||
        (otherImports.push(importToMove.name) && false)
    )
    .map((importToMove) => importToMove.name);

  return [componentImports, otherImports];
}

function getMoveSpecifiersValidtests(importsToMoveArray) {
  const tests = [];
  const [componentImports, otherImports] = splitImports(importsToMoveArray);

  componentImports.forEach((componentImport) => {
    tests.push({
      code: `import { ${componentImport} } from '@patternfly/react-core/next'; <${componentImport} />;`,
    });
    tests.push({
      code: `import { ${componentImport} } from '@patternfly/react-core/deprecated'; <${componentImport} />;`,
    });
    tests.push({
      code: `import { ${componentImport} } from '@patternfly/react-core/dist/esm/deprecated/components/${componentImport}/index.js'; <${componentImport} />;`,
    });
    tests.push({
      code: `<${componentImport} />;`,
    });
    tests.push({
      code: `import { ${componentImport} } from 'foo'; <${componentImport} />;`,
    });
  });

  otherImports.forEach((otherImport) => {
    tests.push({
      code: `import { ${otherImport} } from '@patternfly/react-core/deprecated'; <Bar prop={${otherImport}} />;`,
    });
    tests.push({
      code: `import { ${otherImport} } from '@patternfly/react-core/dist/esm/deprecated/components/${otherImport}/index.js'; <Bar prop={${otherImport}} />;`,
    });
    tests.push({
      code: `<Bar prop={${otherImport}} />;`,
    });
    tests.push({
      code: `import { ${otherImport} } from 'foo'; <Bar prop={${otherImport}} />;`,
    });
  });
  return tests;
}

function getMoveSpecifiersInvalidtests(importsToMoveArray, newImplementation) {
  const tests = [];
  const [componentImports, otherImports] = splitImports(importsToMoveArray);
  const endOfMessage = newImplementation
    ? `, but we suggest using our ${newImplementation} implementation.`
    : ".";
  const createErrors = (specifierName) => [
    {
      message: `${specifierName} has been deprecated. Running the fix flag will update your imports to our deprecated package${endOfMessage}`,
      type: "ImportDeclaration",
    },
    {
      message: `${specifierName} has been deprecated. Running the fix flag will update names${endOfMessage}`,
      type: "JSXElement",
    },
  ];

  componentImports.forEach((componentImport) => {
    const package = componentImport.includes("Table") ? "table" : "core";

    tests.push({
      code: `import {${componentImport} } from '@patternfly/react-${package}'; <${componentImport} />`,
      output: `import {\n\t${componentImport} as ${componentImport}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentImport}Deprecated />`,
      errors: createErrors(componentImport),
    });
    tests.push({
      code: `import {${componentImport}, Foo } from '@patternfly/react-${package}'; <${componentImport} />`,
      output: `import {\n\tFoo\n} from '@patternfly/react-${package}';\nimport {\n\t${componentImport} as ${componentImport}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentImport}Deprecated />`,
      errors: createErrors(componentImport),
    });
    tests.push({
      code: `import { ${componentImport}, Foo } from '@patternfly/react-${package}'; <${componentImport}></${componentImport}>`,
      output: `import {\n\tFoo\n} from '@patternfly/react-${package}';\nimport {\n\t${componentImport} as ${componentImport}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentImport}Deprecated></${componentImport}Deprecated>`,
      errors: createErrors(componentImport),
    });
    tests.push({
      code: `import { ${componentImport} } from '@patternfly/react-${package}';\nimport { Foo } from '@patternfly/react-${package}/deprecated'; <${componentImport} />`,
      output: `\nimport {\n\tFoo,\n\t${componentImport} as ${componentImport}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <${componentImport}Deprecated />`,
      errors: createErrors(componentImport),
    });
    tests.push({
      code: `import { ${componentImport} as PF${componentImport} } from '@patternfly/react-${package}'; <PF${componentImport} />`,
      output: `import {\n\t${componentImport} as PF${componentImport}\n} from '@patternfly/react-${package}/deprecated'; <PF${componentImport} />`,
      errors: [
        {
          message: `${componentImport} has been deprecated. Running the fix flag will update your imports to our deprecated package${endOfMessage}`,
          type: "ImportDeclaration",
        },
      ],
    });
  });

  otherImports.forEach((otherImport) => {
    const package = otherImport.includes("Table") ? "table" : "core";
    tests.push({
      code: `import {${otherImport} } from '@patternfly/react-${package}'; <Foo bar={${otherImport}} />`,
      output: `import {\n\t${otherImport} as ${otherImport}Deprecated\n} from '@patternfly/react-${package}/deprecated'; <Foo bar={${otherImport}Deprecated} />`,
      errors: createErrors(otherImport),
    });
  });
  return tests;
}

function createMoveSpecifiersTester(
  ruleName,
  importsToMoveArray,
  newImplementation
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);

  ruleTester.run(ruleName, rule, {
    valid: getMoveSpecifiersValidtests(importsToMoveArray),
    invalid: getMoveSpecifiersInvalidtests(
      importsToMoveArray,
      newImplementation
    ),
  });
}

module.exports = {
  addCallbackParamTester,
  swapCallbackParamTester,
  createMoveSpecifiersTester,
};
