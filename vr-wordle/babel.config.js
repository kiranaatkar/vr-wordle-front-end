module.exports = {
  presets: [["@babel/preset-react", { runtime: "automatic" }]],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-regenerator",
  ],
};
