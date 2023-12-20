import { Context } from "semantic-release";
import Sinon from "sinon";

export const semanticContext: Context = {
  branch: {
    channel: "",
    name: "main",
    prerelease: false,
    range: "",
  },
  commits: [],
  env: {},
  lastRelease: undefined,
  logger: {
    await: Sinon.fake(),
    complete: Sinon.fake(),
    debug: Sinon.fake(),
    error: Sinon.fake(),
    fatal: Sinon.fake(),
    fav: Sinon.fake(),
    info: Sinon.fake(),
    log: Sinon.fake(),
    note: Sinon.fake(),
    pause: Sinon.fake(),
    pending: Sinon.fake(),
    star: Sinon.fake(),
    start: Sinon.fake(),
    success: Sinon.fake(),
    wait: Sinon.fake(),
    warn: Sinon.fake(),
    watch: Sinon.fake(),
  },
  nextRelease: {
    channel: "",
    gitHead: "h1",
    gitTag: "v1.0.0",
    name: "v1.0.0",
    notes: "",
    type: "minor",
    version: "1.0.0",
  },
};

export const contextWithoutRelease: Context = {
  ...semanticContext,
  nextRelease: undefined,
};
