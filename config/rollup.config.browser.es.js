import config from './rollup.config';

export default config( {
  format: 'es',
  file: 'dist/index.browser.es.js',
  browser: true
} );