const common = require( './webpack.common' );
const rules = require( './webpack.rules' );


module.exports = {
  ...common,
  entry: './src/main/index.ts',
  module: { rules },
};
