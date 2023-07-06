/**
 * The application's main entrypoint.
 *
 * @module
 */
import is from 'electron-is';
import log from 'electron-log';
import * as IPCHandlers from '@app/main/handlers';
import { app, BrowserWindow } from 'electron';
import { Application } from '@app/shared/constants';
import { WindowManager } from '@app/main/lib';

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 *
 * Some APIs can only be used after this event occurs.
 *
 * @function
 */
function handleOnReady() {
  // register all ipc handlers before creating the app window
  Object.values(IPCHandlers).forEach((handler) => handler());
  WindowManager.get(WindowManager.WINDOW_CONFIGS.splash.id);
}

/**
 * Quit when all windows are closed, except on macOS.
 * There, it's common for applications and their
 * menu bar to stay active until the user quits
 * explicitly with Cmd + Q.
 *
 * @function
 */
function handleAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

/**
 * On OS X it's common to re-create a window in the app when the
 * dock icon is clicked and there are no other windows open.
 *
 * @function
 */
function handleOnActivate() {
  if (BrowserWindow.getAllWindows().length === 0) {
    WindowManager.get(WindowManager.WINDOW_CONFIGS.main.id);
  }
}

/**
 * Self-invoking bootstrapping logic.
 *
 * @function anonymous
 */
(async () => {
  // control logging level via environment variable.
  if (process.env.LOG_LEVEL) {
    log.transports.console.level = process.env.LOG_LEVEL as log.LevelOption;
    log.transports.file.level = process.env.LOG_LEVEL as log.LevelOption;
  } else if (is.production()) {
    log.transports.console.level = Application.LOGGING_LEVEL as log.LevelOption;
    log.transports.file.level = Application.LOGGING_LEVEL as log.LevelOption;
  }

  // disable insecure warnings in dev since
  // we use HMR and it only supports http
  if (is.dev()) {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  }

  // handle window lifecycle events
  app.on('ready', handleOnReady);
  app.on('window-all-closed', handleAllClosed);
  app.on('activate', handleOnActivate);
})();
