import { Rule } from "eslint";
import {
  ImportSpecifier,
  ExportSpecifier,
  ExportDefaultDeclaration,
} from "estree-jsx";
import { getFromPackage } from "../../helpers";

const appLauncherSpecifiers = [
  "ApplicationLauncher",
  "ApplicationLauncherContext",
  "ApplicationLauncherItem",
  "ApplicationLauncherItemContext",
  "ApplicationLauncherContent",
  "ApplicationLauncherIcon",
  "ApplicationLauncherText",
  "ApplicationLauncherGroup",
  "ApplicationLauncherSeparator",
];

const contextSelectorSpecifiers = [
  "ContextSelector",
  "ContextSelectorItem",
  "ContextSelectorFooter",
];

const dropdownSpecifiers = [
  "Dropdown",
  "DropdownMenu",
  "DropdownWithContext",
  "dropdownConstants",
  "DropdownGroup",
  "DropdownItem",
  "DropdownSeparator",
  "BadgeToggle",
  "KebabToggle",
  "DropdownToggle",
  "DropdownToggleCheckbox",
  "DropdownToggleAction",
];

const optionsMenuSpecifiers = [
  "OptionsMenu",
  "OptionsMenuToggle",
  "OptionsMenuItemGroup",
  "OptionsMenuItem",
  "OptionsMenuSeparator",
  "OptionsMenuToggleWithText",
];

const pageHeaderSpecifiers = [
  "PageHeader",
  "PageHeaderTools",
  "PageHeaderToolsGroup",
  "PageHeaderToolsItem",
];

const selectSpecifiers = [
  "Select",
  "SelectGroup",
  "SelectOption",
  "selectConstants",
];

const allSpecifiers = [
  ...appLauncherSpecifiers,
  ...contextSelectorSpecifiers,
  ...dropdownSpecifiers,
  ...optionsMenuSpecifiers,
  ...pageHeaderSpecifiers,
  ...selectSpecifiers,
];

const componentErrorMessages = {
  appLauncher:
    "We recommmend using our custom menu application launcher example: https://staging-v6.patternfly.org/components/menus/custom-menus#application-launcher-menu",
  contextSelector:
    "We recommmend using our [custom menu context selector example: https://staging-v6.patternfly.org/components/menus/custom-menus#context-selector-menu",
  dropdown:
    "We recommend using either our current composable Dropdown or our Dropdown template implementation",
  optionsMenu:
    "We recommend using either our current composable Select or our Select template implementation",
  pageHeader:
    "We recommend using our Masthead and Toolbar components to build a page header",
  select:
    "We recommend using either our current composable Select or our Select template implementation",
};

function getComponentErrorMessage(importName: string) {
  const {
    appLauncher,
    contextSelector,
    dropdown,
    optionsMenu,
    pageHeader,
    select,
  } = componentErrorMessages;
  if (appLauncherSpecifiers.includes(importName)) {
    return appLauncher;
  }
  if (contextSelectorSpecifiers.includes(importName)) {
    return contextSelector;
  }
  if (dropdownSpecifiers.includes(importName)) {
    return dropdown;
  }
  if (optionsMenuSpecifiers.includes(importName)) {
    return optionsMenu;
  }
  if (pageHeaderSpecifiers.includes(importName)) {
    return pageHeader;
  }
  if (selectSpecifiers.includes(importName)) {
    return select;
  }
}

// https://github.com/patternfly/patternfly-react/pull/10345
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core/deprecated"
    );

    const componentImports = imports.filter((specifier) =>
      allSpecifiers.includes(specifier.imported.name)
    );
    const componentExports = exports.filter((specifier) =>
      allSpecifiers.includes(specifier.local.name)
    );

    return !componentImports.length && !componentExports.length
      ? {}
      : {
          ImportSpecifier(node: ImportSpecifier) {
            if (
              componentImports
                .map((imp) => imp.imported.name)
                .includes(node.imported.name)
            ) {
              const { name } = node.imported;
              const componentErrorMessage = getComponentErrorMessage(name);
              context.report({
                node,
                message: `${name} is no longer exported by PatternFly. ${componentErrorMessage}. This rule will not fix any code.`,
              });
            }
          },
          ExportSpecifier(node: ExportSpecifier) {
            if (
              componentExports
                .map((exp) => exp.local.name)
                .includes(node.local.name)
            ) {
              const { name } = node.local;
              const componentErrorMessage = getComponentErrorMessage(name);
              context.report({
                node,
                message: `${name} is no longer exported by PatternFly. ${componentErrorMessage}. This rule will not fix any code.`,
              });
            }
          },
          ExportDefaultDeclaration(node: ExportDefaultDeclaration) {
            const importedSpecifier = componentImports.find(
              (specifier) =>
                node.declaration.type === "Identifier" &&
                specifier.local.name === node.declaration.name
            );
            if (importedSpecifier) {
              const { name } = importedSpecifier.imported;
              const componentErrorMessage = getComponentErrorMessage(name);
              context.report({
                node,
                message: `${name} is no longer exported by PatternFly. ${componentErrorMessage}. This rule will not fix any code.`,
              });
            }
          },
        };
  },
};
