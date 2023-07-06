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
import { WindowIdentifier } from '@app/shared/constants';
import { sleep } from '@app/shared/util';
import { appTheme } from '@app/renderer/lib';
import { ChakraRoot } from '@app/renderer/components';
import { Center, ThemeConfig, extendTheme } from '@chakra-ui/react';

/**
 * Status messages
 *
 * @enum
 */
enum Status {
  Connecting = 'Connecting to database...',
  Connected = 'Connected.',
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
  const [status, setStatus] = React.useState(Status.Connecting);

  React.useEffect(() => {
    api.database
      .connect()
      .then(() => sleep(2000))
      .then(() => {
        setStatus(Status.Connected);
        return Promise.resolve();
      })
      .then(() => sleep(2000))
      .then(() => {
        api.window.open(WindowIdentifier.Main);
        api.window.close(WindowIdentifier.Splash);
      });
  }, []);

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
