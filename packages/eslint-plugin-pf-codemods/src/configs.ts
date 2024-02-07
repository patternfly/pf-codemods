import { mappedRules } from "./ruleCuration";

const sourceTypeModule: "script" | "module" = "module";

export const configs = {
  recommended: {
    plugins: ["@patternfly/pf-codemods"],
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    noInlineConfig: true,
    reportUnusedDisableDirectives: false,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      sourceType: sourceTypeModule,
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: mappedRules,
  },
};

