const ruleTester = require("../../ruletester");
import * as rule from "./text-replace-with-content";

const errorMessage = `We have replaced Text, TextContent, TextList and TextListItem with one Content component. Running this fix will change all of those components names to Content and add a \`component\` prop where necessary.`;
const importDeclarationError = {
  message: errorMessage,
  type: "ImportDeclaration",
};
const jsxOpeningElementError = {
  message: errorMessage,
  type: "JSXOpeningElement",
};
const jsxClosingElementError = {
  message: errorMessage,
  type: "JSXClosingElement",
};
const identifierError = {
  message: errorMessage,
  type: "Identifier",
};

ruleTester.run("text-replace-with-content", rule, {
  valid: [
    {
      code: `<Text />`,
    },
    {
      code: `import { Text } from 'somewhere'; <Text />`,
    },
  ],
  invalid: [
    {
      code: `import { Text } from '@patternfly/react-core'; <Text>Abc</Text>`,
      output: `import { Content } from '@patternfly/react-core'; <Content component="p">Abc</Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxClosingElementError,
      ],
    },
    {
      code: `import { Text } from '@patternfly/react-core'; <Text component="h3">Abc</Text>`,
      output: `import { Content } from '@patternfly/react-core'; <Content component="h3">Abc</Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxClosingElementError,
      ],
    },
    {
      code: `import { Text, TextContent } from '@patternfly/react-core';
      <TextContent>
        <Text component="h3">Abc</Text>
      </TextContent>`,
      output: `import { Content, TextContent } from '@patternfly/react-core';
      <Content>
        <Content component="h3">Abc</Content>
      </Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxClosingElementError,
      ],
    },
    {
      code: `import { TextContent } from '@patternfly/react-core'; <TextContent isVisited></TextContent>`,
      output: `import { Content } from '@patternfly/react-core'; <Content isVisitedLink></Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxClosingElementError,
      ],
    },
    {
      code: `import { TextList, TextListItem } from '@patternfly/react-core';
      <TextList>
        <TextListItem>A</TextListItem>
        <TextListItem>B</TextListItem>
        <TextListItem>C</TextListItem>
      </TextList>`,
      output: `import { Content, TextListItem } from '@patternfly/react-core';
      <Content component="ul">
        <Content component="li">A</Content>
        <Content component="li">B</Content>
        <Content component="li">C</Content>
      </Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxClosingElementError,
      ],
    },
    {
      code: `import { TextList, TextListItem } from '@patternfly/react-core';
      <TextList component="dl">
        <TextListItem component="dt">A</TextListItem>
        <TextListItem component="dd">letter A</TextListItem>
        <TextListItem component="dt">B</TextListItem>
        <TextListItem component="dd">letter B</TextListItem>
      </TextList>`,
      output: `import { Content, TextListItem } from '@patternfly/react-core';
      <Content component="dl">
        <Content component="dt">A</Content>
        <Content component="dd">letter A</Content>
        <Content component="dt">B</Content>
        <Content component="dd">letter B</Content>
      </Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxOpeningElementError,
        jsxClosingElementError,
        jsxClosingElementError,
      ],
    },
    {
      code: `import { TextList } from '@patternfly/react-core'; <TextList isPlain></TextList>`,
      output: `import { Content } from '@patternfly/react-core'; <Content component="ul" isPlainList></Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxClosingElementError,
      ],
    },
    {
      code: `import { TextVariants } from '@patternfly/react-core'; const foo = TextVariants.h1`,
      output: `import { ContentVariants } from '@patternfly/react-core'; const foo = ContentVariants.h1`,
      errors: [importDeclarationError, identifierError],
    },
    {
      code: `import { TextListVariants } from '@patternfly/react-core'; const foo = TextListVariants.ul`,
      output: `import { ContentVariants } from '@patternfly/react-core'; const foo = ContentVariants.ul`,
      errors: [importDeclarationError, identifierError],
    },
    {
      code: `import { TextListItemVariants } from '@patternfly/react-core'; const foo = TextListItemVariants.li`,
      output: `import { ContentVariants } from '@patternfly/react-core'; const foo = ContentVariants.li`,
      errors: [importDeclarationError, identifierError],
    },
    // phase one of passing an enum directly as a prop
    {
      code: `import { TextListItem, TextListItemVariants } from '@patternfly/react-core'; <TextListItem component={TextListItemVariants.li}>Abc</TextListItem>`,
      output: `import { Content, TextListItemVariants } from '@patternfly/react-core'; <Content component={ContentVariants.li}>Abc</Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        identifierError,
        jsxClosingElementError,
      ],
    },
    // phase two of passing an enum directly as a prop
    {
      code: `import { Content, TextListItemVariants } from '@patternfly/react-core'; <Content component={ContentVariants.li}>Abc</Content>`,
      output: `import { Content, ContentVariants } from '@patternfly/react-core'; <Content component={ContentVariants.li}>Abc</Content>`,
      errors: [importDeclarationError],
    },
    {
      code: `import { TextProps } from '@patternfly/react-core'; interface Foo extends TextProps {}`,
      output: `import { ContentProps } from '@patternfly/react-core'; interface Foo extends ContentProps {}`,
      errors: [importDeclarationError, identifierError],
    },
    // with alias
    {
      code: `import { Text as PFText } from '@patternfly/react-core'; <PFText>Abc</PFText>`,
      output: `import { Content } from '@patternfly/react-core'; <Content component="p">Abc</Content>`,
      errors: [
        importDeclarationError,
        jsxOpeningElementError,
        jsxClosingElementError,
      ],
    },
    // dist import path (Text, TextContent, TextList and TextListItem are all under "Text")
    {
      code: `import { Text } from '@patternfly/react-core/dist/dynamic/components/Text';`,
      output: `import { Content } from "@patternfly/react-core/dist/dynamic/components/Content";`,
      errors: [importDeclarationError],
    },
  ],
});

/*

<Text component="h3"> -> <Content component="h3">
<Text> -> <Content component="p">
<TextContent> -> <Content>
<TextContent isVisited> -> <Content isVisitedLink>
<TextList> -> <Content component="ul">
<TextList isPlain> -> <Content component="ul" isPlainList>
<TextList component="ol"> -> <Content component="ol">
<TextListItem> -> <Content component="li">
<TextListItem component="dt"> -> <Content component="dt">

*/
