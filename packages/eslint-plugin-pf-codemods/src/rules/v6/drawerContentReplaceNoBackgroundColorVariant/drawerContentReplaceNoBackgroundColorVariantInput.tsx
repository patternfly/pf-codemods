import { DrawerContent, DrawerColorVariant } from "@patternfly/react-core";

export const DrawerContentReplaceNoBackgroundColorVariantInput = () => {
  const stringColor = "no-background";
  const enumColor = DrawerColorVariant.default;

  return (
    <>
      <DrawerContent colorVariant='no-background' />
      <DrawerContent colorVariant={DrawerColorVariant.default} />
      <DrawerContent colorVariant={stringColor} />
      <DrawerContent colorVariant={enumColor} />
    </>
  );
};
