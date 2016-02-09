module.exports = {
  entry: __dirname + "/App/index.js",
  output: {
    path: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
}
