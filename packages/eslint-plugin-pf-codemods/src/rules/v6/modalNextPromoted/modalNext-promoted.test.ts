const ruleTester = require("../../ruletester");
import * as rule from "./modalNext-promoted";
import { RuleTester } from "eslint";

const specifiersToMove = ["Modal", "ModalBody", "ModalHeader", "ModalFooter"];
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
    createValidTest(`import { ${specifier} } from '@patternfly/react-core';`)
  );
  validTests.push(
    createValidTest(
      `export { ${specifier} /* data-codemods */ } from '@patternfly/react-core';`
    )
  );
  validTests.push(
    createValidTest(`export { ${specifier} } from '@patternfly/react-core';`)
  );

  const errorMessage = `${specifier} has been promoted. This rule will update import paths.`;
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/next';`,
      `import {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} as CustomSpecifier } from '@patternfly/react-core/next';`,
      `import {\n\t${specifier} as CustomSpecifier /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/esm/next/components/Modal/index.js';`,
      `import {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core/dist/esm/components/Modal/index.js';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/js/next/components/Modal/index.js';`,
      `import {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/dist/dynamic/next/components/Modal/index.js';`,
      `import {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/next';`,
      `export {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/esm/next/components/Modal/index.js';`,
      `export {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core/dist/esm/components/Modal/index.js';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/js/next/components/Modal/index.js';`,
      `export {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${specifier} } from '@patternfly/react-core/dist/dynamic/next/components/Modal/index.js';`,
      `export {\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ExportNamedDeclaration"
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-core/next';\nimport { Button } from '@patternfly/react-core';`,
      `\nimport {\n\tButton,\n\t${specifier} /* data-codemods */\n} from '@patternfly/react-core';`,
      errorMessage,
      "ImportDeclaration"
    )
  );
});

ruleTester.run("modalNext-promoted", rule, {
  valid: validTests,
  invalid: invalidTests,
});
