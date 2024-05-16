const ruleTester = require("../../ruletester");
import * as rule from "./toolbar-update-align-values";

const componentProps: { [key: string]: string } = {
  ToolbarGroup: "align",
  ToolbarItem: "align",
  ToolbarToggleGroup: "alignment",
};

for (const component in componentProps) {
  const prop = componentProps[component];
  const createMessage = (componentName = component) =>
    `The values for the \`${prop}\` property on ${componentName} have been updated from "alignLeft" and "alignRight" to "alignStart" and "alignEnd", respectively.`;

  ruleTester.run("toolbar-update-align-values", rule, {
    valid: [
      {
        code: `<${component} ${prop}={{default: "alignLeft"}} />`,
      },
      {
        code: `<${component} ${prop}={{default: "alignRight"}} />`,
      },
      {
        code: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignStart"}} />`,
      },
      {
        code: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignEnd"}} />`,
      },
    ],
    invalid: [
      {
        code: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignLeft"}} />`,
        output: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignStart"}} />`,
        errors: [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ],
      },
      {
        code: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignRight"}} />`,
        output: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignEnd"}} />`,
        errors: [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ],
      },
      {
        code: `import { ${component} } from '@patternfly/react-core'; const alignProp = {default: "alignLeft"}; <${component} ${prop}={alignProp} />`,
        output: `import { ${component} } from '@patternfly/react-core'; const alignProp = {default: "alignStart"}; <${component} ${prop}={alignProp} />`,
        errors: [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ],
      },
      // Multiple properties
      {
        code: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignLeft", md: "alignRight", lg: "alignLeft", xl: "alignRight", "2xl": "alignLeft"}} />`,
        output: `import { ${component} } from '@patternfly/react-core'; <${component} ${prop}={{default: "alignStart", md: "alignEnd", lg: "alignStart", xl: "alignEnd", "2xl": "alignStart"}} />`,
        errors: [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ],
      },
      // Aliased import
      {
        code: `import { ${component} as Custom${component} } from '@patternfly/react-core'; <Custom${component} ${prop}={{default: "alignLeft"}} />`,
        output: `import { ${component} as Custom${component} } from '@patternfly/react-core'; <Custom${component} ${prop}={{default: "alignStart"}} />`,
        errors: [
          {
            message: createMessage(`Custom${component}`),
            type: "JSXOpeningElement",
          },
        ],
      },
      // Import from dist/esm
      {
        code: `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} ${prop}={{default: "alignLeft"}} />`,
        output: `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} ${prop}={{default: "alignStart"}} />`,
        errors: [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ],
      },
      // Import from dist/js
      {
        code: `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} ${prop}={{default: "alignLeft"}} />`,
        output: `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} ${prop}={{default: "alignStart"}} />`,
        errors: [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ],
      },
      // Import from dist/dynamic
      {
        code: `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} ${prop}={{default: "alignLeft"}} />`,
        output: `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} ${prop}={{default: "alignStart"}} />`,
        errors: [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ],
      },
    ],
  });
}
