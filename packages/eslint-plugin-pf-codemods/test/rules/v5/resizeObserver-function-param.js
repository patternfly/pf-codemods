const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/resizeObserver-function-param");

ruleTester.run("resizeObserver-function-param", rule, {
  valid: [
    {
      code: `import { getResizeObserver } from '@patternfly/react-core'; const observer = getResizeObserver(this.pageRef.current, this.handleResize, true)`,
    },
  ],
  invalid: [
    {
      code: `import { getResizeObserver } from '@patternfly/react-core'; const observer = getResizeObserver(this.pageRef.current, this.handleResize)`,
      errors: [
        {
          message:
            "A third parameter, useRequestAnimationFrame, has been added to the getResizeObserver function.",
          type: "CallExpression",
          suggestions: [
            {
              desc: "Pass in a value of false when the callback passed in is debounced. This maintains the previous functionality.",
              output: `import { getResizeObserver } from '@patternfly/react-core'; const observer = getResizeObserver(this.pageRef.current, this.handleResize, false)`,
            },
            {
              desc: "Omit the third argument or pass in a value of true if the callback passed in is not debounced. This is the new default functionality.",
              output: `import { getResizeObserver } from '@patternfly/react-core'; const observer = getResizeObserver(this.pageRef.current, this.handleResize, true)`,
            },
          ],
        },
      ],
    },
  ],
});
