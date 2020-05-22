const ruleTester = require("./ruletester");
const rule = require("../../lib/rules/use-page-header-tools");

ruleTester.run("card-rename-components", rule, {
  valid: [
    {
      code: `import { Page, PageHeader, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
      <Page>
        <PageHeader header-tools={
          <PageHeaderTools>
            <PageHeaderToolsGroup>
              <PageHeaderToolsItem />
            </PageHeaderToolsGroup>
          </PageHeaderTools>
        } 
        />
      </Page>`
    },
    {
      // no @patternfly import
      code: 
      `<Page>
        <PageHeader header-tools={
          <PageHeaderTools>
           <PageHeaderToolsGroup>
            <PageHeaderToolsItem />
          </PageHeaderToolsGroup>
        </PageHeaderTools>
      }
      />
      </Page>`
    }
  ],
  invalid: [
    {
      code: `import { Page, PageHeader, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
              <Page>
                <PageHeader toolbar={ 
                  <Toolbar>
                    <ToolbarGroup>
                      <ToolbarItem  />
                    </ToolbarGroup>
                  </Toolbar>
                  }
                />
              </Page>`,
      output: `import { Page, PageHeader, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
            <Page>
              <PageHeader header-tools={
                <PageHeaderTools>
                <PageHeaderToolsGroup>
                  <PageHeaderToolsItem />
                </PageHeaderToolsGroup>
              </PageHeaderTools>
            }
          />
          </Page>`,
      errors: [
        {
          message: "toolbar prop was removed. Use the headerTools prop instead.",
          type: "JSXOpeningElement"
        },
        {
          message: "Toolbar renamed to PageHeaderTools",
          type: "JSXIdentifier"
        },
        {
          message: "ToolbarGroup renamed to PageHeaderToolsGroup",
          type: "JSXIdentifier"
        },
        {
          message: "ToolbarItem renamed to PageHeaderToolsItem",
          type: "JSXIdentifier"
        },
        {
          message: "ToolbarGroup renamed to PageHeaderToolsGroup",
          type: "JSXIdentifier"
        },
        {
          message: "Toolbar renamed to PageHeaderTools",
          type: "JSXIdentifier"
        },

      ]
    },
    {
      code: `import { Avatar, PageHeader } from '@patternfly/react-core';
            <PageHeader avatar={<Avatar  />} />`,
      output: `import { Card, PageHeader, PageHeaderTools } from '@patternfly/react-core';
            <PageHeader headerTools={<PageHeaderTools> <Avatar  /> </PageHeaderTools>} />`,
      errors: [
        {
          message: "avatar prop was removed. Nest the Avatar component in the PageHeaderTools component instead, which is passed into PageHeader via the headerTools prop.",
          type: "JSXOpeningElement"
        },
      ]
    }
  ]
});
