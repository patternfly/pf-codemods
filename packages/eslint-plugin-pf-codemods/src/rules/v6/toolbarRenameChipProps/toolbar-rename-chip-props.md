### toolbar-replace-chip-instances [(#10649)](https://github.com/patternfly/patternfly-react/pull/10649)

Several Chip-based props have been renamed on our Toolbar components:

| Component/Location of change | Description of update |
| -- | -- | -- |
| `<Toolbar>` | The `customChipGroupContent` prop has been renamed to `customLabelGroupContent` |
| `<ToolbarExpandableContent>` | The `chipContainerRef` prop has been renamed to `labelContainerRef` |
| `ToolbarChipGroup` | The interface has been renamed to `ToolbarLabelGroup` |
| `ToolbarChip` | The interface has been renamed to `ToolbarLabel` |
| `<ToolbarFilter>` | The `chips` prop has been renamed to `labels` |
| `<ToolbarFilter>` | The `deleteChipGroup` prop has been renamed to `deleteLabelGroup` |
| `<ToolbarFilter>` | The `deleteChip` prop has been renamed to `deleteLabel` |
| `<ToolbarFilter>` | The `chipGroupExpandedText` prop has been renamed to `labelGroupExpandedText` |
| `<ToolbarFilter>` | The `chipGroupCollapsedText` prop has been renamed to `labelGroupCollapsedText` |
| `<ToolbarFilter>` | The `expandableChipContainerRef` prop has been renamed to `expandableLabelContainerRef` |
| `<ToolbarItem>` | The `chip-group` variant has been renamed to `label-group` |
| `ToolbarChipGroupContentProps` | The interface has been renamed to `ToolbarLabelGroupContentProps` |
| `<ToolbarChipGroupContent>` | The component has been renamed to `ToolbarLabelGroupContent` |
| `<ToolbarChipGroupContent>` | The `chipGroupContentRef` prop has been renamed to `labelGroupContentRef` |
| `<ToolbarChipGroupContent>` | The `customChipGroupContent` prop has been renamed to `customLabelGroupContent` |
| `<ToolbarToggleGroup>` | The `chipContainerRef` prop has been renamed to `labelContainerRef` |


#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```

