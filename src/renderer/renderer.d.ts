// This allows TypeScript to pick up the magic constants that are
// auto-generated by Electron's `contextBridge` interface.

declare const api: typeof import('./lib/api').default;

declare module '*.png' {
  const src: string;
  export default src;
}
