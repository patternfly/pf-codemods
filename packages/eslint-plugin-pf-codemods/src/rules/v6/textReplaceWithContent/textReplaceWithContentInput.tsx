import {
  Text,
  TextContent,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  TextProps,
  TextVariants,
} from "@patternfly/react-core";

export const TextReplaceWithContentInput = () => {
  interface Foo extends TextProps {}
  const foo = TextVariants.h1;
  const bar = TextListVariants.ul;
  const baz = TextListItemVariants.li;

  return (
    <>
      <Text component="h3">Abc</Text>
      <Text>Abc</Text>
      <TextContent>Abc</TextContent>
      <TextContent>
        <Text>Some text</Text>
      </TextContent>
      <TextContent isVisited>Abc</TextContent>
      <TextList>Abc</TextList>
      <TextList isPlain>Abc</TextList>
      <TextList component="ol">Abc</TextList>
      <TextListItem>Abc</TextListItem>
      <TextListItem component="dt">Abc</TextListItem>
      <TextListItem component={TextVariants.dt}>Abc</TextListItem>
      <TextList>
        <TextListItem>A</TextListItem>
        <TextListItem>B</TextListItem>
        <TextListItem>C</TextListItem>
      </TextList>
    </>
  );
};
