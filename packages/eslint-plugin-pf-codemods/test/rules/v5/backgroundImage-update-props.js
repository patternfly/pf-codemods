const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/backgroundImage-update-props");

ruleTester.run("backgroundImage-update-props", rule, {
  valid: [
    {
      code: `import { BackgroundImage } from '@patternfly/react-core'; <BackgroundImage src="file/path" />`,
    },
    {
      code: `import { BackgroundImage } from '@patternfly/react-core'; const tester="file/path"; <BackgroundImage src={tester} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<BackgroundImage filter src={{a: 1}} />`,
    },
    {
      // No @patternfly/react-core import
      code: `const tester={a: 1}; <BackgroundImage filter src={tester} />`,
    },
  ],
  invalid: [
    {
      code: `import { BackgroundImage } from '@patternfly/react-core'; <BackgroundImage filter />`,
      output: `import { BackgroundImage } from '@patternfly/react-core'; <BackgroundImage  />`,
      errors: [
        {
          message: `filter prop for BackgroundImage has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { BackgroundImage } from '@patternfly/react-core'; <BackgroundImage src={{a: 1}} />`,
      output: `import { BackgroundImage } from '@patternfly/react-core'; <BackgroundImage src={{a: 1}} />`,
      errors: [
        {
          message: `The "src" prop for BackgroundImage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { BackgroundImage } from '@patternfly/react-core'; const tester={a: 1}; <BackgroundImage src={tester} />`,
      output: `import { BackgroundImage } from '@patternfly/react-core'; const tester={a: 1}; <BackgroundImage src={tester} />`,
      errors: [
        {
          message: `The "src" prop for BackgroundImage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { BackgroundImage } from '@patternfly/react-core'; <BackgroundImage filter src={{a: 1}} />`,
      output: `import { BackgroundImage } from '@patternfly/react-core'; <BackgroundImage  src={{a: 1}} />`,
      errors: [
        {
          message: `filter prop for BackgroundImage has been removed`,
          type: "JSXOpeningElement",
        },
        {
          message: `The "src" prop for BackgroundImage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
