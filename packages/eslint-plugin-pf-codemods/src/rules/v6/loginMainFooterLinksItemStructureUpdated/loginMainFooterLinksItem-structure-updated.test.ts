const ruleTester = require("../../ruletester");
import * as rule from "./loginMainFooterLinksItem-structure-updated";

const loginMainFooterLinksItemError = {
  message: `LoginMainFooterLinksItem structure has changed. Instead of passing it many properties, everything is now passed directly in a children component.`,
  type: "JSXElement",
};

ruleTester.run("loginMainFooterLinksItem-structure-updated", rule, {
  valid: [
    {
      code: `<LoginMainFooterLinksItem />`,
    },
  ],
  invalid: [
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core';
      <LoginMainFooterLinksItem
        href="https://github.com/login"
        linkComponentProps={{ "aria-label": "Login with Github" }}
      >
        <i>GitHub icon</i>
      </LoginMainFooterLinksItem>`,
      output: `import { LoginMainFooterLinksItem, Button } from '@patternfly/react-core';
      <LoginMainFooterLinksItem data-codemods="true" 
        
        
      ><Button variant="link" component="a" href="https://github.com/login" {...{ "aria-label": "Login with Github" }}>
        <i>GitHub icon</i>
      </Button></LoginMainFooterLinksItem>`,
      errors: [loginMainFooterLinksItemError],
    },
    // with "button" as a linkComponent
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core';
      <LoginMainFooterLinksItem
        target="#"
        href="https://github.com/login"
        linkComponent="button"
        linkComponentProps={{ "aria-label": "Login with Github" }}
      >
        <i>GitHub icon</i>
      </LoginMainFooterLinksItem>`,
      output: `import { LoginMainFooterLinksItem, Button } from '@patternfly/react-core';
      <LoginMainFooterLinksItem data-codemods="true" 
        
        
        
        
      ><Button variant="plain" href="https://github.com/login" target="#" {...{ "aria-label": "Login with Github" }}>
        <i>GitHub icon</i>
      </Button></LoginMainFooterLinksItem>`,
      errors: [loginMainFooterLinksItemError],
    },
    // with "span" as a linkComponent
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core';
      <LoginMainFooterLinksItem
        target="#"
        href="https://github.com/login"
        linkComponent="span"
        linkComponentProps={{ "aria-label": "Login with Github" }}
      >
        <i>GitHub icon</i>
      </LoginMainFooterLinksItem>`,
      output: `import { LoginMainFooterLinksItem, Button } from '@patternfly/react-core';
      <LoginMainFooterLinksItem data-codemods="true" 
        
        
        
        
      ><Button variant="plain" component="span" href="https://github.com/login" target="#" {...{ "aria-label": "Login with Github" }}>
        <i>GitHub icon</i>
      </Button></LoginMainFooterLinksItem>`,
      errors: [loginMainFooterLinksItemError],
    },
    // with other attributes that should not be removed
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core';
      <LoginMainFooterLinksItem
        href="https://github.com/login"
        className="some-class"
      >
        <i>GitHub icon</i>
      </LoginMainFooterLinksItem>`,
      output: `import { LoginMainFooterLinksItem, Button } from '@patternfly/react-core';
      <LoginMainFooterLinksItem data-codemods="true" 
        
        className="some-class"
      ><Button variant="link" component="a" href="https://github.com/login">
        <i>GitHub icon</i>
      </Button></LoginMainFooterLinksItem>`,
      errors: [loginMainFooterLinksItemError],
    },
    // without attributes
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core';
      <LoginMainFooterLinksItem>
        <i>GitHub icon</i>
      </LoginMainFooterLinksItem>`,
      output: `import { LoginMainFooterLinksItem, Button } from '@patternfly/react-core';
      <LoginMainFooterLinksItem data-codemods="true" ><Button variant="link" component="a" href="">
        <i>GitHub icon</i>
      </Button></LoginMainFooterLinksItem>`,
      errors: [loginMainFooterLinksItemError],
    },
    // self-closing with children as attribute
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core';
      <LoginMainFooterLinksItem
        href="https://github.com/login"
        linkComponentProps={{ "aria-label": "Login with Github" }}
        children={<i>GitHub icon</i>}
      />`,
      output: `import { LoginMainFooterLinksItem, Button } from '@patternfly/react-core';
      <LoginMainFooterLinksItem data-codemods="true" 
        
        
        
      ><Button variant="link" component="a" href="https://github.com/login" {...{ "aria-label": "Login with Github" }}><i>GitHub icon</i></Button></LoginMainFooterLinksItem>`,
      errors: [loginMainFooterLinksItemError],
    },
    // with children as attribute
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core';
      <LoginMainFooterLinksItem
        href="https://github.com/login"
        linkComponentProps={{ "aria-label": "Login with Github" }}
        children={<i>GitHub icon</i>}
      ></LoginMainFooterLinksItem>`,
      output: `import { LoginMainFooterLinksItem, Button } from '@patternfly/react-core';
      <LoginMainFooterLinksItem data-codemods="true" 
        
        
        
      ><Button variant="link" component="a" href="https://github.com/login" {...{ "aria-label": "Login with Github" }}><i>GitHub icon</i></Button></LoginMainFooterLinksItem>`,
      errors: [loginMainFooterLinksItemError],
    },
    // with Button component already imported
    {
      code: `import { Button, LoginMainFooterLinksItem } from '@patternfly/react-core';
      <>
      <Button>Some button</Button>
      <LoginMainFooterLinksItem
        href="https://github.com/login"
        linkComponentProps={{ "aria-label": "Login with Github" }}
      >
        <i>GitHub icon</i>
      </LoginMainFooterLinksItem>
      </>`,
      output: `import { Button, LoginMainFooterLinksItem } from '@patternfly/react-core';
      <>
      <Button>Some button</Button>
      <LoginMainFooterLinksItem data-codemods="true" 
        
        
      ><Button variant="link" component="a" href="https://github.com/login" {...{ "aria-label": "Login with Github" }}>
        <i>GitHub icon</i>
      </Button></LoginMainFooterLinksItem>
      </>`,
      errors: [loginMainFooterLinksItemError],
    },
  ],
});
