A boilerplate project that sets up Electron and Prisma with SQLite3. Additionally, provides sample code for the following use-cases:

- Web Worker implementation with Electron using IPC handlers to simulate multi-threading.
- Display a Splash window while connecting to the database.
- Triggering queries from the renderer using IPC handlers with typescript support.
- Creating a custom Prisma seeder.

## APIs and Technologies

- Node `v18.15.x`.
- Electron `v25.x`.
- Electron Forge `v6.x`.
- [Prisma ORM](https://www.prisma.io/) `4.9.x`.
- [Chakra UI](https://chakra-ui.com/) `v2.x`.
- SQLite `v5.x`.
  - On Windows, Python `3.10` or above [is required](https://github.com/nodejs/node-gyp#on-windows).
- [WiX Toolkit `v3.x`](https://wixtoolset.org/)
  - Required on Windows for building the MSI Installer.

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

### WiX MSI

Currently, there is an issue with `electron-wix-msi@4` that does not properly launch the application. The workaround is to force a valid semver string.

```js
{
  "name": "@electron-forge/maker-wix",
  "config": {
    "version": "1.0.0" // otherwise this defaults to 1.0.0.0 which is invalid
  }
}
```

## Contributing

This project adheres to the conventional commits specification which is outlined [here](https://www.conventionalcommits.org/en/v1.0.0/#summary).
