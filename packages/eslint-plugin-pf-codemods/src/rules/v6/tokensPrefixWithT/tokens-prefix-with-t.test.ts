const ruleTester = require("../../ruletester");
import * as rule from "./tokens-prefix-with-t";

const message = `React tokens, whose value is a Patternfly token variable (has prefix --pf-t), are now prefixed with t_`;

ruleTester.run("tokens-prefix-with-t", rule, {
  valid: [
    // tokens wich are not "--pf-t" variables
    {
      code: `import c_about_modal_box from '@patternfly/react-tokens/dist/esm/c_about_modal_box';`,
    },
    {
      code: `import { c_about_modal_box } from '@patternfly/react-tokens';`,
    },
  ],
  invalid: [
    {
      code: `import { global_font_size_100 } from "@patternfly/react-tokens";
      global_font_size_100;`,
      output: `import { t_global_font_size_100 } from "@patternfly/react-tokens";
      t_global_font_size_100;`,
      errors: [
        {
          message,
          type: "ImportSpecifier",
        },
        {
          message,
          type: "Identifier",
        },
      ],
    },
    {
      // with alias
      code: `import { global_font_size_100 as customFontSize } from "@patternfly/react-tokens";
      customFontSize;`,
      output: `import { t_global_font_size_100 as customFontSize } from "@patternfly/react-tokens";
      customFontSize;`,
      errors: [
        {
          message,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      // named import - esm
      code: `import { global_font_size_100 } from '@patternfly/react-tokens/dist/esm/global_font_size_100';
      global_font_size_100;`,
      output: `import { t_global_font_size_100 } from "@patternfly/react-tokens/dist/esm/t_global_font_size_100";
      t_global_font_size_100;`,
      errors: [
        {
          message,
          type: "ImportSpecifier",
        },
        {
          message,
          type: "Identifier",
        },
      ],
    },
    {
      // named import - js
      code: `import { global_font_size_100 } from '@patternfly/react-tokens/dist/js/global_font_size_100';
      global_font_size_100;`,
      output: `import { t_global_font_size_100 } from "@patternfly/react-tokens/dist/js/t_global_font_size_100";
      t_global_font_size_100;`,
      errors: [
        {
          message,
          type: "ImportSpecifier",
        },
        {
          message,
          type: "Identifier",
        },
      ],
    },
    {
      // default import - esm
      code: `import global_font_size_100 from '@patternfly/react-tokens/dist/esm/global_font_size_100';
      global_font_size_100;`,
      output: `import t_global_font_size_100 from "@patternfly/react-tokens/dist/esm/t_global_font_size_100";
      t_global_font_size_100;`,
      errors: [
        {
          message,
          type: "ImportDefaultSpecifier",
        },
        {
          message,
          type: "Identifier",
        },
      ],
    },
    {
      // default import - js
      code: `import global_font_size_100 from '@patternfly/react-tokens/dist/js/global_font_size_100';
      global_font_size_100;`,
      output: `import t_global_font_size_100 from "@patternfly/react-tokens/dist/js/t_global_font_size_100";
      t_global_font_size_100;`,
      errors: [
        {
          message,
          type: "ImportDefaultSpecifier",
        },
        {
          message,
          type: "Identifier",
        },
      ],
    },
    {
      // default import with custom name
      code: `import customFontSize from '@patternfly/react-tokens/dist/esm/global_font_size_100';
      customFontSize;`,
      output: `import t_global_font_size_100 from "@patternfly/react-tokens/dist/esm/t_global_font_size_100";
      t_global_font_size_100;`,
      errors: [
        {
          message,
          type: "ImportDefaultSpecifier",
        },
        {
          message,
          type: "Identifier",
        },
      ],
    },
  ],
});
