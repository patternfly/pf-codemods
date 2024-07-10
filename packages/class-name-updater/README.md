# class-name-updater

This utility automatically identifies Patternfly class names that need to be updated after the introduction of versioned class names in Patternfly v5 or v6. Currently v5 is set at the default so if you are updating to v6, please use the `--v6` option.

## Usage

Requires Node.js >= 10.

```sh
npx @patternfly/class-name-updater ./path-to-src
```

Giving node more RAM can help for large codebases.

```sh
NODE_OPTIONS=--max-old-space-size=4096 npx @patternfly/class-name-updater ./path-to-src
```

These commands will show you places in your code that appear to need class name changes. Add the `--fix` flag to allow us to autofix issues where possible.

### Options

```sh
Usage: @patternfly/class-name-updater [options] <path> [otherPaths...]

Options:
  -V, --version      output the version number
  --v6               run in PF6 mode
  --extensions       comma-delineated list of file extensions to update, by default includes css, scss, less, ts, tsx, js, jsx and md
  --exclude          comma-delineated list of files to exclude, files should include their path relative to where this utility is being called
  --fix              whether to run fixer
  -h, --help         display help for command
```

### Example

In:

```css
.pf-c-console {
  display: grid;
  grid-template-areas:
    "actions-main actions-extra"
    "main main";
  row-gap: var(--pf-v5-global--spacer--md);
}

.pf-c-console__actions {
  grid-area: actions-main;
  display: flex;
}

.pf-c-console__actions > div {
  margin-right: var(--pf-v5-global--spacer--sm);
}

.pf-m-selectable {
  color: red;
}

.pf-u-screen-reader > .pf-l-stack__item {
  color: blue;
}
```

```jsx
<div className="pf-c-console">
  <div className="pf-c-console__actions pf-m-selectable">
    <p className="pf-u-screen-reader">
      Helper text
    </p>
  </div>
</div>
```

Out:

```css
.pf-v5-c-console {
    display: grid;
    grid-template-areas:
      'actions-main actions-extra'
      'main main';
    row-gap: var(--pf-v5-global--spacer--md);
  }

  .pf-v5-c-console__actions {
    grid-area: actions-main;
    display: flex;
  }

  .pf-v5-c-console__actions > div {
    margin-right: var(--pf-v5-global--spacer--sm);
  }

  .pf-m-selectable {
    color: red;
  }

  .pf-v5-u-screen-reader > .pf-v5-l-stack__item{
    color: red;
  }
```

```jsx
<div className="pf-v5-c-console">
  <div className="pf-v5-c-console__actions pf-m-selectable">
    <p className="pf-v5-u-screen-reader">
      Helper text
    </p>
  </div>
</div>
```
