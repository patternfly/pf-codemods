#!/usr/bin/env node
import { join } from "path";
import { Command } from "commander";
const program = new Command();

import { isDir } from "./utils";
import { classNameUpdate } from "./classNameUpdate";

program
  .version(
    require('../package.json').version
  )
  .description("Update class name versioning")
  .arguments("<path> [otherPaths...]")
  .option(
    "--extensions <extensions>",
    "Comma-delineated list of file extensions to update"
  )
  .option(
    "--exclude <files>",
    "Comma-delineated list of files to exclude, files should include their path relative to where this utility is being called"
  )
  .option("--fix", "Whether to run fixer")
  .action(runClassNameUpdate);

async function runClassNameUpdate(
  path: string,
  otherPaths: string,
  options: { extensions: string; fix: boolean; exclude: string[] | undefined }
) {
  let allPaths = [path, ...otherPaths];

  // if all paths are resolved to be directories assume that they want to run on all contents of those directories
  const onlyDirs = await Promise.all(allPaths.map((path) => isDir(path))).then(
    (responses) => responses.every((isDirResult) => !!isDirResult)
  );

  if (onlyDirs) {
    allPaths = allPaths.map((path) => join(path, "**", "*"));
  }

  let fileTypes: RegExp;
  if (options.extensions) {
    fileTypes = new RegExp(`\.(${options.extensions.split(",").join("|")})$`);
  }

  allPaths.forEach(async (path) => {
    await classNameUpdate(path, options.fix, fileTypes, options.exclude);
  });
}

program.parse(process.argv);
