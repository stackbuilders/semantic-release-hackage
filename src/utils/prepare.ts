import fs from "fs";

export const getCabalFilename: () => string | undefined = () => {
  return fs
    .readdirSync(__dirname)
    .filter(path => fs.statSync(path).isFile())
    .filter(path => path.endsWith(".cabal"))
    .at(0);
};
