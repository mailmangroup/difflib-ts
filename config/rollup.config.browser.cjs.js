import config from './rollup.config.js';

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  ...config,
  output: {
    format: 'cjs',
    file: 'dist/index.browser.cjs',
    sourcemap: true
  }
};

export default options;
