import { Card, CardHeader } from "@patternfly/react-core";

export const CardUpdatedClickableMarkupInput = () => {
  const selectableActionsObj = {};
  const selectableActionsObjMany = {to: "#", selectableActionProps: {}};

  return (
    <>
      <Card isClickable>
        <CardHeader
          selectableActions={{to: "#"}}
        />
      </Card>
      <Card isClickable>
        <CardHeader selectableActions={selectableActionsObj} />
      </Card>
      <Card isClickable>
        <CardHeader selectableActions={selectableActionsObjMany} />
      </Card>
    </>
  );
};
