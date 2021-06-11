import typescript from 'rollup-plugin-typescript2';
// import { terser } from 'rollup-plugin-terser';
import pkg from '../package.json';

export default config => ( {
  input: 'src/index.ts', // our source file
  output: {
    format: config.format,
    file: config.file
  },
  external: [
    ...Object.keys( pkg.dependencies || {} )
  ],
  plugins: [
    typescript()
    // terser() // minifies generated bundles,
 ]
} );