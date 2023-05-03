const { exec } = require("child_process");
const { mkdir, readdir, rm, rmdir } = require("fs").promises;
const path = require("path");

const packagesPath = path.join(process.cwd(), "test", "packages");

async function hasPackages() {
  const packages = await readdir(packagesPath);
  return packages.length > 0;
}

async function isDir(potentialDirPath) {
  return readdir(potentialDirPath).then(
    () => true,
    () => false
  );
}

async function rmIfNotReactOrPackageFile(targetPath) {
  if (targetPath.match(/(\.(t|j)sx$)|(package\.json)/)) {
    return;
  }
  await rm(targetPath);
}

async function purge(targetPath) {
  if (await isDir(targetPath)) {
    const files = await readdir(targetPath);
    const promises = files.map((file) => purge(path.join(targetPath, file)));

    await Promise.all(promises).then(async () => {
      const postPurgeFiles = await readdir(targetPath);
      if (!postPurgeFiles.length) {
        await rmdir(targetPath);
      }
    });
  } else {
    await rmIfNotReactOrPackageFile(targetPath);
  }
}

async function getPackages() {
  await mkdir(packagesPath, { recursive: true });
  const packagesAlreadyDownloaded = await hasPackages();
  if (packagesAlreadyDownloaded) {
    console.log("packages already downloaded");
  } else {
    console.log("downloading test packages");
    exec(
      "cd test/packages && curl https://codeload.github.com/patternfly/patternfly-react/tar.gz/main | tar -xz --strip=2 patternfly-react-main/packages",
      (err, stdOut, stdErr) => {
        if (err) {
          console.error("error", err);
        } else {
          console.log(stdErr);
          console.log(stdOut);
          purge(packagesPath);
        }
      }
    );
  }
}

getPackages();
