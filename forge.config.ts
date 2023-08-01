/**
 * Electron Forge main configuration object.
 *
 * @module
 */
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { ElectronMainWebpackConfig, ElectronRendererWebpackConfig } from './webpack.config';

/**
 * Electron Forge main configuration object.
 *
 * @constant
 */
const config: ForgeConfig = {
  buildIdentifier: 'alpha',
  packagerConfig: {
    appBundleId: 'io.prisma.electron-forge',
    appCopyright: 'Copyright © 2023',
    extraResource: ['./src/main/prisma/databases'],
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
      mainConfig: ElectronMainWebpackConfig,
      renderer: {
        config: ElectronRendererWebpackConfig,
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

/**
 * Exports this module.
 *
 * @exports
 */
export default config;
