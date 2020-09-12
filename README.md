# Sound of Code

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Sound of Code sonifies JavaScript. It enables you to hear your code!

[Demo for DS 2017-2018](https://raikesschoolds.github.io/cse-cohen/)

## Vision

The goal of this project is to recreate the core of the `CodeMusic` program in a way that preserves its visualization of the program and maintains/enhances its speed and parsing ability; it will successfully work on a JavaScript program for debugging purposes through a web interface.

## Release Log

[RELEASE.md](RELEASE.md)

## Scripts

Ensure that all dependencies are installed. (Just run `npm install`. No packages are needed to be installed globally.)

All defined in the `scripts` section of `package.json`

- `npm run build` - Builds a production version. Specifically for publishing purposes.
- `npm run dev` - Builds development version and watches files for changes. For development use only!
- `npm run format` - Formats source code
- `npm run format:docs` - Formats documentation files
- `npm run format:styles` - Formats stylesheets
- `npm run lint` - Lints source code for Standard Style formatting
- `npm run lint:types` - Type checks the source code using TypeScript
- `npm test` - Runs linter and unit tests

Resources, API descriptions, and other documents related to packages in use are linked in [`docs/package-resources.md`](docs/package-resources.md).

For more information about the development environment, please refer to [`docs/development`](docs/development.md).

## Directories

- [`docs`](./docs/README.md) - Contains documentation
- `src` - Contains the source code for the application
- `static` - Contains assets used on the site
- `test` - Contains all unit tests to run

## Workflow Description

The `master` branch will hold the stable release.

The `develop` branch will hold the current release in progress. Additional branches must branch from and merge into the `develop` branch.

_Note_: Use the command `git checkout -b <new-branch-name>` to do both `branch` and `checkout` commands. (This avoids accidental pushes to the `master` or `develop` branches.)
