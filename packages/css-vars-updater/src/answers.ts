export type Answers = {
  fileExtensions: string;
  shouldExcludeFiles: boolean;
  filesToExclude?: string;
  fix: boolean;
  replaceGlobalColorsWithPink: boolean;
  replaceGlobalVars: boolean;
  directionalStyles: "ltr" | "rtl" | "ttb" | "none";
};
