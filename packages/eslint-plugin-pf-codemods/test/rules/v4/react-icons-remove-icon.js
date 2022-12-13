const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/react-icons-remove-icon');

ruleTester.run("react-icons-remove-icon", rule, {
  valid: [
    {
      code: `import { fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`,
    }
  ],
  invalid: [
    {
      code:   `import { OutlinedFontAwesomeLogoFullIcon } from '@patternfly/react-icons';`,
      output: `import {  } from '@patternfly/react-icons';
import { fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`,
      errors: [
        {
          message: `add missing import { fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`,
          type: "ImportDeclaration",
        },
        {
          message: `Removed OutlinedFontAwesomeLogoFullIcon. Import it from @FortAwesome instead.`,
          type: "ImportSpecifier",
        }
      ]
    },
    {
      code:   `import { OutlinedFontAwesomeLogoFullIcon } from '@patternfly/react-icons';
import { fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`,
      output: `import {  } from '@patternfly/react-icons';
import { fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`,
      errors: [{
        message: `Removed OutlinedFontAwesomeLogoFullIcon. Import it from @FortAwesome instead.`,
        type: "ImportSpecifier",
      }]
    },
    {
      code:   `import { OutlinedFontAwesomeLogoFullIcon } from '@patternfly/react-icons';
import { anotherIcon } from '@fortawesome/free-regular-svg-icons';`,
      output: `import {  } from '@patternfly/react-icons';
import { anotherIcon, fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`,
      errors: [
        {
          message: `Removed OutlinedFontAwesomeLogoFullIcon. Import it from @FortAwesome instead.`,
          type: "ImportSpecifier",
        },
        {
          message: `add missing import { fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`,
          type: "ImportDeclaration",
        }
      ]
    },
  ]
});
