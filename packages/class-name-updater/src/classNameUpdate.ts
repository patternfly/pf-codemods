import { sync } from "glob";
import { readFileSync, writeFileSync} from "fs";
import { join } from "path";
import { isDir } from "./utils";
import { printDiff } from "./printDiff";

export async function classNameUpdate(globTarget: string, makeChange: boolean, fileTypesRegex: RegExp, excludeFiles: string[] = [], pfVersion: number) {
  const acceptedFileTypesRegex = fileTypesRegex || /\.(s?css|less|(t|j)sx?|md)$/;
  // const changeNeededRegex = /(\b|\$)pf-([cul]|global|theme|color)-/g;
  const previousVersion = pfVersion ? ("v" + (pfVersion - 1)) : ""
  const changeNeededRegex = new RegExp(
      "(\b|\$)pf-" +
      previousVersion +
      "([cul]|global|theme|color)"
  )
  const newVersion = pfVersion || 5

  const files = sync(globTarget, { ignore: "**/node_modules/**" });
  const includedFiles = files.filter((filePath: string) => !excludeFiles.includes(filePath))

  includedFiles.forEach(async (file: string) => {
    const filePath = join(process.cwd(), file);
    const isDirectory = await isDir(filePath);
    const isUnexpectedFile = !acceptedFileTypesRegex.test(filePath);

    if (isDirectory || isUnexpectedFile) {
      return;
    }

    const fileContent = readFileSync(filePath, "utf8");
    const needsChange = changeNeededRegex.test(fileContent);

    if (!needsChange) {
      return;
    }

    const newContent = fileContent.replace(
      changeNeededRegex,
      `$1pf-v${newVersion}-$2-`
    );

    printDiff(file, fileContent, newContent, changeNeededRegex);

    if (makeChange) {
      writeFileSync(filePath, newContent);
    }
  });
}
