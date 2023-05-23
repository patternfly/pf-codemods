const glob = require("glob");
const fs = require("fs");
const path = require("path");
const { isDir } = require("./utils");

async function classNameUpdate(globTarget) {
  const files = glob.sync(globTarget, { ignore: "**/node_modules/**" });
  console.log(files);
  files.forEach(async (file) => {
    const filePath = path.join(process.cwd(), file);
    const isDirectory = await isDir(filePath, file);
    if (!isDirectory) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const newContent = fileContent
        .replaceAll("pf-c", "pf-v5-c")
        .replaceAll("pf-u", "pf-v5-u");
      fs.writeFileSync(filePath, newContent);
    }
  });
}

module.exports = {
  classNameUpdate,
};
