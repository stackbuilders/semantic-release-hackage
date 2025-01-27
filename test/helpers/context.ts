import {
  VerifyConditionsContext,
  VerifyReleaseContext,
} from "semantic-release";
import Sinon from "sinon";

const LoggerFake = {
  addSecrets: Sinon.fake(),
  await: Sinon.fake(),
  clearSecrets: Sinon.fake(),
  complete: Sinon.fake(),
  config: Sinon.fake(),
  debug: Sinon.fake(),
  disable: Sinon.fake(),
  enable: Sinon.fake(),
  error: Sinon.fake(),
  fatal: Sinon.fake(),
  fav: Sinon.fake(),
  info: Sinon.fake(),
  isEnabled: Sinon.fake(),
  log: Sinon.fake(),
  note: Sinon.fake(),
  pause: Sinon.fake(),
  pending: Sinon.fake(),
  scope: Sinon.fake(),
  star: Sinon.fake(),
  start: Sinon.fake(),
  success: Sinon.fake(),
  time: Sinon.fake(),
  timeEnd: Sinon.fake(),
  unscope: Sinon.fake(),
  warn: Sinon.fake(),
  watch: Sinon.fake(),
};

export const semanticVerifyReleaseContext: VerifyReleaseContext = {
  branch: {
    channel: "",
    name: "main",
    prerelease: false,
    range: "",
  },
  branches: [],
  commits: [],
  env: {},
  envCi: {
    branch: "",
    commit: "",
    isCi: false,
  },
  lastRelease: {
    channels: [],
    gitHead: "",
    gitTag: "",
    name: "",
    version: "",
  },
  logger: LoggerFake,
  nextRelease: {
    channel: "",
    gitHead: "h1",
    gitTag: "v1.0.0",
    name: "v1.0.0",
    notes: "",
    type: "minor",
    version: "1.0.0",
  },
  releases: [],
  stderr: process.stderr,
  stdout: process.stdout,
};

export const semanticVerifyConditionsContext: VerifyConditionsContext = {
  branch: {
    channel: "",
    name: "main",
    prerelease: false,
    range: "",
  },
  branches: [],
  env: {},
  envCi: {
    branch: "",
    commit: "",
    isCi: false,
  },
  logger: LoggerFake,
  stderr: process.stderr,
  stdout: process.stdout,
};
