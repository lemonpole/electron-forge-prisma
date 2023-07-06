/**
 * QoL module to help with browser window management.
 *
 * @module
 */
import { BrowserWindow, Menu, MenuItem } from 'electron';
import { WindowIdentifier } from '@app/shared/constants';

/**
 * Menu Item identifier enum.
 *
 * @enum
 */
export enum MenuItemIdentier {
  APPNAME = 0,
  FILE = 1,
  EDIT = 2,
  VIEW = 3,
  WINDOW = 4,
  HELP = 5,
}

/**
 * @interface
 */
interface WindowConfig {
  id: string;
  url: string;
  options: Electron.BrowserWindowConstructorOptions;
}

/**
 * BrowserWindow base configuration.
 *
 * @constant
 */
const baseWindowConfig: Electron.BrowserWindowConstructorOptions = {
  backgroundColor: 'whitesmoke',
  webPreferences: {
    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
  },
};

/**
 * BrowserWindow shared configurations.
 *
 * @constant
 */
const sharedWindowConfigs: Record<string, Electron.BrowserWindowConstructorOptions> = {
  frameless: {
    ...baseWindowConfig,
    frame: false,
    maximizable: false,
    resizable: false,
    movable: false,
    minimizable: false,
  },
};

/**
 * Contains a collection of the BrowserWindow instances created.
 *
 * Each instance is stored by a unique name
 * so it can later be retrieved on by name.
 *
 * @constant
 */
const windows: Record<string, Electron.BrowserWindow> = {};

/**
 * Holds application window configs.
 *
 * @constant
 */
const WINDOW_CONFIGS: Record<string, WindowConfig> = {
  [WindowIdentifier.Main]: {
    id: WindowIdentifier.Main,
    url: MAIN_WINDOW_WEBPACK_ENTRY,
    options: {
      ...baseWindowConfig,
      height: 600,
      width: 800,
    },
  },
  [WindowIdentifier.Splash]: {
    id: WindowIdentifier.Splash,
    url: SPLASH_WINDOW_WEBPACK_ENTRY,
    options: {
      ...sharedWindowConfigs.frameless,
      height: 400,
      width: 300,
    },
  },
  [WindowIdentifier.Threading]: {
    id: WindowIdentifier.Threading,
    url: THREADING_WINDOW_WEBPACK_ENTRY,
    options: {
      height: 384,
      width: 512,
      x: 0,
      y: 0,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
      },
    },
  },
};

/**
 * Creates the BrowserWindow. Re-uses existing
 * window if it has already been created.
 *
 * @function
 * @param id      The unique identifier for the window.
 * @param url     The url to the window's html page.
 * @param options Browser Window options object.
 */
function create(id: string, url: string, options: Electron.BrowserWindowConstructorOptions) {
  // if the provided screen id already exists with
  // an active handle then return that instead
  if (windows[id]) {
    return windows[id];
  }

  // configure base application menu if this
  // is the first window being created
  if (Object.keys(windows).length === 0) {
    Menu.getApplicationMenu().items[MenuItemIdentier.VIEW].submenu.append(
      new MenuItem({
        label: 'Threading',
        click: () => {
          get(WindowIdentifier.Threading);
        },
      })
    );
  }

  // create the browser window
  const window = new BrowserWindow(options);
  window.loadURL(url);

  // de-reference the window object when its closed
  window.on('closed', () => delete windows[id]);

  // add to the collection of window objects
  windows[id] = window;
  return window;
}

/**
 * Gets a window by specified id.
 *
 * Creates it if it does not already exist.
 *
 * @function
 * @param id The id of the window.
 */
function get(id: string) {
  if (id in windows) {
    return windows[id];
  }

  // create the window using its found config
  const config = WINDOW_CONFIGS[id];
  return create(id, config.url, config.options);
}

/**
 * Exports this module.
 *
 * @exports
 */
export default {
  create,
  get,
  WINDOW_CONFIGS,
};
