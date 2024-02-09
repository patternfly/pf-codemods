import glob from "glob";
import { join } from "path";
import { readdir, readFile, writeFile } from "fs/promises";

const rulePath = join(process.cwd(), "src", "rules");

const baseReadMePath = join(rulePath, "baseReadMe.md");
const baseReadMeContent = readFile(baseReadMePath, "utf-8");

const v6RuleDirs = glob.sync(join(rulePath, "v6", "*"));
console.log(v6RuleDirs);

const builtReadMes = v6RuleDirs.map(async (ruleDir) => {
  const files = await readdir(ruleDir);

  const readMe = files.find((file) => file.includes(".md"));
  const input = files.find((file) => file.includes("Input.tsx"));
  const output = files.find((file) => file.includes("Output.tsx"));

  if (!readMe || !input || !output) {
    console.error("Missing file in rule directory: ", ruleDir);
    throw new Error("Missing file in rule directory");
  }

  const readMeContent = await readFile(join(ruleDir, readMe), "utf-8");
  const inputContent = await readFile(join(ruleDir, input), "utf-8");
  const outputContent = await readFile(join(ruleDir, output), "utf-8");

  const builtReadMe = readMeContent
    .replace("%inputExample%", inputContent.trim())
    .replace("%outputExample%", outputContent.trim());

  return builtReadMe;
});

builtReadMes.unshift(baseReadMeContent);

Promise.all(builtReadMes).then(async (builtReadMes) => {
  const readMeContent = builtReadMes.reduce((acc, readMe) => acc + readMe, "");
  await writeFile(join(rulePath, "README.md"), readMeContent);
});
