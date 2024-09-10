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
