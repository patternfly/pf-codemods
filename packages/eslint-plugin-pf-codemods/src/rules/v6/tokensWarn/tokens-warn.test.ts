const ruleTester = require("../../ruletester");
import * as rule from "./tokens-warn";

const getWarnMessage = (tokenName: string) =>
  `${tokenName} is an old CSS token. About half of our tokens have been replaced with newer ones. To find a suitable replacement token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

ruleTester.run("tokens-warn", rule, {
  valid: [
    // token existing in V6
    {
      code: `import c_about_modal_box from '@patternfly/react-tokens/dist/esm/c_about_modal_box';`,
    },
    // token existing in V6
    {
      code: `import { c_about_modal_box } from '@patternfly/react-tokens';`,
    },
  ],
  invalid: [
    {
      code: `import { global_info_color_100 } from '@patternfly/react-tokens';`,
      output: `import { global_info_color_100 } from '@patternfly/react-tokens';`,
      errors: [
        {
          message: getWarnMessage("global_info_color_100"),
          type: "ImportSpecifier",
        },
      ],
    },
    // with alias
    {
      code: `import { global_info_color_100 as infoColor } from '@patternfly/react-tokens';`,
      output: `import { global_info_color_100 as infoColor } from '@patternfly/react-tokens';`,
      errors: [
        {
          message: getWarnMessage("global_info_color_100"),
          type: "ImportSpecifier",
        },
      ],
    },
    {
      // named import - esm
      code: `import { global_info_color_100 } from '@patternfly/react-tokens/dist/esm/global_info_color_100';`,
      output: `import { global_info_color_100 } from '@patternfly/react-tokens/dist/esm/global_info_color_100';`,
      errors: [
        {
          message: getWarnMessage("global_info_color_100"),
          type: "ImportSpecifier",
        },
      ],
    },
    {
      // named import - js
      code: `import { global_info_color_100 } from '@patternfly/react-tokens/dist/js/global_info_color_100';`,
      output: `import { global_info_color_100 } from '@patternfly/react-tokens/dist/js/global_info_color_100';`,
      errors: [
        {
          message: getWarnMessage("global_info_color_100"),
          type: "ImportSpecifier",
        },
      ],
    },
    {
      // default import - esm
      code: `import global_info_color_100 from '@patternfly/react-tokens/dist/esm/global_info_color_100';`,
      output: `import global_info_color_100 from '@patternfly/react-tokens/dist/esm/global_info_color_100';`,
      errors: [
        {
          message: getWarnMessage("global_info_color_100"),
          type: "ImportDeclaration",
        },
      ],
    },
    {
      // default import - js
      code: `import global_info_color_100 from '@patternfly/react-tokens/dist/js/global_info_color_100';`,
      output: `import global_info_color_100 from '@patternfly/react-tokens/dist/js/global_info_color_100';`,
      errors: [
        {
          message: getWarnMessage("global_info_color_100"),
          type: "ImportDeclaration",
        },
      ],
    },
    {
      // default import with custom name
      code: `import someToken from '@patternfly/react-tokens/dist/esm/global_info_color_100';`,
      output: `import someToken from '@patternfly/react-tokens/dist/esm/global_info_color_100';`,
      errors: [
        {
          message: getWarnMessage("global_info_color_100"),
          type: "ImportDeclaration",
        },
      ],
    },
    // CSS variables in strings
    {
      code: `<div style={{ "--pf-v5-global--success-color--200": "#abc" }}></div>`,
      output: `<div style={{ "--pf-v5-global--success-color--200": "#abc" }}></div>`,
      errors: [
        {
          message: getWarnMessage("--pf-v5-global--success-color--200"),
          type: "Literal",
        },
      ],
    },
    {
      code: `<div style={{ borderWidth: "var(--pf-v5-global--BorderWidth--lg)" }}></div>`,
      output: `<div style={{ borderWidth: "var(--pf-t--global--border--width--extra-strong)" }}></div>`,
      errors: [
        {
          message:
            "--pf-v5-global--BorderWidth--lg is an old CSS token and has been replaced with --pf-t--global--border--width--extra-strong. If you want to use a different token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.",
          type: "Literal",
        },
      ],
    },
  ],
});
