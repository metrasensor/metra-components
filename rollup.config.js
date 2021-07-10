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
    { src: 'node_modules/@webcomponents', dest: 'build-universal/node_modules' },
    { src: 'node_modules/systemjs/dist/s.min.js', dest: 'build-universal/node_modules/systemjs/dist' },
  ],
};

// Simple config for build modules
const configs = [
  {
    input: ['metrix-components/chart-bar/index.js', 'metrix-components/chart-line/index.js'],

    output: {
      dir: 'dist/',
      format: 'es',
    },
    plugins: [
      resolve(),
      minifyHTML(),
      babel({
        exclude: 'node_modules/**',
      }),
      copy(copyConfig),
      multiInput(),
      commonjs({ include: './node_modules/**' }),
      uglify(),
    ],
    preserveEntrySignatures: false,
  },
];

configs.map(config => {
  if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(terser());
  }
  config.plugins.push(filesize(filesizeConfig));
});

export default configs;
