"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
const tslib_1 = require("tslib");
const exec_1 = require("./utils/exec");
const package_1 = require("./utils/package");
const version_1 = require("./utils/version");
const prepare = ({ stripSuffix = false, sdistOptions = "", versionPrefix = "", workingDirectory, }, { nextRelease, logger }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (workingDirectory) {
        logger.log("Changing directory to %s", workingDirectory);
        process.chdir(workingDirectory);
    }
    const version = (0, version_1.getHaskellVersion)(nextRelease, versionPrefix, stripSuffix);
    const packageYaml = new package_1.PackageYaml();
    const sdistCmd = `stack sdist ${sdistOptions} --tar-dir .`;
    logger.log("Setting package version to %s", version);
    packageYaml.setVersion(version);
    packageYaml.write();
    logger.log("Running %s", sdistCmd);
    const { warn, output } = yield (0, exec_1.runExecCommand)(sdistCmd);
    if (warn) {
        logger.warn(warn);
    }
    logger.log(output);
    logger.success("Prepare done!");
});
exports.prepare = prepare;
//# sourceMappingURL=prepare.js.map