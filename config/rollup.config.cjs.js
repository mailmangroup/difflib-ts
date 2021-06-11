import config from './rollup.config';

export default config( {
  format: 'cjs',
  file: 'dist/index.cjs.js',
  browser: false
} );