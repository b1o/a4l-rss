const PROXY_CONFIG = {
  '/data/*': {
    target: 'http://rss.bse-sofia.bg/',
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
    pathRewrite: (a, b, c) => {
      const index = a.lastIndexOf('?');
      const params = a.substring(index);
      console.log(params);
      return 'http://rss.bse-sofia.bg' + params;
    }
  }
};

module.exports = PROXY_CONFIG;
