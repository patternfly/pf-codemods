import {
  Masthead,
  MastheadBrand,
  MastheadMain,
  MastheadToggle,
  MastheadLogo,
} from "@patternfly/react-core";

export const MastheadStructureChangesInputPreNameChange = () => (
  <Masthead>
    <MastheadMain>
      <MastheadToggle>Foo</MastheadToggle>
      <MastheadBrand data-codemods>
        <MastheadBrand>Bar</MastheadBrand>
      </MastheadBrand>
    </MastheadMain>
  </Masthead>
);

export const MastheadStructureChangesInputPostNameChange = () => (
  <Masthead>
    <MastheadMain>
      <MastheadToggle>Foo</MastheadToggle>
      <MastheadBrand data-codemods>
        <MastheadLogo>Bar</MastheadLogo>
      </MastheadBrand>
    </MastheadMain>
  </Masthead>
);
