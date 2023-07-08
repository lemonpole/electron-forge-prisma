/**
 * Electron API context bridge functions.
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/ipc#ipc-channels
 * @module
 */
import { ipcRenderer } from 'electron';
import { IPCRoute } from '@app/shared/constants';
import type { Continent, Country, PrismaClient } from '@prisma/client';
import type AppInfo from 'package.json';

/**
 * @type {CountryCreateInput}
 */
type CountryCreateInput = Parameters<PrismaClient['country']['create']>[number]['data'];

/**
 * Exports this module.
 *
 * @exports
 */
export default {
  app: {
    info: () => ipcRenderer.invoke(IPCRoute.APP_INFO) as Promise<typeof AppInfo>,
  },
  continents: {
    create: (data: CountryCreateInput) =>
      ipcRenderer.invoke(IPCRoute.COUNTRIES_CREATE, data) as Promise<Country>,
    all: () =>
      ipcRenderer.invoke(IPCRoute.CONTINENTS_ALL) as Promise<
        Array<Continent & { countries: Country[] }>
      >,
  },
  database: {
    connect: (id?: string) => ipcRenderer.invoke(IPCRoute.DATABASE_CONNECT, id),
    disconnect: () => ipcRenderer.invoke(IPCRoute.DATABASE_DISCONNECT),
  },
  updater: {
    install: () => ipcRenderer.send(IPCRoute.UPDATER_INSTALL),
    on: (eventName: string, cb: () => void) => ipcRenderer.on(eventName, cb),
    start: () => ipcRenderer.send(IPCRoute.UPDATER_START),
  },
  window: {
    close: (id: string) => ipcRenderer.send(IPCRoute.WINDOW_CLOSE, id),
    open: (id: string) => ipcRenderer.send(IPCRoute.WINDOW_OPEN, id),
    send: <T = unknown>(id: string, data: T) => ipcRenderer.send(IPCRoute.WINDOW_SEND, id, data),
  },
};
