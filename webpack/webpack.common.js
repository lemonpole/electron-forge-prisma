const path = require( 'path' );


module.exports = {
  resolve: {
    extensions: [ '.js', '.ts', '.jsx', '.tsx', '.css', '.json' ],
    alias: {
      '@app': path.resolve( __dirname, '../src' ),
      'package.json': path.resolve( __dirname, '../package.json' ),
    }
  }
};
