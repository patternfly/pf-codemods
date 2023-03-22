const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/optionsMenu-deprecated');

ruleTester.run("optionsMenu-deprecated", rule, {
  valid: [
    {
      code: `import {OptionsMenu} from '@patternfly/react-core/deprecated';`
    }
],
  invalid: [
    {
      code: `import { OptionsMenu, Foo, OptionsMenuGroup as OMG, Bar, OptionsMenuToggle } from '@patternfly/react-core';`,
      output: `import { Foo, Bar } from '@patternfly/react-core';
import { OptionsMenu, OptionsMenuGroup as OMG, OptionsMenuToggle } from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `OptionsMenu has been deprecated. Your import has been updated, but we suggest replacing it with the Select component.`,
          type: "ImportDeclaration",
        }]
    },
    {
        code: `import { Foo, OptionsMenu, OptionsMenuGroup } from '@patternfly/react-core';`,
        output: `import { Foo } from '@patternfly/react-core';
import { OptionsMenu, OptionsMenuGroup } from '@patternfly/react-core/deprecated';`,
        errors: [
        {
            message: `OptionsMenu has been deprecated. Your import has been updated, but we suggest replacing it with the Select component.`,
            type: "ImportDeclaration",
        }]
    },
//     {
//         code: `import { Foo, OptionsMenu, OptionsMenuGroup } from '@patternfly/react-core';
// import { FooDeprecated } from '@patternfly/react-core/deprecated';`,
//         output: `import { Foo } from '@patternfly/react-core';
// import { FooDeprecated, OptionsMenu, OptionsMenuGroup } from '@patternfly/react-core/deprecated';`,
//         errors: [
//         {
//             message: `OptionsMenu has been deprecated. Your import has been updated, but we suggest replacing it with the Select component.`,
//             type: "ImportDeclaration",
//         }]
//     },
  ]
});
