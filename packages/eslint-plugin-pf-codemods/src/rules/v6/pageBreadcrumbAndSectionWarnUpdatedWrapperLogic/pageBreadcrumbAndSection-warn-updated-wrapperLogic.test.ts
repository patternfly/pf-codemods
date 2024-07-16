const ruleTester = require("../../ruletester");
import * as rule from "./pageBreadcrumbAndSection-warn-updated-wrapperLogic";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";

const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
const applicableComponents = ["PageBreadcrumb", "PageSection"];
for (const component of applicableComponents) {
  validTests.push(createValidTest(`<${component} isWidthLimited />`));

  const message = `The isWidthLimited prop on ${component} will no longer determine whether the children are wrapped in a PageBody. Instead the new hasBodyWrapper prop must be used. By default this new prop is set to true. Running the fix for this rule will apply hasBodyWrapper with the same value as the isWidthLimited prop or false if isWidthLimited is not passed.`;
  const errorObject = {
    message,
    type: "JSXOpeningElement",
  };
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} isWidthLimited />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} hasBodyWrapper isWidthLimited />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} hasBodyWrapper={false} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} isWidthLimited={someVar} />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} hasBodyWrapper={someVar} isWidthLimited={someVar} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} isWidthLimited={() => someCallback()} />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} hasBodyWrapper={() => someCallback()} isWidthLimited={() => someCallback()} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing isWidthLimited />`,
      `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing hasBodyWrapper isWidthLimited />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <${component} isWidthLimited />`,
      `import { ${component} } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <${component} hasBodyWrapper isWidthLimited />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/js/components/Page/index.js'; <${component} isWidthLimited />`,
      `import { ${component} } from '@patternfly/react-core/dist/js/components/Page/index.js'; <${component} hasBodyWrapper isWidthLimited />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <${component} isWidthLimited />`,
      `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <${component} hasBodyWrapper isWidthLimited />`,
      [errorObject]
    )
  );
}

ruleTester.run("pageBreadcrumbAndSection-warn-updated-wrapperLogic", rule, {
  valid: validTests,
  invalid: invalidTests,
});
