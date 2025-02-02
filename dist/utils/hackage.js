"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPackage = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const HACKAGE_PACKAGES_URL = "https://hackage.haskell.org/packages";
const postPackage = (sdistPath, hackageToken, isPrerelease) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = isPrerelease
        ? `${HACKAGE_PACKAGES_URL}/candidates`
        : HACKAGE_PACKAGES_URL;
    try {
        const headers = {
            Accept: "text/plain",
            Authorization: `X-ApiKey ${hackageToken}`,
            "Content-Type": "multipart/form-data",
        };
        const req = yield axios_1.default.post(url, { package: fs_1.default.createReadStream(sdistPath) }, { headers });
        if (req.status !== 200) {
            throw new Error(`${req.status}: ${req.data}`); // catch will re-format
        }
        return req.status;
    }
    catch (e) {
        throw e instanceof Error ? new Error(`POST ${url} error: ${e.message}`) : e;
    }
});
exports.postPackage = postPackage;
//# sourceMappingURL=hackage.js.map