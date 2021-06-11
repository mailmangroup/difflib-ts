import config from './rollup.config';

export default config( {
  format: 'cjs',
  file: 'dist/index.browser.cjs.js',
  browser: true
} );