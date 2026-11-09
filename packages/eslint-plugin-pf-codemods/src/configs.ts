import { mappedRules, rules } from "./ruleCuration";
import * as parser from "@typescript-eslint/parser";

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
  "flat/recommended": {
    name: "pf-codemods/flat/recommended",
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@patternfly/pf-codemods": {
        rules,
      },
    },
    languageOptions: {
      parser,
      ecmaVersion: "latest",
      sourceType: sourceTypeModule,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "off",
    },
    rules: mappedRules,
  },
};
