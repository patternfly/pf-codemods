require("colors");
import { Change, diffChars} from "diff";

function formatLineNumber(lastLineNumber: number, newLineNumber: number) {
  if (newLineNumber === lastLineNumber) {
    return "";
  }

  const newLine = lastLineNumber || lastLineNumber === 0 ? "\n" : "";
  return `${newLine}  ${newLineNumber + 1}: `;
}

function formatDiff(diff: Change[], part: Change, i: number) {
  const proceedingPartSplit = diff[i - 1].value.split("\n");
  const proceedingPart =
    proceedingPartSplit[proceedingPartSplit.length - 1].trim();

  const followingPartSplit = diff[i + 1].value.split("\n");
  const followingPart = followingPartSplit[0].trim();

  // The color package is weird, which is why we have to cast to any
  return proceedingPart["grey" as any] + part.value["green" as any] + followingPart["grey" as any];
}

export function printDiff(fileName: string, oldContent: string, newContent: string, changeNeededRegex: RegExp) {
  if (oldContent.length > 400_000) {
    process.stdout.write(`\n ${fileName}`);
    process.stdout.write(
      "\n  this file may take a long time to diff or hang perpetually because of its size, you will likely want to exclude it"[
        "red" as any
      ]
    );
  }

  const fileSplitByLine = oldContent.split("\n");
  const loggedFiles: string[] = [];
  let lastPartLineNumber: number;

  const diff = diffChars(oldContent, newContent);

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
