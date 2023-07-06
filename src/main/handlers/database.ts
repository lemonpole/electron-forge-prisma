/**
 * Database IPC handlers.
 *
 * @module
 */
import { ipcMain } from 'electron';
import { DatabaseClient } from '@app/main/lib';
import { IPCRoute } from '@app/shared/constants';
import { sleep } from '@app/shared/util';

/**
 * Register the IPC event handlers.
 *
 * @function
 */
export default function () {
  // database connection handlers with faux timeout
  ipcMain.handle(IPCRoute.DATABASE_CONNECT, (_, id?: string) =>
    sleep(2000).then(() => {
      DatabaseClient.connect(parseInt(id) || 0);
      return Promise.resolve();
    })
  );
  ipcMain.handle(IPCRoute.DATABASE_DISCONNECT, () =>
    sleep(2000).then(() => DatabaseClient.prisma.$disconnect())
  );

  // generic database query handlers
  ipcMain.handle(IPCRoute.CONTINENTS_ALL, () =>
    DatabaseClient.prisma.continent.findMany({ include: { countries: true } })
  );
}
