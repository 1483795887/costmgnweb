module.exports = {
  "env": {
    "development": {
      "sourceMaps": true,
      "retainLines": true
    }
  },
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" }
    ]
  ]
}
