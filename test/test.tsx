import { Title, Title as MyTitle, TabTitleText, TabTitleIcon } from '@patternfly/react-core';

export const Thing1 = () => <MyTitle headingLevel="h2" size="md">Title</MyTitle>;
export const Thing2 = () => <Title headingLevel="h2" size="md">Title</Title>;

import { List, ListVariant, TabTitleText, TabTitleIcon } from '@patternfly/react-core';

export const MyList = (
  <List variant={ListVariant.plain} />
)

import { Button, ButtonVariant as MyButtonVaraitn, TabTitleText, TabTitleIcon } from '@patternfly/react-core';

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

import { Tab  } from '@patternfly/react-core';
const tabText = <TabTitleText>After</TabTitleText>;
const TabTextComp = () => <TabTitleText>After</TabTitleText>;
export const TestTab = <Tab title={<TabTitleText>hello</TabTitleText>}>Content</Tab>;
export const TestTab2a = <Tab title={<TabTitleText>hello</TabTitleText>}>Content</Tab>;
export const TestTab2b = <Tab title={<TabTitleIcon><UsersIcon /></TabTitleIcon>}>Content</Tab>;
export const TestTab3 = <Tab title={<TabTitleText>hello</TabTitleText>}>Content</Tab>;
export const TestTab3a = <Tab title={<TabTitleText>5</TabTitleText>}>Content</Tab>;
export const TestTab4 = <Tab title={<TabTitleText>{tabText}</TabTitleText>}>Content</Tab>;
export const TestTab5 = <Tab title={<TabTitleText><TabTextComp /></TabTitleText>}>Content</Tab>;
export const TestTab6 = <Tab title={<div><TabTitleText>hello</TabTitleText></div>}>Content</Tab>;

export const TestTab7 = <Tab title={<TabTitleIcon><UsersIcon /></TabTitleIcon>}>Content</Tab>;
export const TestTab8 = <Tab title={<><TabTitleIcon><UsersIcon /></TabTitleIcon><TabTitleText> Text</TabTitleText></>}>Content</Tab>;

import { Table, cellWidth } from "@patternfly/react-table";
export const TableA = <Table cells={[{ transforms: [cellWidth(100)] }]}></Table>;

import { Table, cellWidth  } from '@patternfly/react-table';
export const TableB = <Table cells={[{ transforms: [ cellWidth(100)  ] }]}></Table>
export const TableC = <Table cells={[{ transforms: [  ] }]}></Table>

import { Wizard, TabTitleText, TabTitleIcon } from '@patternfly/react-core'; 
// should change to hasNoBodyPadding
export const WizA = <Wizard hasNoBodyPadding />
// should remove the prop since hasNoBodyPadding defaults to false
export const WizB = <Wizard  />
export const WizC = <Wizard  />

import { ExpandableSection } from '@patternfly/react-core';
export const TestExpandable = <ExpandableSection toggleText="Show More" ></ExpandableSection>;

import {  } from '@patternfly/react-core';
export const TestChipButton = <Button></Button>;

import { Avatar, Page, PageHeader, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
<Page>
  <PageHeader  headerTools={
    <PageHeaderTools>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem></PageHeaderToolsItem>
      </PageHeaderToolsGroup>
    <Avatar /></PageHeaderTools>
  }
  />
</Page>

import { Flex, TabTitleText, TabTitleIcon } from '@patternfly/react-core';
<Flex justifyContent={{"default":"justifyContentSpaceBetween"}} ></Flex>;
