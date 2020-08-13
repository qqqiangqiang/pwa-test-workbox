module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": [
          "last 1 version",
          "not dead",
          "> 0.2%"
        ],
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    // "transform-vue-jsx",
    "@babel/plugin-transform-runtime",
    // "@babel/plugin-transform-modules-commonjs",
    // [
    //   "import",
    //   {
    //     "libraryName": "view-design",
    //     "libraryDirectory": "src/components"
    //   }
    // ]
  ],
  sourceType: 'unambiguous'
}