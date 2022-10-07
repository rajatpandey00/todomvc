import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy'

const config = {
  input: 'src/app.js',
  output: {
	file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    copy({
      targets: [
        { src: 'cypress/*', dest: 'dist/cypress' },
        { src: 'cypress.json', dest: 'dist' }
      ]
    })]
};

export default config;
