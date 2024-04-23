import { DrawerContent, DrawerColorVariant } from "@patternfly/react-core";

export const DrawerContentReplaceNoBackgroundColorVariantInput = () => {
  const stringColor = "no-background";
  const enumColor = DrawerColorVariant.default;

  return (
    <>
      <DrawerContent  />
      <DrawerContent colorVariant="default" />
      <DrawerContent  />
      <DrawerContent colorVariant="default" />
    </>
  );
};
