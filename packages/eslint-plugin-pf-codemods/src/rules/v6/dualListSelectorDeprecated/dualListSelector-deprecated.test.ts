const ruleTester = require("../../ruletester");
import * as rule from "./dualListSelector-deprecated";
import {
  ValidTests,
  InvalidTests,
  createValidTest,
  createInvalidTest,
} from "../../helpers/testHelpers";

const specifiersToMove = [
  "DualListSelector",
  "DualListSelectorContext",
  "DualListSelectorControl",
  "DualListSelectorControlsWrapper",
  "DualListSelectorPane",
  "DualListSelectorList",
  "DualListSelectorListItem",
  "DualListSelectorTree",
];

const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];

specifiersToMove.forEach((specifier) => {
  validTests.push(createValidTest(`<${specifier} />`));
  validTests.push(
    createValidTest(
      `import { ${specifier} /* data-codemods */ } from '@patternfly/react-core';`
    )
  );
  validTests.push(
    createValidTest(
      `import { ${specifier} } from '@patternfly/react-core/deprecated';`
    )
  );
  validTests.push(
    createValidTest(
      `export { ${specifier} /* data-codemods */ } from '@patternfly/react-core';`
    )
  );
  validTests.push(
    createValidTest(
      `export { ${specifier} } from '@patternfly/react-core/deprecated';`
    )
  );

  const errorMessage = `${specifier} has been deprecated. This rule will update import paths to our deprecated directory, but we recommend using our newly promoted DualListSelector implementation.`;
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} as CustomSpecifier } from '@patternfly/react-core';`,
      `import {\n\t${specifier} as CustomSpecifier\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/esm/components/Modal/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/dist/esm/deprecated/components/Modal/index.js';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/js/components/Modal/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/dynamic/components/Modal/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ExportNamedDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/esm/components/Modal/index.js';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/dist/esm/deprecated/components/Modal/index.js';`,
      [{ message: errorMessage, type: "ExportNamedDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/js/components/Modal/index.js';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ExportNamedDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/dynamic/components/Modal/index.js';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ExportNamedDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier}, Button } from '@patternfly/react-core';`,
      `import {\n\tButton\n} from '@patternfly/react-core';
import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
});

ruleTester.run("dualListSelector-deprecated", rule, {
  valid: validTests,
  invalid: invalidTests,
});
