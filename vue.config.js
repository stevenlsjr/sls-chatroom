const backendUrl = process.env.VUE_APP_BACKEND_URL;
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  devServer : {
    proxy : [ {
      context : [ '/docs/', '/api/v0/', '/static/' ],
      target : backendUrl,
      ws : true,
      changeOrigin : true
    } ],

    historyApiFallback : false
  },
  chainWebpack : config => {
    const mode = config.get('mode');
    config.plugin('bundle').use(BundleTracker, {
      filename: './webpack-stats.json'
    });
  }
};
