import {
  Masthead,
  MastheadBrand,
  MastheadMain,
  MastheadToggle,
  MastheadLogo
} from "@patternfly/react-core";

export const MastheadStructureChangesInputPreNameChange = () => (
  <Masthead>
    <MastheadToggle>Foo</MastheadToggle>
    <MastheadMain>
      <MastheadBrand>Bar</MastheadBrand>
    </MastheadMain>
  </Masthead>
);

export const MastheadStructureChangesInputPostNameChange = () => (
  <Masthead>
    <MastheadToggle>Foo</MastheadToggle>
    <MastheadMain>
      <MastheadLogo>Bar</MastheadLogo>
    </MastheadMain>
  </Masthead>
);
