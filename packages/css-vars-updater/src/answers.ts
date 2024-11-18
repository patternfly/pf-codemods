export type Answers = {
  fileExtensions: string;
  shouldExcludeFiles: boolean;
  filesToExclude?: string;
  fix: boolean;
  replaceGlobalColorsWithPink: boolean;
  replaceGlobalVars: boolean;
  direction: "ltr" | "rtl" | "ttb" | "none";
};
