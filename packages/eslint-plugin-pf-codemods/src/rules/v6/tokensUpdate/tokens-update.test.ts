const ruleTester = require("../../ruletester");
import * as rule from "./tokens-update";

const getWarnMessage = (tokenName: string) =>
  `${tokenName} is an old CSS token. About half of our tokens have been replaced with newer ones. To find a suitable replacement token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

const getFixMessage = (oldToken: string, newToken: string) =>
  `${oldToken} is an old CSS token and has been replaced with ${newToken}. If you want to use a different token, check our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

const getColorFixMessage = (oldToken: string, isReactToken = true) =>
  `${oldToken} is an old color token. This codemod will replace it with a temporary hot pink color token ${
    isReactToken ? "t_temp_dev_tbd" : "--pf-t--temp--dev--tbd"
  } to prevent build errors. You should find a suitable replacement token in our new documentation https://staging-v6.patternfly.org/tokens/all-patternfly-tokens.`;

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
    // WARNINGS - tokens
    {
      code: `import { c_badge_PaddingLeft } from '@patternfly/react-tokens';`,
      output: null,
      errors: [
        {
          message: getWarnMessage("c_badge_PaddingLeft"),
        },
      ],
    },
    {
      // with alias
      code: `import { c_badge_PaddingLeft as badgePL } from '@patternfly/react-tokens';`,
      output: null,
      errors: [
        {
          message: getWarnMessage("c_badge_PaddingLeft"),
        },
      ],
    },
    {
      // named import - esm
      code: `import { c_badge_PaddingLeft } from '@patternfly/react-tokens/dist/esm/c_badge_PaddingLeft';`,
      output: null,
      errors: [
        {
          message: getWarnMessage("c_badge_PaddingLeft"),
        },
      ],
    },
    {
      // named import - js
      code: `import { c_badge_PaddingLeft } from '@patternfly/react-tokens/dist/js/c_badge_PaddingLeft';`,
      output: null,
      errors: [
        {
          message: getWarnMessage("c_badge_PaddingLeft"),
        },
      ],
    },
    {
      // default import - esm
      code: `import c_badge_PaddingLeft from '@patternfly/react-tokens/dist/esm/c_badge_PaddingLeft';`,
      output: null,
      errors: [
        {
          message: getWarnMessage("c_badge_PaddingLeft"),
        },
      ],
    },
    {
      // default import - js
      code: `import c_badge_PaddingLeft from '@patternfly/react-tokens/dist/js/c_badge_PaddingLeft';`,
      output: null,
      errors: [
        {
          message: getWarnMessage("c_badge_PaddingLeft"),
        },
      ],
    },
    {
      // default import with custom name
      code: `import someToken from '@patternfly/react-tokens/dist/esm/c_badge_PaddingLeft';`,
      output: null,
      errors: [
        {
          message: getWarnMessage("c_badge_PaddingLeft"),
        },
      ],
    },

    // WARNINGS - CSS variables
    {
      code: `document.documentElement.style.setProperty("--pf-v5-c-button--PaddingTop", "2rem");`,
      output: null,
      errors: [
        {
          message: getWarnMessage("--pf-v5-c-button--PaddingTop"),
        },
      ],
    },
    {
      code: `<div style={{ paddingBottom: "var(--pf-v5-c-banner--PaddingBottom)" }}>Some banner</div>`,
      output: null,
      errors: [
        {
          message: getWarnMessage("--pf-v5-c-banner--PaddingBottom"),
        },
      ],
    },

    // FIXES - non color tokens
    {
      code: `import { global_FontWeight_normal } from "@patternfly/react-tokens";
      global_FontWeight_normal;`,
      output: `import { global_font_weight_body_default } from "@patternfly/react-tokens";
      global_font_weight_body_default;`,
      errors: [
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
      ],
    },
    {
      // with alias
      code: `import { global_FontWeight_normal as fontW_normal } from "@patternfly/react-tokens";
      fontW_normal;`,
      output: `import { global_font_weight_body_default as fontW_normal } from "@patternfly/react-tokens";
      fontW_normal;`,
      errors: [
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
      ],
    },
    {
      // named import - esm
      code: `import { global_FontWeight_normal } from '@patternfly/react-tokens/dist/esm/global_FontWeight_normal';
      global_FontWeight_normal;`,
      output: `import { global_font_weight_body_default } from "@patternfly/react-tokens/dist/esm/global_font_weight_body_default";
      global_font_weight_body_default;`,
      errors: [
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
      ],
    },
    {
      // named import - js
      code: `import { global_FontWeight_normal } from '@patternfly/react-tokens/dist/js/global_FontWeight_normal';
      global_FontWeight_normal;`,
      output: `import { global_font_weight_body_default } from "@patternfly/react-tokens/dist/js/global_font_weight_body_default";
      global_font_weight_body_default;`,
      errors: [
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
      ],
    },
    {
      // default import - esm
      code: `import global_FontWeight_normal from '@patternfly/react-tokens/dist/esm/global_FontWeight_normal';
      global_FontWeight_normal;`,
      output: `import global_font_weight_body_default from "@patternfly/react-tokens/dist/esm/global_font_weight_body_default";
      global_font_weight_body_default;`,
      errors: [
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
      ],
    },
    {
      // default import - js
      code: `import global_FontWeight_normal from '@patternfly/react-tokens/dist/js/global_FontWeight_normal';
      global_FontWeight_normal;`,
      output: `import global_font_weight_body_default from "@patternfly/react-tokens/dist/js/global_font_weight_body_default";
      global_font_weight_body_default;`,
      errors: [
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
      ],
    },
    {
      // default import with custom name
      code: `import fontWeightNormal from '@patternfly/react-tokens/dist/esm/global_FontWeight_normal';
      fontWeightNormal;`,
      output: `import global_font_weight_body_default from "@patternfly/react-tokens/dist/esm/global_font_weight_body_default";
      global_font_weight_body_default;`,
      errors: [
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
        {
          message: getFixMessage(
            "global_FontWeight_normal",
            "global_font_weight_body_default"
          ),
        },
      ],
    },

    // FIXES - non color CSS variables
    {
      code: `document.documentElement.style.setProperty("--pf-v5-global--ZIndex--lg", "3");`,
      output: `document.documentElement.style.setProperty("--pf-t--global--z-index--lg", "3");`,
      errors: [
        {
          message: getFixMessage(
            "--pf-v5-global--ZIndex--lg",
            "--pf-t--global--z-index--lg"
          ),
        },
      ],
    },
    {
      code: `<div style={{ borderWidth: "var(--pf-v5-global--BorderWidth--lg)" }}></div>`,
      output: `<div style={{ borderWidth: "var(--pf-t--global--border--width--extra-strong)" }}></div>`,
      errors: [
        {
          message: getFixMessage(
            "--pf-v5-global--BorderWidth--lg",
            "--pf-t--global--border--width--extra-strong"
          ),
        },
      ],
    },

    // FIXES - color tokens
    {
      code: `import { global_Color_100 } from "@patternfly/react-tokens";`,
      output: `import { t_temp_dev_tbd as global_Color_100 /* CODEMODS: you should update this color token */ } from "@patternfly/react-tokens";`,
      errors: [
        {
          message: getColorFixMessage("global_Color_100"),
        },
      ],
    },
    {
      // with alias
      code: `import { global_Color_100 as color100 } from "@patternfly/react-tokens";`,
      output: `import { t_temp_dev_tbd as color100 /* CODEMODS: you should update this color token, original v5 token was global_Color_100 */ } from "@patternfly/react-tokens";`,
      errors: [
        {
          message: getColorFixMessage("global_Color_100"),
        },
      ],
    },
    {
      // named import - esm
      code: `import { global_Color_100 } from '@patternfly/react-tokens/dist/esm/global_Color_100';`,
      output: `import { t_temp_dev_tbd as global_Color_100 /* CODEMODS: you should update this color token */ } from "@patternfly/react-tokens/dist/esm/t_temp_dev_tbd";`,
      errors: [
        {
          message: getColorFixMessage("global_Color_100"),
        },
      ],
    },
    {
      // named import - js
      code: `import { global_Color_100 } from '@patternfly/react-tokens/dist/js/global_Color_100';`,
      output: `import { t_temp_dev_tbd as global_Color_100 /* CODEMODS: you should update this color token */ } from "@patternfly/react-tokens/dist/js/t_temp_dev_tbd";`,
      errors: [
        {
          message: getColorFixMessage("global_Color_100"),
        },
      ],
    },
    {
      // default import - esm
      code: `import global_Color_100 from '@patternfly/react-tokens/dist/esm/global_Color_100';`,
      output: `import global_Color_100/* CODEMODS: you should update this color token */ from "@patternfly/react-tokens/dist/esm/t_temp_dev_tbd";`,
      errors: [
        {
          message: getColorFixMessage("global_Color_100"),
        },
      ],
    },
    {
      // default import - js
      code: `import global_Color_100 from '@patternfly/react-tokens/dist/js/global_Color_100';`,
      output: `import global_Color_100/* CODEMODS: you should update this color token */ from "@patternfly/react-tokens/dist/js/t_temp_dev_tbd";`,
      errors: [
        {
          message: getColorFixMessage("global_Color_100"),
        },
      ],
    },
    {
      // default import with custom name
      code: `import someColor from '@patternfly/react-tokens/dist/esm/global_Color_100';`,
      output: `import someColor/* CODEMODS: you should update this color token, original v5 token was global_Color_100 */ from "@patternfly/react-tokens/dist/esm/t_temp_dev_tbd";`,
      errors: [
        {
          message: getColorFixMessage("global_Color_100"),
        },
      ],
    },

    // FIXES - color CSS variables
    {
      code: `document.documentElement.style.setProperty("--pf-v5-global--success-color--200", "#abc");`,
      output: `document.documentElement.style.setProperty("--pf-t--temp--dev--tbd"/* CODEMODS: original v5 color was --pf-v5-global--success-color--200 */, "#abc");`,
      errors: [
        {
          message: getColorFixMessage("--pf-v5-global--success-color--200", false),
        },
      ],
    },
    {
      code: `<div style={{ backgroundColor: "var(--pf-v5-global--Color--100)" }}></div>`,
      output: `<div style={{ backgroundColor: "var(--pf-t--temp--dev--tbd)"/* CODEMODS: original v5 color was --pf-v5-global--Color--100 */ }}></div>`,
      errors: [
        {
          message: getColorFixMessage("--pf-v5-global--Color--100", false),
        },
      ],
    },
  ],
});
