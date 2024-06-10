const ruleTester = require("../../ruletester");
import * as rule from "./modal-deprecated";
import { RuleTester } from "eslint";

const specifiersToMove = [
  "Modal",
  "ModalVariant",
  "ModalBox",
  "ModalBoxBody",
  "ModalBoxCloseButton",
  "ModalBoxHeader",
  "ModalBoxFooter",
  "ModalContent",
];

const validTests: Array<string | RuleTester.ValidTestCase> = [];
const invalidTests: RuleTester.InvalidTestCase[] = [];
function createValidTest(code: string) {
  return {
    code,
  };
}
function createInvalidTest(
  code: string,
  output: string,
  message: string,
  type: string
) {
  return {
    code,
    output,
    errors: [
      {
        message,
        type,
      },
    ],
  };
}

specifiersToMove.forEach((specifier) => {
  if (!specifier.endsWith("Variant")) {
    validTests.push(createValidTest(`<${specifier} />`));
  }
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

  const errorMessage = `${specifier} has been deprecated. This rule will update import paths to our deprecated directory, but we recommend using our newly promoted Modal implementation.`;
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} as CustomSpecifier } from '@patternfly/react-core';`,
      `import {\n\t${specifier} as CustomSpecifier\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/esm/components/Modal/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/dist/esm/deprecated/components/Modal/index.js';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/js/components/Modal/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/dynamic/components/Modal/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/esm/components/Modal/index.js';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/dist/esm/deprecated/components/Modal/index.js';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/js/components/Modal/index.js';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/dynamic/components/Modal/index.js';`,
      `export {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier}, Button } from '@patternfly/react-core';`,
      `import {\n\tButton\n} from '@patternfly/react-core';
import {\n\t${specifier}\n} from '@patternfly/react-core/deprecated';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
});

ruleTester.run("modal-deprecated", rule, {
  valid: validTests,
  invalid: invalidTests,
});
