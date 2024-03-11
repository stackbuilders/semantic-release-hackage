import fs from "fs";
import { PrepareContext } from "semantic-release";

export function lookupCabalFilename(cwd: string, logger: PrepareContext["logger"]): string {
  const cabalFilename = fs
    .readdirSync(cwd)
    .filter((path) => fs.statSync(path).isFile())
    .filter((path) => path.endsWith(".cabal"))
    .at(0);

  if (!cabalFilename) {
    logger.error("Unable to find cabal file name in ", cwd);
    throw new Error("Could not determine the cabal filename. Check the plugin configuration");
  }
  logger.info("Using cabal file: ", cabalFilename);

  return cabalFilename;
}
