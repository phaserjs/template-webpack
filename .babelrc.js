const presets = [
  [
    "@babel/env",
    {
      targets: {
        browsers: [">0.25%", "not ie 11", "not op_mini all"]
      },
      modules: false
    }
  ],
  "@babel/preset-react"
];
const plugins = [];
module.exports = { presets, plugins };
