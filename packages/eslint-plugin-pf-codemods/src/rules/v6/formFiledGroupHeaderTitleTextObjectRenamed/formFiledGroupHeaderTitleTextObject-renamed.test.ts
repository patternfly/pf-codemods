const ruleTester = require("../../ruletester");
import * as rule from "./formFiledGroupHeaderTitleTextObject-renamed";

const errorMessage =
  "There was a typo in FormFiledGroupHeaderTitleTextObject interface. It was renamed to the intended FormFieldGroupHeaderTitleTextObject.";

ruleTester.run("formFiledGroupHeaderTitleTextObject-renamed", rule, {
  valid: [
    {
      code: `const titleTextObject: FormFiledGroupHeaderTitleTextObject = {text: "Some title", id: "form-field-group-header-title-text"};`,
    },
  ],
  invalid: [
    {
      code: `import { FormFiledGroupHeaderTitleTextObject } from '@patternfly/react-core'; const titleTextObject: FormFiledGroupHeaderTitleTextObject = {text: "Some title", id: "form-field-group-header-title-text"};`,
      output: `import { FormFieldGroupHeaderTitleTextObject } from '@patternfly/react-core'; const titleTextObject: FormFieldGroupHeaderTitleTextObject = {text: "Some title", id: "form-field-group-header-title-text"};`,
      errors: [
        {
          message: errorMessage,
          type: "ImportSpecifier",
        },
        {
          message: errorMessage,
          type: "TSTypeReference",
        },
      ],
    },
    {
      code: `import { FormFiledGroupHeaderTitleTextObject } from '@patternfly/react-core'; interface MyExtension extends FormFiledGroupHeaderTitleTextObject {}`,
      output: `import { FormFieldGroupHeaderTitleTextObject } from '@patternfly/react-core'; interface MyExtension extends FormFieldGroupHeaderTitleTextObject {}`,
      errors: [
        {
          message: errorMessage,
          type: "ImportSpecifier",
        },
        {
          message: errorMessage,
          type: "TSInterfaceHeritage",
        },
      ],
    },
    {
      code: `import { FormFiledGroupHeaderTitleTextObject } from '@patternfly/react-core'; export { FormFiledGroupHeaderTitleTextObject as TitleTextObject }`,
      output: `import { FormFieldGroupHeaderTitleTextObject } from '@patternfly/react-core'; export { FormFieldGroupHeaderTitleTextObject as TitleTextObject }`,
      errors: [
        {
          message: errorMessage,
          type: "ImportSpecifier",
        },
        {
          message: errorMessage,
          type: "ExportSpecifier",
        },
      ],
    },
  ],
});
