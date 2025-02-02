"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConditions = void 0;
const verifyConditions = (_pluginConfig, { logger }) => {
    const { HACKAGE_TOKEN } = process.env;
    if (!HACKAGE_TOKEN) {
        throw new Error("HACKAGE_TOKEN must be set in the environment");
    }
    logger.success("Verify conditions done!");
};
exports.verifyConditions = verifyConditions;
//# sourceMappingURL=verifyConditions.js.map