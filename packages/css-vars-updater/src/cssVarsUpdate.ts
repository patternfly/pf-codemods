import { sync } from "glob";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { isDir } from "@patternfly/shared-codemod-helpers";
import { Answers } from "./answers";
import { getCssVarReplacement } from "./cssVarReplacement";
import { printLineChange } from "./printLineChange";

export async function cssVarsUpdate(globTarget: string, answers: Answers) {
  const fileTypesRegex = answers.fileExtensions
    ? new RegExp(`\.(${answers.fileExtensions.split(",").join("|")})$`)
    : undefined;

  const excludedFiles = answers.filesToExclude
    ? answers.filesToExclude.split(",").map((file: string) => file.trim())
    : undefined;

  const acceptedFileTypesRegex = fileTypesRegex || /\.(s?css|less|md)$/;

  // negative lookbehind (?<!:) is used here to prevent matching codemod comments
  const isV5VarRegex = /(?<!:)(--pf-v5-[\w-]+)/g;

  const files = sync(globTarget, { ignore: "**/node_modules/**" });

  const includedFiles = excludedFiles
    ? files.filter((filePath: string) => !excludedFiles.includes(filePath))
    : files;

  includedFiles.forEach(async (file: string) => {
    const filePath = join(process.cwd(), file);
    const isDirectory = await isDir(filePath);
    const isUnexpectedFile = !acceptedFileTypesRegex.test(filePath);

    if (isDirectory || isUnexpectedFile) {
      return;
    }

    const fileContent = readFileSync(filePath, "utf8");

    const needsChange = isV5VarRegex.test(fileContent);
    if (!needsChange) {
      return;
    }

    console.log(file);

    const newContent = fileContent
      .split("\n")
      .map((line, index) => {
        let updatedLine = line;
        let match;

        // Check for matches in the line
        while ((match = isV5VarRegex.exec(line)) !== null) {
          const oldVar = match[0];
          const replacement = getCssVarReplacement(oldVar, answers);
          if (!replacement) {
            continue;
          }

          printLineChange(index + 1, oldVar, replacement);

          if (replacement.newVar) {
            updatedLine = updatedLine.replace(oldVar, replacement.newVar);
          }
        }

        return updatedLine;
      })
      .join("\n");

    if (answers.fix) {
      writeFileSync(filePath, newContent);
    }
  });
}
