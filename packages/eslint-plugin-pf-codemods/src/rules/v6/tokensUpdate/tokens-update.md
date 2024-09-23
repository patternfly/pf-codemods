### tokens-update

We have updated our CSS tokens. About half of our tokens have been replaced with newer ones. 

- this rule provides an autofix for global non color tokens
- global color tokens will be replaced with a temporary hot pink color token **that must be manually replaced** (`t_temp_dev_tbd` react token or `--pf-t--temp--dev--tbd` CSS variable)
- other non-global (component or chart) tokens need to be replaced manually

To find a suitable replacement token, check our [v6 token documentation](https://staging-v6.patternfly.org/tokens/all-patternfly-tokens).

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
