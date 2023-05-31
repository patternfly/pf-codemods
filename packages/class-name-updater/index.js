const { Command } = require("commander");
const program = new Command();

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
  const allPaths = [path, ...otherPaths];

  let fileTypes;
  if (options.extensions) {
    fileTypes = new RegExp(`\.(${options.extensions.split(",").join("|")})$`);
  }

  allPaths.forEach(async (path) => {
    await classNameUpdate(path, options.fix, fileTypes);
  });
}

program.parse(process.argv);
