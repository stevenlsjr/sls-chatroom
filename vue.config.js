const backendUrl = process.env.VUE_APP_BACKEND_URL;

module.exports = {
  devServer: {
    proxy: [{
      context: ['/docs/', '/api/v0/', '/static/'],
      target: backendUrl,
      ws: true,
      changeOrigin: true
    }],

    historyApiFallback: false
  }
};
