const glob = require("glob");
const fs = require("fs");
const path = require("path");
const { isDir } = require("./utils");
const { printDiff } = require("./printDiff");

async function classNameUpdate(globTarget, makeChange, fileTypesRegex) {
  const acceptedFileTypesRegex = fileTypesRegex || /\.(s?css|less|(t|j)sx?|md)$/;

  const changeNeededRegex = /\bpf-([cul])-/g;
  const version = "v5";

  const files = glob.sync(globTarget, { ignore: "**/node_modules/**" });

  files.forEach(async (file) => {
    const filePath = path.join(process.cwd(), file);
    const isDirectory = await isDir(filePath, file);
    const isUnexpectedFile = !acceptedFileTypesRegex.test(filePath);

    if (isDirectory || isUnexpectedFile) {
      return;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const needsChange = changeNeededRegex.test(fileContent);

    if (!needsChange) {
      return;
    }

    const newContent = fileContent.replace(
      changeNeededRegex,
      `pf-${version}-$1-`
    );

    printDiff(file, fileContent, newContent, changeNeededRegex);

    if (makeChange) {
      fs.writeFileSync(filePath, newContent);
    }
  });
}

module.exports = {
  classNameUpdate,
};
