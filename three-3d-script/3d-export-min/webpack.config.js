const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development", // 开发模式
  entry: path.resolve(__dirname, "index.js"), // 入口文件
  output: {
    filename: "bundle.js", // 打包后的文件名称
    path: path.resolve(__dirname, "./dist"), // 打包后的目录
  },
  
  plugins: [new CleanWebpackPlugin()],
  devServer:{
    port:9000,
    liveReload: false
  },
  node: false
}
