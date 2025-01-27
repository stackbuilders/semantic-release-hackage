"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupCabalFilename = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
function lookupCabalFilename(cwd, logger) {
    const cabalFilename = fs_1.default
        .readdirSync(cwd)
        .filter((path) => fs_1.default.statSync(path).isFile())
        .filter((path) => path.endsWith(".cabal"))
        .at(0);
    if (!cabalFilename) {
        logger.error("Unable to find cabal file name in ", cwd);
        throw new Error("Could not determine the cabal filename. Check the plugin configuration");
    }
    logger.info("Using cabal file: ", cabalFilename);
    return cabalFilename;
}
exports.lookupCabalFilename = lookupCabalFilename;
//# sourceMappingURL=prepare.js.map