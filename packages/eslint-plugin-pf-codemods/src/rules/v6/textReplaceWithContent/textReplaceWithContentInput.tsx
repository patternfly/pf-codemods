import {
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextProps,
  TextVariants,
} from "@patternfly/react-core";

export const TextReplaceWithContentInput = () => {
  interface Foo extends TextProps {}

  return (
    <>
      <Text component="h3">Abc</Text>
      <Text>Abc</Text>
      <TextContent>Abc</TextContent>
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
