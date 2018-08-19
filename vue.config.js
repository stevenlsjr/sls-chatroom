const backendUrl = process.env.VUE_APP_BACKEND_URL;
const BundleTracker = require('webpack-bundle-tracker');
const root = __dirname;
const path = require('path');

module.exports = {
  devServer : {
    proxy : [ {
      context : [ '/docs/', '/api/v0/', '/static/' ],
      target : backendUrl,
      ws : true,
      changeOrigin : true
    } ],
    headers: {
      'Access-Control-Allow-Origin': '*'
    },

    historyApiFallback : false
  },
  configureWebpack(config) {
    config.output.publicPath = 'http://localhost:8080/';
    config.plugins.push(new BundleTracker());
  }
};
