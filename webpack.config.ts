/**
 * Webpack configuration for Electron's
 * main and renderer processes.
 *
 * @module
 */
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import type { Configuration, ModuleOptions } from 'webpack';

/**
 * Webpack shared configuration.
 *
 * @constant
 */
const WebpackSharedConfig: Partial<Configuration> = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@app': path.resolve(__dirname, 'src'),
      'package.json': path.resolve(__dirname, 'package.json'),
    },
  },
};

/**
 * Webpack module rules.
 *
 * @constant
 */
const WebpackRulesConfig: Required<ModuleOptions>['rules'] = [
  {
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    exclude: /\.prisma/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
];

/**
 * Webpack configuration options for
 * the main Electron process.
 *
 * @constant
 */
export const ElectronMainWebpackConfig: Configuration = {
  ...WebpackSharedConfig,
  entry: './src/main/index.ts',
  module: { rules: WebpackRulesConfig },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './node_modules/.prisma/client' }],
    }),
  ],
};

/**
 * Webpack configuration options for
 * the renderer Electron process.
 *
 * @constant
 */
export const ElectronRendererWebpackConfig: Configuration = {
  ...WebpackSharedConfig,
  module: {
    rules: [
      ...WebpackRulesConfig,
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /(\.mp4|\.png)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
