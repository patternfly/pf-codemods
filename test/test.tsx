import { Title, Title as MyTitle } from '@patternfly/react-core';

export const Thing1 = () => <MyTitle size="md">Title</MyTitle>;
export const Thing2 = () => <Title size="md">Title</Title>;

import { List, ListVariant } from '@patternfly/react-core';

export const MyList = (
  <List variant={ListVariant.plain} />
)

import { Button, ButtonVariant as MyButtonVaraitn } from '@patternfly/react-core';

export const MyButton = (
  <Button variant={MyButtonVaraitn.plain} />
)

enum MyPfEnums {
  plain = 'plain',
  primary = 'primary'
}

export const MyButtonWithCustomEnum = (
  <Button variant={MyPfEnums.plain} />
)

