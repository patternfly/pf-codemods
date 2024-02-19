import { DrawerContent, DrawerColorVariant } from "@patternfly/react-core";

export const DrawerReplaceColorVariantLight200Input = () => (
  <>
    <DrawerContent colorVariant="secondary" />
    <DrawerContent colorVariant={DrawerColorVariant.secondary} />
  </>
);
