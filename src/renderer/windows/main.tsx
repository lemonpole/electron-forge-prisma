/**
 * The application's main window.
 *
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WindowIdentifier } from '@app/shared/constants';
import { appTheme } from '@app/renderer/lib';
import { ChakraRoot, CountrySelect } from '@app/renderer/components';
import { Input, Stack, ThemeConfig, extendTheme } from '@chakra-ui/react';
import 'flagpack/dist/flagpack.css';

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
  const [continents, setContinents] = React.useState<
    Awaited<ReturnType<typeof api.continents.all>>
  >([]);
  const [country, setCountry] = React.useState<number>(null);

  React.useEffect(() => {
    api.continents.all().then(setContinents);
  }, []);

  // load country data
  const countrySelectorData = React.useMemo(() => {
    return continents.map((continent) => ({
      label: continent.name,
      options: continent.countries.map((country) => ({
        ...country,
        value: country.id,
        label: country.name,
      })),
    }));
  }, [continents]);

  return (
    <ChakraRoot
      id={WindowIdentifier.Main}
      theme={extendTheme({ ...appTheme, config: themeConfig })}
    >
      <Stack>
        <Input readOnly value={`Selected Country Id: ${country}`} />
        <CountrySelect
          options={countrySelectorData}
          onChange={(option) => setCountry(option.value)}
        />
      </Stack>
    </ChakraRoot>
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
