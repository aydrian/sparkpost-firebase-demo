module.exports = {
  entry: __dirname + "/app/App.js",
  output: {
    path: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
}
