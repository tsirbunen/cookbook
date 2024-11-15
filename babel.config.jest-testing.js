module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], ['next/babel'], '@babel/preset-typescript'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
    ["@babel/plugin-transform-private-methods", { "loose": true }]
  ]
}
