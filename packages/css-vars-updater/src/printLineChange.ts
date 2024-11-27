import colors from "colors";
import { CssVarReplacement } from "./cssVarReplacement";

const printFormatted = (lineNumber: number, ...args: string[]) => {
  console.log(`${lineNumber}: `, ...args);
};

export const printLineChange = (
  lineNumber: number,
  oldVar: string,
  replacement: CssVarReplacement
) => {
  if (!replacement) {
    return;
  }

  if (replacement.varWasRemoved) {
    printFormatted(lineNumber, colors.yellow(oldVar), "was removed in v6");
    return;
  }

  if (replacement.directionReplacementExists) {
    printFormatted(
      lineNumber,
      colors.yellow(oldVar),
      "may be replaced with an -InlineStart, -InlineEnd, -BlockStart or -BlockEnd variable"
    );
    return;
  }

  if (replacement.newVar) {
    printFormatted(
      lineNumber,
      colors.red(oldVar),
      "->",
      colors.green(replacement.newVar)
    );
  }
};
