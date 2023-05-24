const glob = require("glob");
const fs = require("fs");
const path = require("path");
const { isDir } = require("./utils");
require("colors");
const Diff = require("diff");

function printDiff(
  loggedFiles,
  fileName,
  splitFile,
  diff,
  diffValue,
  diffIndex
) {
  const partLine = splitFile.find((line) => /\bpf-(c|u|l)-/.test(line));
  const partLineNumber = splitFile.indexOf(partLine);
  splitFile[partLineNumber] = partLine.replace(/\bpf-(c|u|l)-/, "");

  const proceedingPartSplit = diff[diffIndex - 1].value.split("\n");
  const proceedingPart =
    proceedingPartSplit[proceedingPartSplit.length - 1].trim();

  const followingPartSplit = diff[diffIndex + 1].value.split("\n");
  const followingPart = followingPartSplit[0].trim();

  const formattedDiff =
    proceedingPart["grey"] + diffValue["green"] + followingPart["grey"];

  const fullContextLine = `    ${partLineNumber + 1}: ${formattedDiff}\n`;

  if (!loggedFiles.includes(fileName)) {
    console.log("\n", fileName);
    loggedFiles.push(fileName);
  }

  process.stdout.write(fullContextLine);
}

async function classNameUpdate(globTarget, makeChange) {
  const files = glob.sync(globTarget, { ignore: "**/node_modules/**" });

  files.forEach(async (file) => {
    const filePath = path.join(process.cwd(), file);
    const isDirectory = await isDir(filePath, file);
    const isUnexpectedFile = !/\.(css|(t|j)sx?|md)$/.test(filePath);

    if (isDirectory || isUnexpectedFile) {
      return;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const needsChange = /\bpf-(c|u|l)-/.test(fileContent);

    if (!needsChange) {
      return;
    }

    const newContent = fileContent
      .replaceAll(/\bpf-c-/g, "pf-v5-c-")
      .replaceAll(/\bpf-u-/g, "pf-v5-u-")
      .replaceAll(/\bpf-l-/g, "pf-v5-l-");

    const fileSplitPerLine = fileContent.split("\n");
    const loggedFiles = [];

    const diff = Diff.diffChars(fileContent, newContent);
    diff.forEach((part, i) => {
      if (part.added) {
        printDiff(loggedFiles, file, fileSplitPerLine, diff, part.value, i);
      }
    });

    if (makeChange) {
      fs.writeFileSync(filePath, newContent);
    }
  });
}

module.exports = {
  classNameUpdate,
};
