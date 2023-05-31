const { readdir } = require("fs").promises;

async function isDir(potentialDirPath) {
  return readdir(potentialDirPath).then(
    () => true,
    () => false
  );
}

module.exports = {
  isDir,
};
