const ruleTester = require("./ruletester");

function getAddCallbackParamMessage(componentName, propName, newParamName) {
  return `The "${propName}" prop for ${componentName} has been updated so that the "${newParamName}" parameter is the first parameter. "${propName}" handlers may require an update.`;
}

function getValidAddCallbackParamTests(componentNameArray, propNameArray) {
  let tests = [];

  componentNameArray.forEach((componentName) => {
    tests.push({
      code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} />;`,
    });
    propNameArray.forEach((propName) => {
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={() => handler()} />;`,
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; const handler = () => {}; <${componentName} ${propName}={handler} />;`,
      });
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; function handler() {}; <${componentName} ${propName}={handler} />;`,
      });
      tests.push({ code: `<${componentName} ${propName} />;` });
    });
  });
  return tests;
}

function getInvalidAddCallbackParamTests(
  componentNameArray,
  propNameArray,
  newParamName
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
        code: `import { ${componentName} } from '@patternfly/react-core'; const handler = (id) => {}; <${componentName} ${propName}={handler} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; const handler = (${newParamName}, id) => {}; <${componentName} ${propName}={handler} />;`,
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
    });
  });
  return tests;
}

function getInvalidSwapCallbackParamTests(
  componentNameArray,
  propNameArray,
  newParamName
) {
  let tests = getInvalidAddCallbackParamTests(
    componentNameArray,
    propNameArray,
    newParamName
  );

  componentNameArray.forEach((componentName) => {
    propNameArray.forEach((propName) => {
      tests.push({
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(id, ${newParamName}) => handler(id)} />;`,
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
        code: `import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName}={(id, ${newParamName}, text) => handler(id)} />;`,
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
        code: `import { ${componentName} } from '@patternfly/react-core'; const handler = (id, ${newParamName}) => {}; <${componentName} ${propName}={handler} />;`,
        output: `import { ${componentName} } from '@patternfly/react-core'; const handler = (${newParamName}, id) => {}; <${componentName} ${propName}={handler} />;`,
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
        code: `import { ${componentName} } from '@patternfly/react-core'; const handler = (id, ${newParamName}, text) => {}; <${componentName} ${propName}={handler} />;`,
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
        code: `import { ${componentName} } from '@patternfly/react-core'; function handler(id, ${newParamName}) {}; <${componentName} ${propName}={handler} />;`,
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
        code: `import { ${componentName} } from '@patternfly/react-core'; function handler(id, ${newParamName}, text) {}; <${componentName} ${propName}={handler} />;`,
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
    });
  });
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
    valid: getValidAddCallbackParamTests(componentNameArray, propNameArray),
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
  newParamName = "_event"
) {
  const rule = require(`../lib/rules/v5/${ruleName}`);
  const componentNameArray =
    typeof componentNames === "string" ? [componentNames] : componentNames;
  const propNameArray = typeof propNames === "string" ? [propNames] : propNames;

  ruleTester.run(ruleName, rule, {
    valid: getValidAddCallbackParamTests(componentNameArray, propNameArray),
    invalid: getInvalidSwapCallbackParamTests(
      componentNameArray,
      propNameArray,
      newParamName
    ),
  });
}

module.exports = {
  addCallbackParamTester,
  swapCallbackParamTester,
};
