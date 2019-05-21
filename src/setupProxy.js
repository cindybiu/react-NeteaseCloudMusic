const proxy = require("http-proxy-middleware")
 
module.exports = function (app) {
  app.use(
    proxy("/newSettlement/**", {
      target: "http://www.gtmall.top:3002/",
      changeOrigin: true,
      onProxyReq(proxyReq) {
        console.log(proxyReq)
      },
      logLevel: "debug",
    })
  )
}