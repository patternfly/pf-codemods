// replacements (fixable with --fix)
import global_border_width_extra_strong from "@patternfly/react-tokens/dist/esm/global_border_width_extra_strong";
import { global_font_weight_body_default } from "@patternfly/react-tokens";

global_border_width_extra_strong;
global_font_weight_body_default;

document.documentElement.style.setProperty("--pf-t--global--z-index--lg", "3");
<div
  style={{
    borderWidth: "var(--pf-t--global--border--width--extra-strong)",
    boxShadow: "var(--pf-t--global--box-shadow--sm)",
    marginTop: "var(--pf-t--global--spacer--3xl)",
  }}
></div>;

// warnings (not fixable)
import global_warning_color_100 from "@patternfly/react-tokens/dist/esm/global_warning_color_100";
import { c_alert__FontSize } from "@patternfly/react-tokens";

global_warning_color_100;
c_alert__FontSize;

<div
  style={{
    color: "var(--pf-v5-global--success-color--200)",
    width: "var(--pf-v5-global--arrow--width)",
  }}
></div>;

// Colors
import global_Color_100/* CODEMODS: you should update this color token */ from "@patternfly/react-tokens/dist/esm/temp_dev_tbd";
import { temp_dev_tbd as global_Color_200 /* CODEMODS: you should update this color token */ } from "@patternfly/react-tokens/dist/esm/temp_dev_tbd";
import { temp_dev_tbd as color300 /* CODEMODS: you should update this color token, original v5 token was global_Color_300 */ } from "@patternfly/react-tokens/dist/esm/temp_dev_tbd";
import { temp_dev_tbd as global_BorderColor_100 /* CODEMODS: you should update this color token */ } from "@patternfly/react-tokens";

global_Color_100;
global_Color_200;
color300;
global_BorderColor_100;

<div
  style={{
    color: "var(--pf-t--temp--dev--tbd)"/* CODEMODS: original v5 color was --pf-v5-global--Color--100 */,
    backgroundColor: "var(--pf-t--temp--dev--tbd)"/* CODEMODS: original v5 color was --pf-v5-global--Color--200 */,
  }}
></div>;
