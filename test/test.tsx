import { Title, Title as MyTitle } from '@patternfly/react-core';

export const Thing1 = () => <MyTitle headingLevel="h2" size="md">Title</MyTitle>;
export const Thing2 = () => <Title headingLevel="h2" size="md">Title</Title>;

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

import { Tab } from '@patternfly/react-core';
const mycomp = <TabTitleText>After</TabTitleText>;
const Mycomp2 = () => <TabTitleText>After</TabTitleText>;

export const TestTab = <Tab title="Title">Content</Tab>;

export const TestTab2 = <Tab title={<TabTitleText>After</TabTitleText>}>Content</Tab>;

export const TestTab3 = <Tab title={'hello'}>Content</Tab>;

export const TestTab3a = <Tab title={5}>Content</Tab>;

export const TestTab4 = <Tab title={mycomp}>Content</Tab>;

export const TestTab5 = <Tab title={<Mycomp2 />}>Content</Tab>;

export const TestTab6 = <Tab title="Hallo">Content</Tab>;