import { RuleTester } from "eslint";

export type ValidTests = Array<string | RuleTester.ValidTestCase>;
export type InvalidTests = RuleTester.InvalidTestCase[];
export type TestErrors = {
  message: string;
  type: string;
}[];
