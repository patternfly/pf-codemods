import {
  Content,
  Content,
  Content,
  Content,
  ContentProps,
  ContentVariants,
} from "@patternfly/react-core";

export const TextReplaceWithContentInput = () => {
  interface Foo extends ContentProps {}

  return (
    <>
      <Content component="h3">Abc</Content>
      <Content component="p">Abc</Content>
      <Content>Abc</Content>
      <Content>
        <Content component="p">Some text</Content>
      </Content>
      <Content isVisitedLink>Abc</Content>
      <Content component="ul">Abc</Content>
      <Content component="ul" isPlainList>Abc</Content>
      <Content component="ol">Abc</Content>
      <Content component="li">Abc</Content>
      <Content component="dt">Abc</Content>
      <Content component={ContentVariants.dt}>Abc</Content>
      <Content component="ul">
        <Content component="li">A</Content>
        <Content component="li">B</Content>
        <Content component="li">C</Content>
      </Content>
    </>
  );
};
