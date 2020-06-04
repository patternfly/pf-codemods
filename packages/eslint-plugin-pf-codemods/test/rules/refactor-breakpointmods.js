const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/refactor-breakpointmods');

ruleTester.run("refactor-breakpointmods", rule, {
  valid: [
    {
      code: `import { Flex, FlexItem } from '@patternfly/react-core';
      <Flex alignSelf={{default: "alignSelfStretch"}}>
        <FlexItem alignSelf={{default: "alignSelfStretch"}}></FlexItem>
      </Flex>`
    },
    {
      code: `import { PageSection } from '@patternfly/react-core';
      <PageSection padding={{ default: 'noPadding' }}></PageSection>`
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core';
      <ToolbarItem visibility={{
        default: 'visible',
        lg: 'hidden'
      }}></ToolbarItem>`
    },
    {
      code: `import { ToolbarToggleGroup } from '@patternfly/react-core';
      <ToolbarToggleGroup spacer={{default: "spacerNone"}} show={{xl: 'show'}}></ToolbarToggleGroup>`
    }
  ],
  invalid: [
    {
      code: `import { Flex, FlexItem, FlexModifiers } from '@patternfly/react-core';
        <Flex breakpointMods={[
          {modifier: FlexModifiers.column},
          {modifier: FlexModifiers["align-self-stretch"]},
          {modifier: 'spacer-none'},
          {modifier: 'row', breakpoint: 'sm'}
        ]}>
          <FlexItem breakpointMods={[
            {breakpoint: 'xl', modifier: FlexModifiers.column},
            {modifier: FlexModifiers["align-self-stretch"], breakpoint: 'md'},
            {modifier: FlexModifiers.row}
          ]}></FlexItem>
        </Flex>`,
      output: `import { Flex, FlexItem, FlexModifiers } from '@patternfly/react-core';
        <Flex direction={{"default":"column","sm":"row"}} alignSelf={{"default":"alignSelfStretch"}} spacer={{"default":"spacerNone"}} >
          <FlexItem direction={{"xl":"column","default":"row"}} alignSelf={{"md":"alignSelfStretch"}} ></FlexItem>
        </Flex>`,
      errors: [
        {
          message: `Removed breakpointMods prop from Flex in favor of spacer, spaceItems, grow, shrink, flex, direction, alignItems, alignContent, alignSelf, align, justifyContent, display, fullWidth and flexWrap`,
          type: "JSXOpeningElement",
        },
        {
          message: `Removed breakpointMods prop from FlexItem in favor of spacer, grow, shrink, flex, alignSelf, align, and fullWidth`,
          type: "JSXOpeningElement",
        },
      ]
    },
    {
      code: `import { PageSection as MyPageSection } from '@patternfly/react-core';
        <MyPageSection hasNoPadding></MyPageSection>`,
      output: `import { PageSection as MyPageSection } from '@patternfly/react-core';
        <MyPageSection padding={{ default: 'noPadding' }}></MyPageSection>`,
      errors: [{
        message: `hasNoPadding prop on PageSection component removed in favor of padding={{ default: 'noPadding' }}`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core';
        <ToolbarItem breakpointMods={[
          {modifier: 'spacer-none'},
          {breakpoint: 'lg', modifier: 'spacer-lg'},
          {modifier:"align-right", breakpoint: 'sm'}
        ]}></ToolbarItem>`,
      output: `import { ToolbarItem } from '@patternfly/react-core';
        <ToolbarItem spacer={{"default":"spacerNone","lg":"spacerLg"}} align={{"sm":"alignRight"}} ></ToolbarItem>`,
      errors: [{
        message: `Removed breakpointMods prop from ToolbarItem in favor of visiblity, alignment, and spacer`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code: `import { ToolbarToggleGroup } from '@patternfly/react-core';
        <ToolbarToggleGroup breakpoint="xl" breakpointMods={[
          { modifier: 'visible' },
          { modifier: 'hidden', breakpoint: 'lg' }
        ]}></ToolbarToggleGroup>`,
      output: `import { ToolbarToggleGroup } from '@patternfly/react-core';
        <ToolbarToggleGroup show={{ xl: 'show' }} visibility={{"default":"visible","lg":"hidden"}} ></ToolbarToggleGroup>`,
      errors: [
        {
          message: `breakpoint prop on ToolbarToggleGroup removed in favor of show={{ xl: 'show' }}`,
          type: "JSXOpeningElement",
        },
        {
          message: `Removed breakpointMods prop from ToolbarToggleGroup in favor of visiblity, alignment, spacer, and spaceItems`,
          type: "JSXOpeningElement",
        }
      ]
    },
    {
      code: `import { Flex } from '@patternfly/react-core';
        <Flex breakpointMods={[{ modifier: 'justify-content-space-between' }] as any}></Flex>`,
      output: `import { Flex } from '@patternfly/react-core';
        <Flex justifyContent={{"default": "justifyContentSpaceBetween" }}></Flex>`,
      errors: [ {
        message: `Removed breakpointMods prop from Flex in favor of spacer, spaceItems, grow, shrink, flex, direction, alignItems, alignContent, alignSelf, align, justifyContent, display, fullWidth and flexWrap`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});

