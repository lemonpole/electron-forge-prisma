/**
 * Exposes a cached version of the Prisma Client
 * via a getter defined in the default export.
 *
 * Allows switching between different SQLite3 databases.
 *
 * @module
 */
import fs from 'fs';
import path from 'path';
import util from 'util';
import is from 'electron-is';
import { app } from 'electron';
import { PrismaClient } from '@prisma/client';
import { Application } from '@app/shared/constants';

/**
 * Contains the pool of cached prisma clients.
 *
 * @constant
 */
const pool = [] as Array<PrismaClient>;

/**
 * Cached active database identifier.
 *
 * @inner
 */
let activeId = 0;

/**
 * Sets up the application database files
 * and initializes the Prisma client.
 *
 * @function
 * @param id The database to connect with.
 */
function connect(id = activeId) {
  // return cached client if already connected to provided
  // db otherwise dereference the existing one
  if (pool[id] && activeId === id) {
    return pool[id];
  } else {
    delete pool[activeId];
  }

  // set up db paths
  const localDBName = util.format(Application.DB_NAME_FORMAT, 0);
  const targetDBName = util.format(Application.DB_NAME_FORMAT, id);
  const targetDBPath = path.join(app.getPath('userData'), 'databases', targetDBName);
  const localDBPath = is.dev()
    ? path.join(__dirname, '../../src/main/prisma/databases', localDBName)
    : path.join(process.resourcesPath, 'databases', localDBName);

  // copy the local db over to the app directory
  // if it doesn't already exist
  if (!fs.existsSync(path.dirname(targetDBPath))) {
    fs.mkdirSync(path.dirname(targetDBPath));
  }

  if (!fs.existsSync(targetDBPath)) {
    fs.copyFileSync(localDBPath, targetDBPath);
  }

  // initialize the new client
  pool[id] = new PrismaClient({
    datasources: {
      db: {
        url: `file:${targetDBPath}`,
      },
    },
  });

  // update the active db id
  activeId = id;
  return pool[id];
}

/**
 * Exports this module.
 *
 * @exports
 */
export default {
  connect,
  get prisma() {
    return connect();
  },
  get basePath() {
    return path.join(app.getPath('userData'), 'databases');
  },
};
