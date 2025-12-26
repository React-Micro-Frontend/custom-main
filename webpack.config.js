const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const isProduction = process.env.NODE_ENV === 'production';

const getRemoteUrl = (subdomain, port) => {
  return isProduction 
    ? `https://${subdomain}.shoaibarif.site/remoteEntry.js`
    : `http://localhost:${port}/remoteEntry.js`;
};

module.exports = {
  mode: isProduction ? "production" : "development",
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
        userManagement: `userManagement@${getRemoteUrl('user', 5001)}`,
        postClearanceAudit: `postClearanceAudit@${getRemoteUrl('post', 5002)}`,
        licenseManagement: `licenseManagement@${getRemoteUrl('license', 5003)}`,
        eAuctionManagement: `eAuctionManagement@${getRemoteUrl('auction', 5004)}`
      },
      exposes: {
        "./TailwindStyles": "./src/styles.css",
        "./components/shared": "./src/components/shared",
        "./PageHeader": "./src/components/shared/PageHeader.tsx",
        "./StatCard": "./src/components/shared/StatCard.tsx",
        "./Card": "./src/components/shared/Card.tsx",
        "./InfoCard": "./src/components/shared/InfoCard.tsx",
        "./SearchInput": "./src/components/shared/SearchInput.tsx",
        "./Button": "./src/components/shared/Button.tsx",
        "./Avatar": "./src/components/shared/Avatar.tsx",
        "./LoadingSpinner": "./src/components/shared/LoadingSpinner.tsx",
        "./QuickLinkCard": "./src/components/shared/QuickLinkCard.tsx",
        "./store": "./src/store/index.ts",
        "./store/hooks": "./src/store/hooks.ts",
        "./store/slices/userSlice": "./src/store/slices/userSlice.ts",
        "./store/slices/counterSlice": "./src/store/slices/counterSlice.ts"
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
        "react-redux": {
          singleton: true,
          eager: true,
          strictVersion: false
        },
        "@reduxjs/toolkit": {
          singleton: true,
          eager: true,
          strictVersion: false
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
    hot:false,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
