const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    uniqueName: "customMain",
    publicPath: "auto",
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
module: {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      use: "babel-loader",
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader"
      ]
    }
  ]
},

  plugins: [
        new ModuleFederationPlugin({
      name: "customMain",
      filename: "remoteEntry.js", // ensure remoteEntry is emitted and served
      remotes: {
        userManagement: "userManagement@http://localhost:5001/remoteEntry.js"
      },
      exposes: {
        "./TailwindStyles": "./src/styles.css"
      },
      shared: {
        react: { 
          singleton: true, 
          eager: true,
          strictVersion: false,
          requiredVersion: "^18.2.0 || ^19.0.0" 
        },
        "react-dom": { 
          singleton: true, 
          eager: true,
          strictVersion: false,
          requiredVersion: "^18.2.0 || ^19.0.0" 
        },
        "@babel/core": { singleton: true, eager: true, strictVersion: false },
        "@babel/preset-env": { singleton: true, eager: true, strictVersion: false },
        "@babel/preset-react": { singleton: true, eager: true, strictVersion: false },
        "@babel/preset-typescript": { singleton: true, eager: true, strictVersion: false },
        "babel-loader": { singleton: true, eager: true, strictVersion: false },
        "typescript": { singleton: true, eager: true, strictVersion: false },
        "css-loader": { singleton: true, eager: true, strictVersion: false },
        "style-loader": { singleton: true, eager: true, strictVersion: false },
        "postcss-loader": { singleton: true, eager: true, strictVersion: false },
        "postcss": { singleton: true, eager: true, strictVersion: false },
        "tailwindcss": { singleton: true, eager: true, strictVersion: false },
        "autoprefixer": { singleton: true, eager: true, strictVersion: false }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    port: 5000,
    open: false,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
