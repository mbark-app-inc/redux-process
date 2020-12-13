# Redux Process
> An object oriented redux wrapper for writing maintainable actions and reducers at scale.

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

Redux process removes the need to maintain your redux reducer and actions in two different locations. Avoid the confusion when making updates to your redux suite. This package is great for large enterprise applications or small weekender projects.

## Installation

Redux Process uses `redux` and `redux-thunk` under the hood for processing.

```sh
npm install ts-redux-process --save
```

## Usage example

There are three parts to Redux Process: `ReduxProcessStore`, `ReduxProcessGroup` and a `ReduxProcess`. Multiple `ReduxProcess` belong to a `ReduxProcessGroup`. `ReduxProcessGroup`s are added to the ReduxProcessStore for processing. This enables dynamic reducers.

See [docs/](https://github.com/Olencki-Development/redux-process/tree/main/docs) for documentation of each component and advanced usage.

See the [example/](https://github.com/Olencki-Development/redux-process/tree/main/example) folder for javascript and typescript examples.

## Development setup

The package is written in typescript and javascript.

```sh
npm install
npm test
```

## Release History

See [CHANGELOG.md](https://github.com/Olencki-Development/redux-process/blob/main/CHANGELOG.md) for more information.

## Meta

Brian Olencki – [brian.olencki.com](https://brian.olencki.com)

Distributed under the MIT license. See [LICENSE](https://github.com/Olencki-Development/redux-process/blob/main/LICENSE) for more information.

[https://github.com/Olencki-Development/redux-process](https://github.com/Olencki-Development/redux-process)

## Contributing

1. Fork it (<https://github.com/Olencki-Development/redux-process/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/ts-redux-process.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ts-redux-process
[npm-downloads]: https://img.shields.io/npm/dm/ts-redux-process.svg?style=flat-square
