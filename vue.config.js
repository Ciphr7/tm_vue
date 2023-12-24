module.exports = {
  transpileDependencies: ['vuetify', 'x5-gmaps'],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://axis.promiles.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/v1',
        },
      },
    },
  },
};



