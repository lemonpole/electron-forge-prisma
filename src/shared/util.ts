/**
 * Implementation of sleep with promises.
 *
 * @function
 * @param ms Time in milliseconds to sleep for.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
