import { sync } from "glob";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { isDir } from "../../../helpers/utils";
// import { printDiff } from "../../../helpers/printDiff";
import {
  globalNonColorCssVarNamesMap,
  oldCssVarNames,
  oldGlobalColorCssVarNames,
  oldGlobalNonColorCssVarNames,
  v6DirectionCssVars,
} from "../../../helpers/tokenLists";
import { Answers } from "./answers";
import { getDirectionMap } from "./directionalStyles";

const getCssVarReplacement = (oldCssVar: string, answers: Answers) => {
  const cssVarRemoved = (cssVar: string) =>
    `${cssVar}/* CODEMODS: this var was removed in v6 */`;

  if (oldGlobalNonColorCssVarNames.has(oldCssVar)) {
    const newCssVar =
      globalNonColorCssVarNamesMap[
        oldCssVar as keyof typeof globalNonColorCssVarNamesMap
      ];
    if (newCssVar === "SKIP") {
      return cssVarRemoved(oldCssVar);
    }
    if (answers.replaceGlobalVars) {
      return newCssVar;
    }
    return oldCssVar;
  }

  if (oldGlobalColorCssVarNames.has(oldCssVar)) {
    if (answers.replaceGlobalColorsWithPink) {
      return `--pf-t--temp--dev--tbd/* CODEMODS: original v5 color was ${oldCssVar} */`;
    }
    return oldCssVar;
  }

  if (oldCssVarNames.has(oldCssVar)) {
    const directionMap = getDirectionMap(answers.directionalStyles);
    const directions = Object.keys(directionMap);

    if (
      answers.directionalStyles !== "none" &&
      directions.some((direction) => oldCssVar.endsWith(direction))
    ) {
      const newCssVar = oldCssVar
        .replace(
          /(Left|Right|Top|Bottom)$/,
          (match) => directionMap[match as keyof typeof directionMap]
        )
        .replace("v5", "v6");

      if (v6DirectionCssVars.has(newCssVar)) {
        return newCssVar;
      }
    }

    return cssVarRemoved(oldCssVar);
  }

  return oldCssVar.replace("v5", "v6");
};

export async function cssVarsUpdate(globTarget: string, answers: Answers) {
  const fileTypesRegex = answers.fileExtensions
    ? new RegExp(`\.(${answers.fileExtensions.split(",").join("|")})$`)
    : undefined;

  const excludedFiles = answers.filesToExclude
    ? answers.filesToExclude.split(",").map((file: string) => file.trim())
    : undefined;

  const acceptedFileTypesRegex = fileTypesRegex || /\.(s?css|less|md)$/;

  const isV5VarRegex = /(--pf-v5-[\w-]+)/g;

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

    const newContent = fileContent.replace(isV5VarRegex, (match) =>
      getCssVarReplacement(match, answers)
    );

    // printDiff(file, fileContent, newContent, isV5VarRegex);

    if (answers.fix) {
      writeFileSync(filePath, newContent);
    }
  });
}
