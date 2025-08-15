const ruleTester = require("../../ruletester");
import * as rule from "./button-support-favorite-variant";

ruleTester.run("button-support-favorite-variant", rule, {
  valid: [
    {
      code: `<Button isFavorite={true} />`,
    },
    {
      code: `<Button isFavorited={true} />`,
    },
    {
      code: `<Button isFavorite={true} isFavorited={false} />`,
    },
    {
      code: `import { Button } from '@patternfly/react-core'; <Button>Some text</Button>`,
    },
    {
      code: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from '@patternfly/react-icons'; <Button><SomeIcon /></Button>`,
    },
    {
      code: `import { Button } from '@patternfly/react-core'; <Button icon={<SomeIcon />} />`,
    },
    // Button from PF, StarIcon not from PF - should not trigger
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon } from '@some-other-package'; <Button><StarIcon /></Button>`,
    },
    // Button not from PF, StarIcon from PF - should not trigger
    {
      code: `import { Button } from '@some-other-package'; import { StarIcon } from '@patternfly/react-icons'; <Button><StarIcon /></Button>`,
    },
    // Both Button and StarIcon not from PF - should not trigger
    {
      code: `import { Button } from '@some-other-package'; import { StarIcon } from '@another-package'; <Button><StarIcon /></Button>`,
    },
    // Button from PF, StarIcon not from PF (in icon prop) - should not trigger
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon } from '@some-other-package'; <Button icon={<StarIcon />} />`,
    },
    // Button not from PF, StarIcon from PF (in icon prop) - should not trigger
    {
      code: `import { Button } from '@some-other-package'; import { StarIcon } from '@patternfly/react-icons'; <Button icon={<StarIcon />} />`,
    },
  ],
  invalid: [
    // Simple case - StarIcon as child
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon } from '@patternfly/react-icons'; <Button><StarIcon /></Button>`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
    // StarIcon in icon prop
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon } from '@patternfly/react-icons'; <Button icon={<StarIcon />} />`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
    // StarIcon with aliased import
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon as Star } from '@patternfly/react-icons'; <Button><Star /></Button>`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
    // Button with aliased import
    {
      code: `import { Button as PFButton } from '@patternfly/react-core'; import { StarIcon } from '@patternfly/react-icons'; <PFButton><StarIcon /></PFButton>`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
    // StarIcon with text
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon } from '@patternfly/react-icons'; <Button>Favorite <StarIcon /></Button>`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
    // StarIcon with other icon
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon, SomeIcon } from '@patternfly/react-icons'; <Button><SomeIcon /><StarIcon /></Button>`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
    // StarIcon in fragment with text
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon } from '@patternfly/react-icons'; <Button><>Favorite <StarIcon /></></Button>`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
    // StarIcon with existing props
    {
      code: `import { Button } from '@patternfly/react-core'; import { StarIcon } from '@patternfly/react-icons'; <Button variant="primary"><StarIcon /></Button>`,
      errors: [
        {
          message: "It looks like you are trying to create a custom favorites button. Use `isFavorite` and `isFavorited` button properties instead to apply the correct styling.",
          type: "JSXElement",
        },
      ],
    },
  ],
});
