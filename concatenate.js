const fs = require('fs-extra');
const concat = require('concat');

concatenate = async () => {
  const files = [
    './dist/a4l-rss/runtime-es5.js',
    './dist/a4l-rss/polyfills-es5.js',
    './dist/a4l-rss/main-es5.js'
  ];

  await fs.ensureDir('output');
  await concat(files, 'output/rss-feed.js');
};

concatenate();
