const common = require( './webpack.common' );
const plugins = require( './webpack.plugins' );
const rules = require( './webpack.rules' );


rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' }
  ],
});


rules.push({
  test: /(\.png)$/,
  type: 'asset/inline',
});


module.exports = {
  ...common,
  module: { rules },
  plugins: plugins,
};
