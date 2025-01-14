import { readdir } from "fs/promises";

export async function isDir(potentialDirPath: string) {
  return readdir(potentialDirPath).then(
    () => true,
    () => false
  );
}
