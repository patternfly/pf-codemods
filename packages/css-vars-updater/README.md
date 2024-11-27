# css-vars-updater

This utility automatically identifies Patternfly CSS variables in v5 that need to be updated after the introduction of new [global tokens in Patternfly v6](https://www.patternfly.org/tokens/about-tokens).

## Usage

Requires Node.js >= 10.

```sh
npx @patternfly/css-vars-updater ./path-to-src
```

Running this command will use default options, if you want a finer control over the updates, use an `-i` (or `--interactive`) option. It will start an interactive interface, where you can setup what files should be fixed and what tokens should be replaced:
```
npx @patternfly/css-vars-updater ./path-to-src -i

--> Enter file extensions to update (comma-separated): (scss,css,less,md)
--> Do you want to exclude any files? (y/N)
    yes --> Enter files to exclude (comma-separated, relative paths)
--> Do you want to run the fixer? (Y/n)
--> Do you want to replace color variables with a temporary hot pink color variable? (Y/n)
--> Do you want to replace other global variables with a matching token? (Y/n)
--> Do you want to fix directional styles and how? E.g. PaddingLeft -> PaddingInlineStart (Use arrow keys)
    ❯ Fix in left-to-right manner (English)
      Fix in right-to-left manner
      Fix in top-to-bottom manner
      Don’t fix
```

Giving node more RAM can help for large codebases.

```sh
NODE_OPTIONS=--max-old-space-size=4096 npx @patternfly/css-vars-updater ./path-to-src
```

### Options

```sh
Usage: @patternfly/css-vars-updater <path> [otherPaths...]

Options:
  -V, --version      output the version number
  -i, --interactive  starts an interactive interface for finer control over the updates
  --fix              whether to run fixer
  -h, --help         display help for command
```

### Example

Using default options:

In:

```css
.custom-class {
  /* Global non-color variables */
  border-radius: var(--pf-v5-global--BorderRadius--lg);
  row-gap: var(--pf-v5-global--spacer--md);
  width: var(--pf-v5-global--arrow--width);

  /* Global color variables */
  color: var(--pf-v5-global--Color--100);
  background-color: var(--pf-v5-global--BackgroundColor--200);

  /* Variables removed from v6 */
  max-width: var(--pf-v5-c-accordion__toggle-text--MaxWidth);

  /* Variables staying in v6 */
  height: var(--pf-v5-c-about-modal-box--Height);
  box-shadow: var(--pf-v5-c-alert--BoxShadow);

  /* Variables with direction updates */
  padding-inline-start: var(--pf-v5-c-about-modal-box__brand--PaddingLeft);
  padding-inline-end: var(--pf-v5-c-about-modal-box__brand--PaddingRight);
  padding-block-start: var(--pf-v5-c-about-modal-box__brand--PaddingTop);
  padding-block-end: var(--pf-v5-c-about-modal-box__brand--PaddingBottom);
}
```

Out:

```css
.custom-class {
  /* Global non-color variables */
  border-radius: var(--pf-t--global--border--radius--large);
  row-gap: var(--pf-t--global--spacer--md);
  width: var(--pf-v5-global--arrow--width);

  /* Global color variables */
  color: var(--pf-t--temp--dev--tbd /* CODEMODS: original v5 color was:--pf-v5-global--Color--100 */);
  background-color: var(--pf-t--temp--dev--tbd /* CODEMODS: original v5 color was:--pf-v5-global--BackgroundColor--200 */);

  /* Variables removed from v6 */
  max-width: var(--pf-v5-c-accordion__toggle-text--MaxWidth);

  /* Variables staying in v6 */
  height: var(--pf-v6-c-about-modal-box--Height);
  box-shadow: var(--pf-v6-c-alert--BoxShadow);

  /* Variables with direction updates */
  padding-inline-start: var(--pf-v6-c-about-modal-box__brand--PaddingInlineStart);
  padding-inline-end: var(--pf-v6-c-about-modal-box__brand--PaddingInlineEnd);
  padding-block-start: var(--pf-v6-c-about-modal-box__brand--PaddingBlockStart);
  padding-block-end: var(--pf-v6-c-about-modal-box__brand--PaddingBlockEnd);
}
```
