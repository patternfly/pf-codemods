const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/popover-remove-props');

ruleTester.run("popover-remove-props", rule, {
  valid: [
    {
      code: `import { Popover } from '@patternfly/react-core'; <Popover />`,
    },
    {
      code: `import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <Popover />`,
    },
    {
      //handler doesn't have parameter
      code:   `import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; const onHideHandler = () => {}; <Popover onHide={onHideHandler} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Popover />`,
    }
  ],
  invalid: [
    {
      code:   `import { Popover } from '@patternfly/react-core'; <Popover boundary={} tippyProps={} />`,
      output: `import { Popover } from '@patternfly/react-core'; <Popover   />`,
      errors: [{
        message: "Popover boundary prop has been removed.",
        type: "JSXElement",
      },
      {
        message: "Popover tippyProps prop has been removed.",
        type: "JSXElement",
      }],
    },
    {
      code:   `import { Popover as Pop } from '@patternfly/react-core'; <Pop boundary={} tippyProps={} />`,
      output: `import { Popover as Pop } from '@patternfly/react-core'; <Pop   />`,
      errors: [{
        message: "Popover boundary prop has been removed.",
        type: "JSXElement",
      },
      {
        message: "Popover tippyProps prop has been removed.",
        type: "JSXElement",
      }],
    },
    {
      code:   `import { Popover } from '@patternfly/react-core'; <Popover shouldClose={(tip, hideFunct) => {}} />`,
      output: `import { Popover } from '@patternfly/react-core'; <Popover shouldClose={(hideFunct) => {}} />`,
      errors: [ 
      {
        message: "Popover shouldClose function's first parameter has been removed.",
        type: "JSXElement",
      }],
    },
    {
      code:   `import { Popover } from '@patternfly/react-core'; <Popover onHidden={tip => {}} onHide={tip => {}} onMount={tip => {}} onShow={tip => {}} onShown={tip => {}} />`,
      errors: [
      {
        message: "Popover onHidden function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onHide function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onMount function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onShow function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onShown function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      }],
    },
    {
      code:   `import { Popover } from '@patternfly/react-core'; <Popover onHidden={(tip) => {}} onHide={(tip) => {}} onMount={(tip) => {}} onShow={(tip) => {}} onShown={(tip) => {}} />`,
      errors: [
      {
        message: "Popover onHidden function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onHide function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onMount function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onShow function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onShown function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      }],
    },
    {
      code:   `import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <Popover onHidden={(tip) => {}} onHide={(tip) => {}} onMount={(tip) => {}} onShow={(tip) => {}} onShown={(tip) => {}} />`,
      errors: [
      {
        message: "Popover onHidden function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onHide function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onMount function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onShow function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      },
      {
        message: "Popover onShown function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      }],
    },
    {
      code:   `import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; const onHideHandler = (fn) => {}; <Popover onHide={onHideHandler} />`,
      errors: [
      {
        message: "Popover onHide function's parameter has been removed. Please update your code accordingly.",
        type: "JSXElement",
      }],
    }
  ]
});
