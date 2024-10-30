const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/factorio-production-calculator.com/" : "/",
  transpileDependencies: true
})
