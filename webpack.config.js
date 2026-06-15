/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devCerts = require('office-addin-dev-certs');

const urlDev = 'https://localhost:3000/';

// GitHub Pages用の設定
const urlProd = 'https://tanakay543.github.io/powerpoint_add/';

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

module.exports = async (env, options) => {
  const dev = options.mode === 'development';
  return {
    devtool: 'source-map',
    entry: {
      taskpane: './src/taskpane/taskpane.tsx',
      commands: './src/commands/commands.ts'
    },
    output: {
      clean: true,
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: dev ? '/' : '/powerpoint_add/',
      crossOriginLoading: 'anonymous'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: { '@': path.resolve(__dirname, 'src') }
    },
    module: {
      rules: [
        { test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' },
        { test: /\.js$/, enforce: 'pre', use: ['source-map-loader'] },
        { test: /\.html$/, use: 'html-loader' },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, type: 'asset/resource' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'taskpane.html',
        template: './src/taskpane/index.html',
        chunks: ['taskpane'],
        scriptLoading: 'defer',
        inject: 'body',
        crossorigin: 'anonymous'
      }),
      new HtmlWebpackPlugin({
        filename: 'commands.html',
        template: './src/commands/commands.html',
        chunks: ['commands'],
        scriptLoading: 'defer',
        inject: 'body',
        crossorigin: 'anonymous'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets', to: 'assets', noErrorOnMissing: true },
          { from: 'index.html', to: 'index.html', noErrorOnMissing: true },
          {
            from: 'manifest*.xml',
            to: '[name][ext]',
            transform(content) {
              if (dev) return content;
              return content.toString().replace(new RegExp(urlDev, 'g'), urlProd);
            }
          }
        ]
      })
    ],
    devServer: {
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      server: { type: 'https', options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions() },
      port: process.env.npm_package_config_dev_server_port || 3000,
      client: {
        overlay: {
          errors: true,
          warnings: false  // 警告オーバーレイを無効化（Phase 0では許容）
        }
      }
    }
  };
};
