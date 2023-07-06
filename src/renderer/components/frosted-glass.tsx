/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @module
 */
import { useStyleConfig, ComponentDefaultProps, Stack } from '@chakra-ui/react';

/**
 * Exports this module.
 *
 * @component
 * @param props Root props.
 * @exports
 */
export default function (props: ComponentDefaultProps) {
  const { children, ...rest } = props;
  const styles = useStyleConfig('FrostedGlass');

  return (
    <Stack sx={styles} {...rest}>
      {children}
    </Stack>
  );
}
