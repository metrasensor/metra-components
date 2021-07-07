import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';


const babelConfig = {
    babelrc: false,
    ...{
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        ie: '11',
                    },
                },
            ],
        ],
    },
};

const filesizeConfig = {
    showGzippedSize: true,
    showBrotliSize: false,
    showMinifiedSize: false,
};
const copyConfig = {
    targets: [
        {src: 'node_modules/@webcomponents', dest: 'build-universal/node_modules'},
        {src: 'node_modules/systemjs/dist/s.min.js', dest: 'build-universal/node_modules/systemjs/dist'},
    ],
}
const configs = [
    // The main JavaScript bundle for older browsers that don't support
    // JavaScript modules or ES2015+.
    {
        input: ['src/index.js'],
        output: {
            dir: 'dist/',
            format: 'es',
        },
        plugins: [
            minifyHTML(),
            babel(babelConfig),
            resolve(),
            copy(copyConfig),
        ],
        preserveEntrySignatures: false,
    },
    // Babel polyfills for older browsers that don't support ES2015+.
    {
        input: './babel-polyfills-nomodule.js',
        output: {
            file: 'dist/babel-polyfills-nomodule.js',
            format: 'iife',
        },
        plugins: [commonjs({include: ['node_modules/**']}), resolve()],
    },
];

for (const config of configs) {
    if (process.env.NODE_ENV !== 'development') {
        config.plugins.push(terser());
    }
    config.plugins.push(filesize(filesizeConfig));
}

export default configs;
