import { Button, Icon } from "@patternfly/react-core";
import { SomeIcon } from "@patternfly/react-icons";

export const ButtonMoveIconsIconPropInput = () => (
  <>
    <Button variant="plain">
      <span>Icon</span>
    </Button>
    <Button>
      <Icon>
        <SomeIcon />
      </Icon>
    </Button>
    <Button>
      <SomeIcon />
    </Button>
  </>
);
