const ruleTester = require("../../ruletester");
import * as rule from "./sliderStep-warn-update-markup";

ruleTester.run("sliderStep-warn-update-markup", rule, {
  valid: [
    {
      code: `<Slider/>`,
    },
  ],
  invalid: [
    {
      code: `import { Slider } from '@patternfly/react-core'; <Slider />`,
      output: `import { Slider } from '@patternfly/react-core'; <Slider />`,
      errors: [
        {
          message: `The \`--pf-v6-c-slider__step--Left\` CSS variable applied as an inline style to SliderStep has been updated to the \`--pf-v6-c-slider__step--InsetInlineStart\` CSS variable.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Slider } from '@patternfly/react-core/dist/esm/components/Slider/index.js'; <Slider />`,
      output: `import { Slider } from '@patternfly/react-core/dist/esm/components/Slider/index.js'; <Slider />`,
      errors: [
        {
          message: `The \`--pf-v6-c-slider__step--Left\` CSS variable applied as an inline style to SliderStep has been updated to the \`--pf-v6-c-slider__step--InsetInlineStart\` CSS variable.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Slider } from '@patternfly/react-core/dist/js/components/Slider/index.js'; <Slider />`,
      output: `import { Slider } from '@patternfly/react-core/dist/js/components/Slider/index.js'; <Slider />`,
      errors: [
        {
          message: `The \`--pf-v6-c-slider__step--Left\` CSS variable applied as an inline style to SliderStep has been updated to the \`--pf-v6-c-slider__step--InsetInlineStart\` CSS variable.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Slider } from '@patternfly/react-core/dist/dynamic/components/Slider/index.js'; <Slider />`,
      output: `import { Slider } from '@patternfly/react-core/dist/dynamic/components/Slider/index.js'; <Slider />`,
      errors: [
        {
          message: `The \`--pf-v6-c-slider__step--Left\` CSS variable applied as an inline style to SliderStep has been updated to the \`--pf-v6-c-slider__step--InsetInlineStart\` CSS variable.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
