const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/loginPage-update-props");

ruleTester.run("loginPage-update-props", rule, {
  valid: [
    {
      code: `import { LoginPage } from '@patternfly/react-core'; <LoginPage backgroundImgSrc="file/path" />`,
    },
    {
      code: `import { LoginPage } from '@patternfly/react-core'; const tester="file/path"; <LoginPage backgroundImgSrc={tester} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<LoginPage backgroundImgAlt backgroundImgSrc={{a: 1}} />`,
    },
    {
      // No @patternfly/react-core import
      code: `const tester={a: 1}; <LoginPage backgroundImgAlt="Alt text" backgroundImgSrc={tester} />`,
    },
  ],
  invalid: [
    {
      code: `import { LoginPage } from '@patternfly/react-core'; <LoginPage backgroundImgAlt="Alt text" />`,
      output: `import { LoginPage } from '@patternfly/react-core'; <LoginPage  />`,
      errors: [
        {
          message: `backgroundImgAlt prop for LoginPage has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { LoginPage } from '@patternfly/react-core'; <LoginPage backgroundImgSrc={{a: 1}} />`,
      output: `import { LoginPage } from '@patternfly/react-core'; <LoginPage backgroundImgSrc={{a: 1}} />`,
      errors: [
        {
          message: `The "backgroundImgSrc" prop for LoginPage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { LoginPage } from '@patternfly/react-core'; const tester={a: 1}; <LoginPage backgroundImgSrc={tester} />`,
      output: `import { LoginPage } from '@patternfly/react-core'; const tester={a: 1}; <LoginPage backgroundImgSrc={tester} />`,
      errors: [
        {
          message: `The "backgroundImgSrc" prop for LoginPage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { LoginPage } from '@patternfly/react-core'; <LoginPage backgroundImgAlt="Alt text" backgroundImgSrc={{a: 1}} />`,
      output: `import { LoginPage } from '@patternfly/react-core'; <LoginPage  backgroundImgSrc={{a: 1}} />`,
      errors: [
        {
          message: `backgroundImgAlt prop for LoginPage has been removed`,
          type: "JSXOpeningElement",
        },
        {
          message: `The "backgroundImgSrc" prop for LoginPage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
