import { Context } from "semantic-release";

export const context: Context = {
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
    await(): void {
      throw new Error("Function not implemented.");
    },
    complete(): void {
      throw new Error("Function not implemented.");
    },
    debug(): void {
      throw new Error("Function not implemented.");
    },
    error(): void {
      throw new Error("Function not implemented.");
    },
    fatal(): void {
      throw new Error("Function not implemented.");
    },
    fav(): void {
      throw new Error("Function not implemented.");
    },
    info(): void {
      throw new Error("Function not implemented.");
    },
    log: () => undefined,
    note(): void {
      throw new Error("Function not implemented.");
    },
    pause(): void {
      throw new Error("Function not implemented.");
    },
    pending(): void {
      throw new Error("Function not implemented.");
    },
    star(): void {
      throw new Error("Function not implemented.");
    },
    start(): void {
      throw new Error("Function not implemented.");
    },
    success(): void {
      throw new Error("Function not implemented.");
    },
    wait(): void {
      throw new Error("Function not implemented.");
    },
    warn(): void {
      throw new Error("Function not implemented.");
    },
    watch(): void {
      throw new Error("Function not implemented.");
    },
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
  ...context,
  nextRelease: undefined,
};
