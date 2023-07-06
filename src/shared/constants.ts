/**
 * Shared constants and enums between main and renderer process.
 *
 * It is important to be careful with not importing any packages
 * specific to either platform as it may cause build failures.
 *
 * @module
 */

/**
 * Generic settings and configuration.
 *
 * @enum
 */
export enum Application {
  DB_NAME_FORMAT = 'save_%s.db',
  LOGGING_LEVEL = 'error',
}

/**
 * Browser Window unique identifier names.
 *
 * @enum
 */
export enum WindowIdentifier {
  Main = 'main',
  Splash = 'splash',
  Threading = 'threading',
}

/**
 * IPC listener route names.
 *
 * @enum
 */
export enum IPCRoute {
  APP_INFO = '/application/info',
  CONTINENTS_ALL = '/continents/all',
  COUNTRIES_CREATE = '/countries/create',
  DATABASE_CONNECT = '/database/connect',
  DATABASE_DISCONNECT = '/database/disconnect',
  WINDOW_CLOSE = '/window/close',
  WINDOW_SEND = '/window/send',
  WINDOW_OPEN = '/window/open',
}

/**
 * Types of threading targets, or functions
 * that will run in their own thread.
 *
 * @enum
 */
export enum ThreadingTarget {
  FIBONACCI = 'fibonacci',
  LISTING = 'listing',
}

/**
 * Threading status types.
 *
 * @enum
 */
export enum ThreadingStatus {
  COMPLETED = 'completed',
  FAILED = 'failed',
  RUNNING = 'running',
}
