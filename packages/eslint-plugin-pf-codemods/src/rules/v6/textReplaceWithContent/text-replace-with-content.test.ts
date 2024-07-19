const ruleTester = require("../../ruletester");
import * as rule from "./text-replace-with-content";

const errorMessage = `We have replaced Text, TextContent, TextList and TextListItem with one Content component. Running this fix will change all of those components names to Content and add a \`component\` prop where necessary.`;
const importDeclarationError = {
  message: errorMessage,
  type: "ImportDeclaration",
};
const jsxElementError = {
  message: errorMessage,
  type: "JSXElement",
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
      errors: [importDeclarationError, jsxElementError],
    },
    {
      code: `import { Text } from '@patternfly/react-core'; <Text component="h3">Abc</Text>`,
      output: `import { Content } from '@patternfly/react-core'; <Content component="h3">Abc</Content>`,
      errors: [importDeclarationError, jsxElementError],
    },
    // {
    //   code: `import { Text, TextContent } from '@patternfly/react-core';
    //   <TextContent>
    //     <Text component="h3">Abc</Text>
    //   </TextContent>`,
    //   output: `import { Content, TextContent } from '@patternfly/react-core';
    //   <Content>
    //     <Content component="h3">Abc</Content>
    //   </Content>`,
    //   errors: [importDeclarationError, jsxElementError, jsxElementError],
    // },
    {
      code: `import { TextContent } from '@patternfly/react-core'; <TextContent isVisited></TextContent>`,
      output: `import { Content } from '@patternfly/react-core'; <Content isVisitedLink></Content>`,
      errors: [importDeclarationError, jsxElementError],
    },
    // {
    //   code: `import { TextList, TextListItem } from '@patternfly/react-core';
    //   <TextList>
    //     <TextListItem>A</TextListItem>
    //     <TextListItem>B</TextListItem>
    //     <TextListItem>C</TextListItem>
    //   </TextList>`,
    //   output: `import { Content, TextListItem } from '@patternfly/react-core';
    //   <Content component="ul">
    //     <Content component="li">A</Content>
    //     <Content component="li">B</Content>
    //     <Content component="li">C</Content>
    //   </Content>`,
    //   errors: [
    //     importDeclarationError,
    //     jsxElementError,
    //     jsxElementError,
    //     jsxElementError,
    //     jsxElementError,
    //   ],
    // },
    // {
    //   code: `import { TextList, TextListItem } from '@patternfly/react-core';
    //   <TextList component="dl">
    //     <TextListItem component="dt">A</TextListItem>
    //     <TextListItem component="dd">letter A</TextListItem>
    //     <TextListItem component="dt">B</TextListItem>
    //     <TextListItem component="dd">letter B</TextListItem>
    //   </TextList>`,
    //   output: `import { Content, TextListItem } from '@patternfly/react-core';
    //   <Content component="dl">
    //     <Content component="dt">A</Content>
    //     <Content component="dd">letter A</Content>
    //     <Content component="dt">B</Content>
    //     <Content component="dd">letter B</Content>
    //   </Content>`,
    //   errors: [
    //     importDeclarationError,
    //     jsxElementError,
    //     jsxElementError,
    //     jsxElementError,
    //     jsxElementError,
    //     jsxElementError,
    //   ],
    // },
    {
      code: `import { TextList } from '@patternfly/react-core'; <TextList isPlain></TextList>`,
      output: `import { Content } from '@patternfly/react-core'; <Content component="ul" isPlainList></Content>`,
      errors: [importDeclarationError, jsxElementError],
    },
    {
      code: `import { TextVariants } from '@patternfly/react-core'; const foo = TextVariants.h1`,
      output: `import { ContentVariants } from '@patternfly/react-core'; const foo = ContentVariants.h1`,
      errors: [importDeclarationError, identifierError],
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
      errors: [importDeclarationError, jsxElementError],
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
