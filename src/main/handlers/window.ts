/**
 * BrowserWindow IPC handlers.
 *
 * @module
 */
import { ipcMain } from 'electron';
import { WindowManager } from '@app/main/lib';
import { IPCRoute } from '@app/shared/constants';

/**
 * Register the IPC event handlers.
 *
 * @function
 */
export default function () {
  ipcMain.on(IPCRoute.WINDOW_CLOSE, (_, id) => WindowManager.get(id).close());
  ipcMain.on(IPCRoute.WINDOW_OPEN, (_, id) => WindowManager.get(id));
  ipcMain.on(IPCRoute.WINDOW_SEND, (_, id: string, data) => {
    WindowManager.get(id).webContents.send(IPCRoute.WINDOW_SEND, data);
  });
}
