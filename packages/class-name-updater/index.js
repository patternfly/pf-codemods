#!/usr/bin/env node
const { join } = require("path");
const { Command } = require("commander");
const program = new Command();

const { isDir } = require("./utils");
const { classNameUpdate } = require("./classNameUpdate");

program
  .version(require("./package.json").version)
  .description("Update class name versioning")
  .arguments("<path> [otherPaths...]")
  .option(
    "--extensions <extensions>",
    "Comma-delineated list of file extensions to update"
  )
  .option("--fix", "Whether to run fixer")
  .action(runClassNameUpdate);

async function runClassNameUpdate(path, otherPaths, options) {
  let allPaths = [path, ...otherPaths];

  // if all paths are resolved to be directories assume that they want to run on all contents of those directories
  const onlyDirs = await Promise.all(allPaths.map((path) => isDir(path))).then(
    (responses) => responses.every((isDirResult) => !!isDirResult)
  );

  if (onlyDirs) {
    allPaths = allPaths.map((path) => join(path, "**", "*"));
  }

  let fileTypes;
  if (options.extensions) {
    fileTypes = new RegExp(`\.(${options.extensions.split(",").join("|")})$`);
  }

  allPaths.forEach(async (path) => {
    await classNameUpdate(path, options.fix, fileTypes);
  });
}

program.parse(process.argv);
