const common = require( './webpack.common' );
const rules = require( './webpack.rules' );
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  ...common,
  entry: './src/main/index.ts',
  module: { rules },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: './node_modules/.prisma/client' }],
    }),
  ]
};
