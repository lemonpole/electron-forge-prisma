/**
 * Electron Forge main configuration object.
 *
 * @module
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { MakerSquirrel } = require('@electron-forge/maker-squirrel');
const { MakerDMG } = require('@electron-forge/maker-dmg');
const { WebpackPlugin } = require('@electron-forge/plugin-webpack');

/**
 * Exports this module.
 *
 * @exports
 */
module.exports = {
  buildIdentifier: 'alpha',
  packagerConfig: {
    appBundleId: 'io.prisma.electron-forge',
    appCopyright: 'Copyright © 2023',
    extraResource: ['./node_modules/.prisma', './src/main/prisma/databases'],
    icon: './src/renderer/assets/icon',
  },
  makers: [
    new MakerSquirrel({
      setupIcon: './src/renderer/assets/icon.ico',
    }),
    new MakerDMG({
      icon: './src/renderer/assets/icon.ico',
    }),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig: './webpack/webpack.main.config.js',
      renderer: {
        config: './webpack/webpack.renderer.config.js',
        entryPoints: [
          {
            html: './src/renderer/assets/index.html',
            js: './src/renderer/windows/main.tsx',
            name: 'main_window',
            preload: {
              js: './src/renderer/lib/preload.ts',
            },
          },
          {
            html: './src/renderer/assets/index.html',
            js: './src/renderer/windows/splash.tsx',
            name: 'splash_window',
            preload: {
              js: './src/renderer/lib/preload.ts',
            },
          },
          {
            html: './src/renderer/assets/index.html',
            js: './src/renderer/windows/threading.tsx',
            name: 'threading_window',
            nodeIntegration: true,
          },
        ],
      },
    }),
  ],
};
