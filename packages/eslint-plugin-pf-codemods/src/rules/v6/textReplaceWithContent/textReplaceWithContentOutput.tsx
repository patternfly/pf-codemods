import {
  Content,
  Content as PFContent,
  Content as PFContent,
  Content as PFContent,
} from '@patternfly/react-core';

export const TextReplaceWithContentInput = () => (
  <>
    <Content component="h3">Abc</Content>
    <Content component="p">Abc</Content>
    <Content>Abc</Content>
    <Content isVisitedLink>Abc</Content>
    <Content component="ul">Abc</Content>
    <Content component="ul" isPlainList>Abc</Content>
    <Content component="ol">Abc</Content>
    <Content component="li">Abc</Content>
    <Content component="dt">Abc</Content>
  </>
);
