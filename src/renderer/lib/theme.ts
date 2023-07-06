/**
 * Chakra UI customizations.
 *
 * @see https://chakra-ui.com/docs/styled-system/customize-theme
 * @module
 */
import {
  ComponentMultiStyleConfig,
  ComponentStyleConfig,
  SystemStyleObject,
} from '@chakra-ui/react';

/**
 * Custom chakra component.
 *
 * @name FrostedGlass
 * @constant
 */
const FrostedGlass: ComponentStyleConfig = {
  baseStyle: {
    backdropFilter: 'blur(10px)',
    boxShadow: 'lg',
  },
};

/**
 * Custom chakra component.
 *
 * @name CountrySelect
 * @constant
 */
const CountrySelect: ComponentMultiStyleConfig = {
  parts: ['control', 'input', 'menu', 'option', 'singleValue'],
  baseStyle: {
    control: {
      backgroundColor: 'transparent',
      borderColor: 'var(--chakra-colors-chakra-border-color)',
      borderRadius: 0,
    },
    input: {
      color: 'var(--chakra-colors-chakra-body-text)',
    },
    menu: {
      background: 'var(--chakra-colors-foreground)',
    },
    option: {
      ':hover': {
        backgroundColor: 'var(--chakra-colors-chakra-border-color)',
      },
    },
    singleValue: {
      color: 'var(--chakra-colors-chakra-body-text)',
    },
  },
};

/**
 * Chakra component override.
 *
 * @name Heading
 * @constant
 */
const Heading: ComponentStyleConfig = {
  baseStyle: {
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontWeight: 'hairline',
  },
};

/**
 * Chakra component override.
 *
 * @name Table
 * @constant
 */
const Table: ComponentStyleConfig = {
  variants: {
    simple: {
      th: {
        borderBottom: '1px',
        borderColor: 'inherit',
      },
      td: {
        borderBottom: '1px',
        borderColor: 'inherit',
      },
    },
  },
};

/**
 * Global style overrides.
 */
const GlobalOverrides: SystemStyleObject = {
  // helps reduce the "web page" feel of electron apps
  body: {
    backgroundColor: 'foreground',
    height: '100vh',
    overflow: 'hidden',
  },
  '#root': {
    userSelect: 'none',
    cursor: 'default',
    height: 'full',
    backgroundColor: 'foreground',
    animation: 'fadein 0.5s',
  },

  // for smoother startups
  '@keyframes fadein': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
};

/**
 * Chakra Theme object.
 *
 * @constant
 */
const appTheme = {
  semanticTokens: {
    colors: {
      foreground: {
        _light: 'gray.50',
        _dark: 'gray.700',
      },
    },
  },
  components: {
    CountrySelect,
    FrostedGlass,
    Heading,
    Table,
  },
  styles: {
    global: GlobalOverrides,
  },
};

/**
 * Exports this module.
 *
 * @exports
 */
export default appTheme;
