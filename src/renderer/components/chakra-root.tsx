/**
 * Chakra UI higher order component.
 *
 * @module
 */
import React from 'react';
import { appTheme } from '@app/renderer/lib';
import {
  theme as baseTheme,
  ChakraProvider,
  ColorModeScript,
  createLocalStorageManager,
  extendTheme,
} from '@chakra-ui/react';

/**
 * Exports this module.
 *
 * @component
 * @param props The component props.
 * @param props.id The id of the window.
 * @param props.theme The chakra theme object.
 * @param props.children Children to render.
 * @exports
 */
export default function (props: {
  id: string;
  theme?: Record<string, unknown>;
  children: React.ReactNode;
}) {
  // register this window's chakra theme key which allows each
  // window to maintain and persist its own chosen color mode.
  const themeKey = props.id + '--color-mode';

  return (
    <React.Fragment>
      <ColorModeScript initialColorMode={baseTheme.config.initialColorMode} storageKey={themeKey} />
      <ChakraProvider
        colorModeManager={createLocalStorageManager(themeKey)}
        theme={extendTheme(props.theme || appTheme)}
      >
        {props.children}
      </ChakraProvider>
    </React.Fragment>
  );
}
