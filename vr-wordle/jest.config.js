module.exports = {
  preset: "ts-jest/presets/js-with-babel-esm",
  testEnvironment: "jsdom",
  transform: {
    "\\.m?jsx?$": "jest-esm-transformer",
  },
  transformIgnorePatterns: ["node_modules/(?!three-stdlib|@react-three)"],
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {},
  moduleFileExtensions: ["json", "js", "jsx", "ts", "tsx", "vue", "cjs"],
};
