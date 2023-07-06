/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @module
 */
import type { Country } from '@prisma/client';
import Select, {
  ControlProps,
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
  Props as SelectProps,
  components as SelectComponents,
} from 'react-select';
import { ComponentDefaultProps, chakra, useMultiStyleConfig } from '@chakra-ui/react';

/**
 * Country option type.
 *
 * @interface
 */
interface CountryOption extends Country {
  readonly value: number;
  readonly label: string;
}

/**
 * Convert non-chakra component to chakra-enabled
 * components to add theming support.
 *
 * @constant
 */
const CountrySelect = chakra(Select);

/**
 * Custom react select control component that
 * renders the country flag.
 *
 * @component
 * @param root0 Root prop.
 * @param root0.children Children to render.
 */
const Control = ({
  children,
  ...props
}: ControlProps<CountryOption, false, GroupBase<CountryOption>>) => {
  const [selection] = props.getValue();
  return (
    <SelectComponents.Control {...props}>
      {!!selection && (
        <span className={`fp ${selection.code.toLowerCase()}`} style={{ marginLeft: 5 }} />
      )}
      {children}
    </SelectComponents.Control>
  );
};

/**
 * Custom react select option component
 * that renders the country flag.
 *
 * @component
 * @param root0 Root props.
 * @param root0.children Children to render.
 */
const Option = ({
  children,
  ...props
}: OptionProps<CountryOption, false, GroupBase<CountryOption>>) => {
  return (
    <SelectComponents.Option {...props}>
      <span className={`fp ${props.data.code.toLowerCase()}`} style={{ marginRight: 10 }} />
      {children}
    </SelectComponents.Option>
  );
};

/**
 * Utility function that finds a country
 * from the nested Continents array.
 *
 * @function
 * @param continents The continents array.
 * @param countryId The country to look for.
 */
export function findCountryOptionByValue(
  continents: Array<GroupBase<CountryOption>>,
  countryId: number
) {
  // first find the continent the country is in
  const continent = continents.find((continent) =>
    continent.options.some((country) => country.id === countryId)
  );

  if (!continent) {
    return undefined;
  }

  // now find the country
  return continent.options.find((country) => country.id === countryId) as CountryOption;
}

/**
 * Exports this module.
 *
 * @exports
 * @param props Root props.
 */
export default function (
  props: ComponentDefaultProps & SelectProps<CountryOption, false, GroupBase<CountryOption>>
) {
  const { ...rest } = props;
  const styles = useMultiStyleConfig('CountrySelect');
  return (
    <CountrySelect
      components={{ Control, Option }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          ...(styles.control as CSSObjectWithLabel),
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          ...(styles.input as CSSObjectWithLabel),
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          ...(styles.menu as CSSObjectWithLabel),
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          ...(styles.option as CSSObjectWithLabel),
          backgroundColor: state.isSelected
            ? 'var(--chakra-colors-chakra-border-color)'
            : 'transparent',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          ...(styles.singleValue as CSSObjectWithLabel),
        }),
      }}
      {...rest}
    />
  );
}
