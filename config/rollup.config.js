import typescript from 'rollup-plugin-typescript2';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts', // our source file
  output: [
    {
      format: 'cjs',
      file: 'dist/index.cjs',
      sourcemap: true
    },
    {
      format: 'es',
      file: 'dist/index.js',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      clean: true
    })
  ]
};

export default config;
