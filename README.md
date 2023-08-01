<img src="./src/renderer/assets/icon.png" alt="Electron Forge Prisma" width="150" height="auto" />

A boilerplate project that sets up Electron and Prisma with SQLite3.

Additional features:

- Auto updates support via [Electron autoUpdater](https://www.electronjs.org/docs/latest/tutorial/updates).
- Display a splash window while updating and connecting to the database.
- Setting a custom application icon.
- Web Worker implementation with Electron using IPC handlers to simulate multi-threading.
- Triggering queries from the renderer using IPC handlers with typescript support.
- Creating a custom Prisma seeder.

## APIs and Technologies

- Node `v18.15.x`.
- Electron `v25.x`.
- Electron Forge `v6.x`.
- [Prisma ORM](https://www.prisma.io/) `5.1.x`.
- [Chakra UI](https://chakra-ui.com/) `v2.x`.
- SQLite `v5.x`.
  - On Windows, Python `3.10` or above [is required](https://github.com/nodejs/node-gyp#on-windows).
- [Image Magick `v7.x`](https://imagemagick.org/).
  - Used to convert PNGs to ICOs for the app icon.

## Getting Started

> **NOTE**: On windows, `npm start` must be run from CMD.exe, Powershell, or WSL2. [More Info](https://www.electronforge.io/templates/typescript-+-webpack-template).

```bash
npm install
npm start
```

## Resetting the Database

A unique Prisma Client is generated from the schema defined in source control which sometimes may need to be regenerated along with the database for troubleshooting purposes.

```bash
npm run db:reset
```

## Building Distributables

Generate platform specific distributables.

[More Info](https://www.electronforge.io/config/makers).

```bash
npm run make
```

### Updating Application Icon

The installers only accept an `.ico` file so it must be manually converted from the base `assets/icon.png` image.

[More Info](https://www.electronforge.io/guides/create-and-add-icons#configuring-installer-icons).

```bash
npm run gen:icon
```
