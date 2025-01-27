"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConditions = void 0;
const EnvVarError_1 = require("./utils/EnvVarError");
const verifyConditions = (_pluginConfig, { logger }) => {
    const { HACKAGE_TOKEN } = process.env;
    logger.log("Checking environment variables");
    if (!HACKAGE_TOKEN) {
        throw new EnvVarError_1.EnvVarError("HACKAGE_TOKEN");
    }
    logger.success("Verify conditions done!");
};
exports.verifyConditions = verifyConditions;
//# sourceMappingURL=verifyConditions.js.map