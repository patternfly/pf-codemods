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

import { Tab } from '@patternfly/react-core';
const tabText = <TabTitleText>After</TabTitleText>;
const TabTextComp = () => <TabTitleText>After</TabTitleText>;
export const TestTab = <Tab title="hello">Content</Tab>;
export const TestTab2a = <Tab title={<TabTitleText>hello</TabTitleText>}>Content</Tab>;
export const TestTab2b = <Tab title={<TabTitleIcon><UsersIcon /></TabTitleIcon>}>Content</Tab>;
export const TestTab3 = <Tab title={'hello'}>Content</Tab>;
export const TestTab3a = <Tab title={5}>Content</Tab>;
export const TestTab4 = <Tab title={tabText}>Content</Tab>;
export const TestTab5 = <Tab title={<TabTextComp />}>Content</Tab>;
export const TestTab6 = <Tab title={<div>hello</div>}>Content</Tab>;

export const TestTab7 = <Tab title={<UsersIcon />}>Content</Tab>;
export const TestTab8 = <Tab title={<><UsersIcon /> Text</>}>Content</Tab>;
// <Tab title={<><TabTitleIcon><UsersIcon /></TabTitleIcon> <TabTitleText>Users</TabTitleText>  </>}>


import { Table, cellWidth } from "@patternfly/react-table";
export const TableA = <Table cells={[{ transforms: [cellWidth('max')] }]}></Table>;

import { Table, cellWidth, cellHeightAuto } from '@patternfly/react-table';
export const TableB = <Table cells={[{ transforms: [ cellWidth('max'), cellHeightAuto() ] }]}></Table>
export const TableC = <Table cells={[{ transforms: [ cellHeightAuto() ] }]}></Table>
