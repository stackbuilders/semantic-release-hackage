import fs from "fs";

export const getCabalFilename: () => string | undefined = () => {
  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    if (file.endsWith(".cabal")) {
      return file.split(".")[0];
    }
  }
  return undefined;
};
