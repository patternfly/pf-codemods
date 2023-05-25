const glob = require("glob");
const fs = require("fs");
const path = require("path");
const { isDir } = require("./utils");
require("colors");
const Diff = require("diff");

const acceptedFileTypesRegex = /\.(s?css|less|(t|j)sx?|md)$/;
const changeNeededRegex = /\bpf-([cul])-/g;
const version = "v5";

function formatLineNumber(lastLineNumber, newLineNumber) {
  if (newLineNumber === lastLineNumber) {
    return "";
  }

  const newLine = lastLineNumber || lastLineNumber === 0 ? "\n" : "";
  return `${newLine}  ${newLineNumber + 1}: `;
}

function formatDiff(diff, part, i) {
  const proceedingPartSplit = diff[i - 1].value.split("\n");
  const proceedingPart =
    proceedingPartSplit[proceedingPartSplit.length - 1].trim();

  const followingPartSplit = diff[i + 1].value.split("\n");
  const followingPart = followingPartSplit[0].trim();

  return proceedingPart["grey"] + part.value["green"] + followingPart["grey"];
}

function printDiff(fileName, oldContent, newContent) {
  const fileSplitByLine = oldContent.split("\n");
  const loggedFiles = [];
  let lastPartLineNumber;

  const diff = Diff.diffChars(oldContent, newContent);

  diff.forEach((part, i) => {
    if (!part.added) {
      return;
    }

    const lineNumber = fileSplitByLine.findIndex((line) =>
      changeNeededRegex.test(line)
    );

    const currentLineValue = fileSplitByLine[lineNumber];
    const newLineValue = currentLineValue.replace(
      new RegExp(changeNeededRegex, ""),
      ""
    );
    fileSplitByLine[lineNumber] = newLineValue;

    const formattedLineNumber = formatLineNumber(
      lastPartLineNumber,
      lineNumber
    );

    if (lineNumber !== lastPartLineNumber) {
      lastPartLineNumber = lineNumber;
    }

    const formattedDiff = formatDiff(diff, part, i);

    const fullContextLine = `${formattedLineNumber} ${formattedDiff}`;

    if (!loggedFiles.includes(fileName)) {
      console.log("\n", fileName);
      loggedFiles.push(fileName);
    }

    process.stdout.write(fullContextLine);
  });
}

async function classNameUpdate(globTarget, makeChange) {
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

    printDiff(file, fileContent, newContent);

    if (makeChange) {
      fs.writeFileSync(filePath, newContent);
    }
  });
}

classNameUpdate("test/*");

module.exports = {
  classNameUpdate,
};
