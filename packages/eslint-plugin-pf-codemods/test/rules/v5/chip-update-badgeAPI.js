const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/chip-update-badgeAPI");

ruleTester.run("chip-update-badgeAPI", rule, {
  valid: [
    {
      code: `import { Chip, Badge } from '@patternfly/react-core'; <Chip badge={<Badge>5</Badge>}>Content</Chip>`,
    },
    {
      code: `import { Chip } from '@patternfly/react-core'; <Chip>Content</Chip>`,
    },
    {
      // No @patternfly/react-core import
      code: `<Chip>Content<Badge>5</Badge></Chip>`,
    },
    {
      // No @patternfly/react-core Badge import
      code: `import { Chip } from '@patternfly/react-core'; <Chip>Content<Badge>5</Badge></Chip>`,
    },
    {
      // No @patternfly/react-core Chip import
      code: `import { Badge } from '@patternfly/react-core'; <Chip>Content<Badge>5</Badge></Chip>`,
    },
  ],
  invalid: [
    {
      code: `import { Chip, Badge } from '@patternfly/react-core'; <Chip>Content<Badge>5</Badge></Chip>`,
      output: `import { Chip, Badge } from '@patternfly/react-core'; <Chip badge={<Badge>5</Badge>}>Content</Chip>`,
      errors: [
        {
          message: `Badge components should now be passed to the "badge" prop on Chip instead of passed as children.`,
          type: "JSXElement",
        },
      ],
    },
    // Badge rendered within another element
    {
      code: `import { Chip, Badge } from '@patternfly/react-core'; <Chip>Content<div>Other Content<Badge>5</Badge></div></Chip>`,
      output: `import { Chip, Badge } from '@patternfly/react-core'; <Chip badge={<Badge>5</Badge>}>Content<div>Other Content</div></Chip>`,
      errors: [
        {
          message: `Badge components should now be passed to the "badge" prop on Chip instead of passed as children.`,
          type: "JSXElement",
        },
      ],
    },
    // Import from dist
    {
      code: `import { Chip } from '@patternfly/react-core/dist/esm/components/Chip/index.js'; import { Badge } from '@patternfly/react-core/dist/esm/components/Badge/index.js'; <Chip>Content<Badge>5</Badge></Chip>`,
      output: `import { Chip } from '@patternfly/react-core/dist/esm/components/Chip/index.js'; import { Badge } from '@patternfly/react-core/dist/esm/components/Badge/index.js'; <Chip badge={<Badge>5</Badge>}>Content</Chip>`,
      errors: [
        {
          message: `Badge components should now be passed to the "badge" prop on Chip instead of passed as children.`,
          type: "JSXElement",
        },
      ],
    },
    // Aliased imports
    {
      code: `import { Chip as PFChip, Badge as PFBadge } from '@patternfly/react-core'; <PFChip>Content<PFBadge>5</PFBadge></PFChip>`,
      output: `import { Chip as PFChip, Badge as PFBadge } from '@patternfly/react-core'; <PFChip badge={<PFBadge>5</PFBadge>}>Content</PFChip>`,
      errors: [
        {
          message: `Badge components should now be passed to the "badge" prop on Chip instead of passed as children.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
