import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import multiInput from 'rollup-plugin-multi-input';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

// Minimize files
const filesizeConfig = {
  showGzippedSize: true,
  showBrotliSize: false,
  showMinifiedSize: false,
};

// Copy base components
const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'node_modules' },
    { src: 'node_modules/systemjs/dist/s.min.js', dest: 'node_modules/systemjs/dist' },
  ],
};

console.log(process.env.NODE_ENV);

// Simple config for build modules
const configs = [
  {
    input: ['metrix-components/chart-bar/index.js', 'metrix-components/chart-line/index.js'],

    output: {
      dir: 'dist/',
      format: 'es',
    },
    plugins: [resolve(), multiInput()],
  },
  {
    input: 'metrix-components/common.js',
    output: {
      file: process.env.NODE_ENV !== 'production' ? 'public/dist/common.js' : 'dist/common.js',
      format: 'es',
    },
    plugins: [
      commonjs({ include: ['node_modules/**'] }),
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
];

configs.map(config => {
  if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(terser());
  }
  config.plugins.push(filesize(filesizeConfig));
});

export default configs;
