const ruleTester = require("../../ruletester");
import * as rule from "./user-feedback-warn-changes";

ruleTester.run("user-feedback-warn-changes", rule, {
  valid: [
    {
      code: `<FeedbackModal />`,
    },
    {
      code: `import { FeedbackModal } from '@patternfly/some-other-package';`,
    }
  ],
  invalid: [
    {
      code: `import { FeedbackModal } from '@patternfly/react-user-feedback';`,
      output: `import { FeedbackModal } from '@patternfly/react-user-feedback';`,
      errors: [
        {
          message: `FeedbackModal no longer internally references a scss stylesheet. You may have to import "Feedback.css" located in the dist "@patternfly/react-user-feedback/dist/esm/Feedback/Feedback.css" to maintain styling on FeedbackModal.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { FeedbackModal as MyModal } from '@patternfly/react-user-feedback';`,
      output: `import { FeedbackModal as MyModal } from '@patternfly/react-user-feedback';`,
      errors: [
        {
          message: `FeedbackModal no longer internally references a scss stylesheet. You may have to import "Feedback.css" located in the dist "@patternfly/react-user-feedback/dist/esm/Feedback/Feedback.css" to maintain styling on FeedbackModal.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import myDefaultModal from '@patternfly/react-user-feedback/dist/esm/Feedback/FeedbackModal';`,
      output: `import myDefaultModal from '@patternfly/react-user-feedback/dist/esm/Feedback/FeedbackModal';`,
      errors: [
        {
          message: `FeedbackModal no longer internally references a scss stylesheet. You may have to import "Feedback.css" located in the dist "@patternfly/react-user-feedback/dist/esm/Feedback/Feedback.css" to maintain styling on FeedbackModal.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
