# Developer Environment

## Recommended Code Editors

- Visual Studio Code - https://code.visualstudio.com/
- Atom - https://atom.io/

### Packages/Extentions

- Visual Studio Code
  - EditorConfig for VS Code
  - JavaScript Standard Linter
- Atom
  - linter-js-standard
  - editorconfig

## Node and NPM

Versions used during development:

- node >= v8.11.2
- npm >= v5.6.0

It's okay to have a newer version installed. NodeJS has been great with ensuring backward compatiblility.

Node.js Download: https://nodejs.org/ (Choose either the LTS version or the current version.)

### Packages and Dependencies

No packages should be installed globally.

All dependent packages are installed by running `npm install` in the project directory.

Resources, API descriptions, and other documents related to packages in use are linked in [`package-resources.md`](package-resources.md).

### Package Versions

All packages used in the project are listed within the `package.json` file.

- Development related packages are in the `devDependencies` section.
- Library packages are in the `dependencies` section.

All packages have their respective versions listed next to their name.

### Before Adding New Package

Before trying to add new packages, ensure that most of the following features hold:

The package/library...

- is actively maintained
- has a relatively small bundle size (https://bundlephobia.com/)
  - If it's large, make sure to lazy load it with the dynamic `import()` call.

### Installing New Packages

- `npm install <package-name>`
  - This is for JavaScript that's used within the application
- `npm install -D <package-name>`
  - This is for development specific JavaScript
