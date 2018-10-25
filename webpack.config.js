var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
      test: /\.(css|less)$/,
      use: ["style-loader", "css-loader"]
      }
    ],
    // entry: [
    //  'script-loader!jquery/dist/jquery.min.js',
    //  'script-loader!foundation-sites/dist/foundation.min.js',
    //  'script-loader!react-datetime/dist/react-datetime.min.js',//add this line in your webpack.config file
    // './app/app.jsx'],
    // externals:{
    //   jquery:'jQuery'

    // },
  }
};

