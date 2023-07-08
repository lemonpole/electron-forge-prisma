/**
 * The application's splash window is shown while connecting
 * to the database and checking for database updates.
 *
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import type { Engine, IOptions, RecursivePartial } from 'tsparticles-engine';
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { loadSnowPreset } from 'tsparticles-preset-snow';
import { IPCRoute, WindowIdentifier } from '@app/shared/constants';
import { sleep } from '@app/shared/util';
import { appTheme } from '@app/renderer/lib';
import { ChakraRoot } from '@app/renderer/components';
import { Center, ThemeConfig, extendTheme } from '@chakra-ui/react';

/**
 * Database status messages.
 *
 * @enum
 */
enum DatabaseStatus {
  Connecting = 'Connecting to database...',
  Connected = 'Connected.',
}

/**
 * Updater status messages.
 *
 * @enum
 */
enum UpdaterStatus {
  Checking = 'Checking for updates...',
  Downloading = 'Downloading update...',
  Finished = 'Download finished.',
  NoUpdates = 'No updates available.',
}

/**
 * Particles Config
 *
 * @constant
 */
const particlesConfig: RecursivePartial<IOptions> = {
  preset: 'snow',
  background: {
    opacity: 0,
  },
  particles: {
    size: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },
  },
};

/**
 * Chakra theme config.
 *
 * @constant
 */
const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

/**
 * The index component
 *
 * @component
 */
function Index() {
  const [status, setStatus] = React.useState<DatabaseStatus | UpdaterStatus>(
    UpdaterStatus.Checking
  );

  // the updater is heavily event-driven so wrap it in a promise
  // to hold the app here while it runs through its lifecycle
  React.useEffect(() => {
    sleep(2000).then(
      () =>
        new Promise((resolve) => {
          api.updater.start();
          api.updater.on(IPCRoute.UPDATER_NO_UPDATE, () =>
            resolve(setStatus(UpdaterStatus.NoUpdates))
          );
          api.updater.on(IPCRoute.UPDATER_DOWNLOADING, () => setStatus(UpdaterStatus.Downloading));
          api.updater.on(IPCRoute.UPDATER_FINISHED, () =>
            resolve(setStatus(UpdaterStatus.Finished))
          );
        })
    );
  }, []);

  // if there was an update download then
  // trigger a restart of the application
  React.useEffect(() => {
    if (status !== UpdaterStatus.Finished) {
      return;
    }

    api.updater.install();
  }, [status]);

  // if no updates were downloaded, we can
  // proceed connecting to the database
  React.useEffect(() => {
    if (status !== UpdaterStatus.NoUpdates) {
      return;
    }

    sleep(2000)
      .then(() => {
        setStatus(DatabaseStatus.Connecting);
        return sleep(2000);
      })
      .then(() => api.database.connect())
      .then(() => sleep(2000))
      .then(() => {
        return Promise.resolve(setStatus(DatabaseStatus.Connected));
      })
      .then(() => sleep(2000))
      .then(() => {
        api.window.open(WindowIdentifier.Main);
        api.window.close(WindowIdentifier.Splash);
      });
  }, [status]);

  // initialize particles engine
  const particlesInit = React.useCallback(async (engine: Engine) => {
    await loadSnowPreset(engine);
    await loadFull(engine);
  }, []);

  return (
    <React.StrictMode>
      <Particles init={particlesInit} options={particlesConfig} />
      <ChakraRoot
        id={WindowIdentifier.Splash}
        theme={extendTheme({ ...appTheme, config: themeConfig })}
      >
        <Center h="100%" bgSize="cover" bgPos="center">
          <h1>{status}</h1>
        </Center>
      </ChakraRoot>
    </React.StrictMode>
  );
}

/**
 * React bootstrapping logic.
 *
 * @function
 * @name anonymous
 */
(() => {
  // grab the root container
  const container = document.getElementById('root');

  if (!container) {
    throw new Error('Failed to find the root element.');
  }

  // render the react application
  ReactDOM.createRoot(container).render(<Index />);
})();
