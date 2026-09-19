import config from './rollup.config.js';

export default {
  ...config,
  output: {
    format: 'es',
    file: 'dist/index.browser.js',
    sourcemap: true
  }
};
