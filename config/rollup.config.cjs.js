import config from './rollup.config.js';

export default {
  ...config,
  output: {
    format: 'cjs',
    file: 'dist/index.cjs',
    sourcemap: true
  }
};
