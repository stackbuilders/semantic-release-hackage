"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = exports.readAndWriteNewCabal = exports.VERSION_PATTERN = void 0;
const tslib_1 = require("tslib");
const exec_1 = require("./utils/exec");
const prepare_1 = require("./utils/prepare");
const promises_1 = require("fs/promises");
const path_1 = require("path");
exports.VERSION_PATTERN = /^\s*version:\s+(\S+)/m;
const readAndWriteNewCabal = (fullCabalPath, newVersion) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const versionContents = yield (0, promises_1.readFile)(fullCabalPath, "utf8");
    const newContents = versionContents.replace(exports.VERSION_PATTERN, `version: ${newVersion}`);
    yield (0, promises_1.writeFile)(fullCabalPath, newContents, "utf8");
});
exports.readAndWriteNewCabal = readAndWriteNewCabal;
const prepare = ({ cabalCmd = "cabal", cabalFile, sdistOptions = "", versionPrefix = "", }, { nextRelease, logger, cwd }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const realCwd = cwd !== null && cwd !== void 0 ? cwd : process.cwd();
    logger.log("Current working directory: ", realCwd);
    const cabalFileName = cabalFile !== null && cabalFile !== void 0 ? cabalFile : (0, prepare_1.lookupCabalFilename)(realCwd, logger);
    const { version } = nextRelease;
    const fullCabalPath = (0, path_1.resolve)(realCwd, cabalFileName);
    const fullVersion = `${versionPrefix}${version}`;
    logger.log("Reading .cabal file: ", fullCabalPath);
    yield (0, exports.readAndWriteNewCabal)(fullCabalPath, fullVersion);
    logger.log("Writing new version %s to `%s`", version, fullCabalPath);
    logger.log(`Running ${cabalCmd} sdist command`);
    const { warn, output } = yield (0, exec_1.runExecCommand)(`${cabalCmd} sdist ${sdistOptions}`);
    if (warn) {
        logger.warn(warn);
    }
    logger.log(output);
    logger.success("Prepare done!");
});
exports.prepare = prepare;
//# sourceMappingURL=prepare.js.map