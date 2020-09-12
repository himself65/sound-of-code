# Release

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

### Changes

- Add `axios`
- Add initial implementation of variable type tracking
- Add Preferences page with initial layout and limited functionality
- Add sort examples
- Add `@reach/router` for accessible routing
- Add `prerender-spa-plugin`
- Add `babel-preset-stage-3`
- Add `typescript` type checking to test script
- Swap `ace` module to `brace`
- Add complex volume system to adjust volumes for each distinct sound
- Swap test framework from `mocha` to `jest`
- Adjust pages to be lazyloaded on each route
- Rework weaver module to handle complex JS inputs
- Disable Editor when the user program is running
- Update dependencies

## [1.5.0] - 2018-04-17

### Changes

- Update tutorial page gifs
- Sound table now with colors
- Update images in the about page

### Fixed

- Breakpoint related bugs
- Switching themes while running the program will now stop loops from running forever

## [1.4.0] - 2018-03-13

### Added

- Initial function functionality
- 2 new sound themes
- Sound theme switching functionality
- Starting at other lines functionaltiy
- New tutorial section describing fixing user errors
- Images for all developers and other members
- Added new JavaScript resources page
- Add project description to page

### Fixed

- Fix browser audio compatibility by switching to `mp3` format
- Sound synchronization
- Security issue regarding setting `window.href.location`
- Fix operator sound functionality

## [1.3.0] - 2018-02-06

### Added

- Virtual Console log
- Display runtime/parser errors
- Ending sound when the program runs to completion
- Save-to-file functionality
- Support for Do-While loops
- Resources page for learning about JavaScript
- Tutorial page for using the program
- Initial form of telemetry

### Fixed

- Audio file encoding error by converting all sounds to .ogg format
- Pausing in loops now stops the loop sounds

## [1.2.0] - 2017-12-07

### Added

- Add noise for runtime errors
- Add program file saving and loading functionality
- Play sounds on expression statements
  - Checks the data type dynamically
- Add support for with, for-in, ternary, and switch statements
- Add support for multiple sounds per line
- Add SoundManager to enable multiple sounds to play simultaneously

## [1.1.0] - 2017-10-31

### Added

- New debugger to execute the JavaScript input and reports line coverage
- Parser now recognizes For and While statements
- Player UI
  - Play, Pause, or Stop the sonification program
  - Speed slider to affect sound and execution timings
  - Volume slider to affect sound volume
- Add examples program buttons to load into the editor
- Add table to show the data types and their respective sounds

### Changed

- Moved visualization to debugger from parser

### Fixed

- Visualization stays consistent between multiple calls

## [1.0.0] - 2017-10-06

### Added

- JavaScript code parsing
- Code sonification based on static analysis
- Visualization within the text editor
