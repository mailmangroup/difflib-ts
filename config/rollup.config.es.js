import config from './rollup.config';

export default config( {
  format: 'es',
  file: 'dist/index.es.js',
  browser: false
} );