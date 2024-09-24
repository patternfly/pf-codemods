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
import c_badge_PaddingLeft from "@patternfly/react-tokens/dist/esm/c_badge_PaddingLeft";
import { c_alert__FontSize } from "@patternfly/react-tokens";

c_badge_PaddingLeft;
c_alert__FontSize;

<div
  style={{
    fontSize: "var(--pf-v5-c-alert__FontSize)",
    width: "var(--pf-v5-global--arrow--width)",
  }}
></div>;

// Colors
import global_Color_100 from "@patternfly/react-tokens/dist/esm/global_Color_100";
import { global_Color_200 } from "@patternfly/react-tokens/dist/esm/global_Color_200";
import { global_Color_300 as color300 } from "@patternfly/react-tokens/dist/esm/global_Color_300";
import { global_BorderColor_100 } from "@patternfly/react-tokens";

global_Color_100;
global_Color_200;
color300;
global_BorderColor_100;

<div
  style={{
    color: "var(--pf-v5-global--Color--100)",
    backgroundColor: "var(--pf-v5-global--Color--200)",
  }}
></div>;
