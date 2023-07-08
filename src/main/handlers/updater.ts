/**
 * IPC handlers for interfacing with Electron's auto-updater.
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/updates
 * @module
 */
import log from 'electron-log';
import is from 'electron-is';
import AppInfo from 'package.json';
import { app, autoUpdater, ipcMain } from 'electron';
import { IPCRoute } from '@app/shared/constants';

/**
 * Repo information extracted from the package info file.
 *
 * @constant
 */
const repoInfo = AppInfo.homepage.match(/github\.com\/(?<owner>\w+)\/(?<repo>.+)/);

/**
 * Register the IPC event handlers.
 *
 * @function
 */
export default function () {
  ipcMain.on(IPCRoute.UPDATER_INSTALL, () => autoUpdater.quitAndInstall());

  ipcMain.on(IPCRoute.UPDATER_START, (event) => {
    // bail early if we're in dev mode
    if (is.dev()) {
      event.reply(IPCRoute.UPDATER_NO_UPDATE);
      return;
    }

    // configures the auto updater
    autoUpdater.setFeedURL({
      url:
        'https://update.electronjs.org/' +
        `${repoInfo.groups.owner}/${repoInfo.groups.repo}` +
        `${process.platform}-${process.arch}/${app.getVersion()}`,
    });

    // start checking for updates
    log.info('Checking for updates: %s', autoUpdater.getFeedURL());
    autoUpdater.checkForUpdates();

    // register the auto updater event handlers
    autoUpdater.on('checking-for-update', () => event.reply(IPCRoute.UPDATER_CHECKING));
    autoUpdater.on('update-not-available', () => event.reply(IPCRoute.UPDATER_NO_UPDATE));
    autoUpdater.on('update-available', () => event.reply(IPCRoute.UPDATER_DOWNLOADING));
    autoUpdater.on('update-downloaded', () => event.reply(IPCRoute.UPDATER_FINISHED));

    // error event handler
    autoUpdater.on('error', (message) => log.error(message));
  });
}
