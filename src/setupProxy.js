const { createProxyMiddleware } = require("http-proxy-middleware");

const defense = {
    target: "http://www.mod.gov.cn",
    changeOrigin: true,
};
const foreign = {
    target: "https://www.fmprc.gov.cn",
    changeOrigin: true,
};
const commerce = {
    target: "http://www.mofcom.gov.cn/article/ae",
    changeOrigin: true,
};

module.exports = function (app) {
    app.use("/jzhzt/node_47321.htm", createProxyMiddleware(defense));
    app.use("/web/fyrbt_673021/", createProxyMiddleware(foreign));
    app.use("/slfw/", createProxyMiddleware(commerce));
};
