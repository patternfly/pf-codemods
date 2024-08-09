import { Button } from "@patternfly/react-core";
import { SomeIcon } from "@patternfly/react-icons";

export const ButtonMoveIconsIconPropInput = () => (
  <>
    <Button icon={<span>Icon</span>} variant="plain"></Button>
    <Button icon={<Icon>
        <SomeIcon />
      </Icon>}></Button>
    <Button icon={<SomeIcon />}></Button>
  </>
);
