// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
// });

module.exports = {
  devServer: {
    port: 1234,
    proxy: {
      "/api": {
        target: "http://localhost:1234",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
