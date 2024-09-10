// replacements (fixable with --fix)
import global_BorderWidth_lg from "@patternfly/react-tokens/dist/esm/global_BorderWidth_lg";
import { global_FontWeight_normal } from "@patternfly/react-tokens";

global_BorderWidth_lg;
global_FontWeight_normal;

document.documentElement.style.setProperty("--pf-v5-global--ZIndex--lg", "3");
<div
  style={{
    borderWidth: "var(--pf-v5-global--BorderWidth--lg)",
    boxShadow: "var(--pf-v5-global--BoxShadow--sm)",
    marginTop: "var(--pf-v5-global--spacer--3xl)",
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
