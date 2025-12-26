const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;

  // Centralized remote configuration
  const REMOTES = {
    userManagement: { subdomain: 'user', port: 5001 },
    postClearanceAudit: { subdomain: 'post', port: 5002 },
    licenseManagement: { subdomain: 'license', port: 5003 },
    eAuctionManagement: { subdomain: 'auction', port: 5004 }
  };

  // Generate remote entries
  const remotes = Object.entries(REMOTES).reduce((acc, [name, config]) => {
    const url = isProduction 
      ? `https://${config.subdomain}.shoaibarif.site/remoteEntry.js`
      : `http://localhost:${config.port}/remoteEntry.js`;
    acc[name] = `${name}@${url}`;
    return acc;
  }, {});

  // Shared configuration factory
  const createSharedConfig = (packages) => 
    packages.reduce((acc, pkg) => {
      acc[pkg] = { singleton: true, eager: true, strictVersion: false };
      return acc;
    }, {});

  return {
    mode: argv.mode || "development",
    entry: "./src/index.tsx",
    
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash:8].js" : "[name].bundle.js",
      chunkFilename: isProduction ? "[name].[contenthash:8].chunk.js" : "[name].chunk.js",
      uniqueName: "customMain",
      publicPath: "auto",
      clean: true
    },
    
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@shared': path.resolve(__dirname, 'src/components/shared'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@types': path.resolve(__dirname, 'src/types'),
      }
    },
    
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        }
      ]
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "customMain",
        filename: "remoteEntry.js",
        remotes,
        exposes: {
          "./TailwindStyles": "./src/styles.css",
          "./components/shared": "./src/components/shared/index.ts",
          "./store": "./src/store/index.ts",
          "./store/hooks": "./src/store/hooks.ts",
          "./store/slices/userSlice": "./src/store/slices/userSlice.ts",
          "./store/slices/counterSlice": "./src/store/slices/counterSlice.ts"
        },
        shared: {
          react: { 
            singleton: true, 
            eager: true,
            requiredVersion: "^18.2.0 || ^19.0.0" 
          },
          "react-dom": { 
            singleton: true, 
            eager: true,
            requiredVersion: "^18.2.0 || ^19.0.0" 
          },
          "react-redux": { singleton: true, eager: true },
          "@reduxjs/toolkit": { singleton: true, eager: true },
          ...createSharedConfig([
            "@babel/core",
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
            "babel-loader",
            "typescript",
            "css-loader",
            "style-loader",
            "postcss-loader",
            "postcss",
            "tailwindcss",
            "autoprefixer"
          ])
        }
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      })
    ],
    
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          shared: {
            test: /[\\/]src[\\/]components[\\/]shared[\\/]/,
            name: 'shared-components',
            priority: 5,
            reuseExistingChunk: true,
          }
        }
      }
    },
    
    devServer: {
      port: 5000,
      open: false,
      hot: true,
      historyApiFallback: true,
      compress: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    
    devtool: isDevelopment ? 'eval-source-map' : 'source-map'
  };
};
