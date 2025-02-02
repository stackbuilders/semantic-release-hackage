"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageYaml = void 0;
const tslib_1 = require("tslib");
const yaml_1 = tslib_1.__importDefault(require("yaml"));
const fs_1 = tslib_1.__importDefault(require("fs"));
class PackageYaml {
    constructor(path) {
        this.path = path !== null && path !== void 0 ? path : "package.yaml";
        this.data = this.read();
    }
    getName() {
        return this.data.name;
    }
    getVersion() {
        return this.data.version;
    }
    setVersion(version) {
        this.data.version = version;
        return this;
    }
    write(path) {
        fs_1.default.writeFileSync(path !== null && path !== void 0 ? path : this.path, yaml_1.default.stringify(this.data));
        return this;
    }
    read() {
        const exists = fs_1.default.existsSync(this.path);
        if (!exists) {
            throw new Error(`package.yaml does not exist in ${process.cwd()}`);
        }
        const yaml = fs_1.default.readFileSync(this.path, "utf8");
        return yaml_1.default.parse(yaml);
    }
}
exports.PackageYaml = PackageYaml;
//# sourceMappingURL=package.js.map