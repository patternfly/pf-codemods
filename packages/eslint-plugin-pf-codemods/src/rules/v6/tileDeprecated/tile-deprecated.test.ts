const ruleTester = require('../../ruletester');
import * as rule from './tile-deprecated';

ruleTester.run('tile-deprecated', rule, {
  valid: [
    {
      code: `import { Tile } from '@someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { Tile } from '@patternfly/react-core';`,
      output: `import {\n\tTile\n} from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `Tile has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Card instead.`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import { Tile as CustomTile } from '@patternfly/react-core';`,
      output: `import {\n\tTile as CustomTile\n} from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `Tile has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Card instead.`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import { Tile } from '@patternfly/react-core/dist/esm/components/Tile/index.js';`,
      output: `import {\n\tTile\n} from '@patternfly/react-core/dist/esm/deprecated/components/Tile/index.js';`,
      errors: [
        {
          message: `Tile has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Card instead.`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import { Tile } from '@patternfly/react-core/dist/js/components/Tile/index.js';`,
      output: `import {\n\tTile\n} from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `Tile has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Card instead.`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import { Tile } from '@patternfly/react-core/dist/dynamic/components/Tile/index.js';`,
      output: `import {\n\tTile\n} from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `Tile has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Card instead.`,
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});