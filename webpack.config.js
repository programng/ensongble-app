const path = require('path')

module.exports = {
  context: __dirname,
  entry: './src/Main.jsx',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/dist/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.jsx$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  }
}
