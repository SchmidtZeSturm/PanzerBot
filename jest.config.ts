import "module-alias/register";
import type { Config } from "@jest/types";
import { defaults } from "jest-config";
import { pathsToModuleNameMapper } from "ts-jest/utils";
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'json5';

export default async (): Promise<Config.InitialOptions> => {

  const { compilerOptions } = parse(readFileSync(resolve(__dirname, 'tsconfig.json'), 'utf8'));

  return {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["<rootDir>/src"],
    cacheDirectory: "<rootDir>/build/.cache/jest/",
    testRegex: '.*\.spec.tsx?$',
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
    transform: {
      "^.+\\.(t|j)sx?$": "ts-jest",
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src"}),
    modulePaths: [
      '<roorDir>/tests/fixtures',
      '<rootDir>/src'
    ]
  };
};
