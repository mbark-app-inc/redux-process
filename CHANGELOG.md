# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2021-02-12
### Added
- Global error transformer for ReduxProcessStore

## [1.1.2] - 2020-12-13
### Changed
- Transfer ownership to Olencki Development
  - Update all references to new github repo link

## [1.1.1] - 2020-10-20
### Changed
- Fix issue where default state is not present upon initial read

## [1.1.0] - 2020-10-17
### Changed
- Modify README.md for corrected install command
### Added
- `ReduxProcessStore` class with `IReduxProcessStore` interface
- Add documentation for `ReduxProcessStore`

## [1.0.1] - 2020-10-17
### Changed
- Modify `ReduxProcessGroup::getReduxProcessOptions` signature with optional store property.
- Modify name of generic in `ReduxProcessGroup` for consistency between itself and `ReduxProcess`
### Added
- Add documentation for `ReduxProcess` & `ReduxProcessGroup`

## [1.0.0] - 2020-10-16
### Added
- `ReduxProcess` class with `IReduxProcess` interface
- `ReduxProcessGroup` class with `IReduxProcessGroup` interface
- Add javascript example
- Add typescript example
