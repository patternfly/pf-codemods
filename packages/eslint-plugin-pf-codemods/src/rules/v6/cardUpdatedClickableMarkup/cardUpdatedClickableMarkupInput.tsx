import { Card, CardHeader } from "@patternfly/react-core";

export const CardUpdatedClickableMarkupInput = () => {
  const selectableActionsObj = { name: "Test2", selectableActionId: "Id2" };
  const selectableActionsObjMany = {
    to: "#",
    name: "Test2",
    selectableActionProps: {},
    selectableActionId: "Id2",
  };

  return (
    <>
      <Card isClickable>
        <CardHeader
          selectableActions={{
            to: "#",
            name: "Test",
            selectableActionId: () => {},
          }}
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
