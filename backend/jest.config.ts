import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["src/tests"],
   extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
};

export default config;