const path = require('path');

module.exports = (env) => {
  const entryName = env.module;

  return {
    entry: {
      entryName: `./src/${entryName}/index.js`,
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    mode: 'development',
    resolve: {
      modules: [path.resolve(__dirname), 'node_modules'],
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
              ],
            },
          },
          include: [path.resolve(__dirname, 'src/**/*.js')],
          exclude: '/node_modules/',

        },
      ],
    },
    devServer: {
      open: true,
      hot: true,
    },
  };
};
