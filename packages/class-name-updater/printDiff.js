require("colors");
const Diff = require("diff");

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

function printDiff(fileName, oldContent, newContent, changeNeededRegex) {
  if (oldContent.length > 400_000) {
    process.stdout.write(`\n ${fileName}`);
    process.stdout.write(
      "\n  this file may take a long time to diff or hang perpetually because of its size, you will likely want to exclude it"[
        "red"
      ]
    );
  }

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

module.exports = {
  printDiff,
};
