module.exports = {
    entry: "./src/main.jsx",
    output: {
      path: __dirname,
      filename: "main.js",
      libraryTarget: "commonjs2"
    },
    devtool: "none",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            plugins: ["transform-react-jsx"]
          }
        },
        {
          test: /\.css$/i,
          use: ['css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './',
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
            test: /\.(png|jp(e*)g|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'images/[hash]-[name].[ext]',
                },
              },
            ],
          }
      ]
    },
    externals: {
      scenegraph: "scenegraph",
      clipboard : "clipboard",
      uxp : "uxp",
    }
  };