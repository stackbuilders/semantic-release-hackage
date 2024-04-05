[![CI](https://github.com/stackbuilders/semantic-release-hackage/actions/workflows/ci.yml/badge.svg)](https://github.com/stackbuilders/semantic-release-hackage/actions/workflows/ci.yml)
[![Release](https://github.com/stackbuilders/semantic-release-hackage/actions/workflows/release.yml/badge.svg)](https://github.com/stackbuilders/semantic-release-hackage/actions/workflows/release.yml)
[![NPM version](https://img.shields.io/npm/v/semantic-release-hackage?logo=npm)](https://www.npmjs.com/package/semantic-release-hackage)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/semantic-release-hackage)](https://www.npmjs.com/package/semantic-release-hackage)
[![NPM downloads](https://img.shields.io/npm/dm/semantic-release-hackage)](https://www.npmjs.com/package/semantic-release-hackage)
[![NPM license](https://img.shields.io/npm/l/semantic-release-hackage)](https://github.com/stackbuilders/semantic-release-hackage/blob/main/LICENSE)
[![GitHub Release Date](https://img.shields.io/github/release-date/stackbuilders/semantic-release-hackage)](https://github.com/stackbuilders/semantic-release-hackage/releases)
[![Known Vulnerabilities](https://snyk.io/test/github/stackbuilders/semantic-release-hackage/badge.svg)](https://snyk.io/test/github/stackbuilders/semantic-release-hackage)

# semantic-release-hackage

[semantic-release](https://semantic-release.gitbook.io/semantic-release/) plugin to publish a haskell package to [Hackage](https://hackage.haskell.org/)

## Motivation

Semantic-release is widely used in the development world but have not been implemented for haskell projects and applications until now. This plugin is intended to help you create your candidate releases for a hackage package using the benefits of semantic-release

## Steps

| Step               | Description                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| `verifyConditions` | verify the environment variable `HACKAGE_TOKEN`                                |
| `prepare`          | Update the version of `.cabal` file and create the distribution package (.tar) |
| `publish`          | Publish the hackage package to the specified repository                        |

## Environment variables

| Variable        | Description                                                    | Required |
| --------------- | -------------------------------------------------------------- | -------- |
| `HACKAGE_TOKEN` | [API token](https://hackage.haskell.org/packages/) for hackage | true     |

## Install

With npm:

```sh
npm install semantic-release-hackage -D
```

With yarn:

```sh
yarn add semantic-release-hackage --dev
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration). Here is a minimal example:

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-hackage",
      {
        "cabalFile": "yourcabalfilename",
        "packageName": "yourpackagename",
        "versionPrefix": "0.",
        "publishDocumentation": true
      }
    ]
  ]
}
```

## Configuration

| Property        | Description                             | Default                                       | Required |
| --------------- | --------------------------------------- | --------------------------------------------- | -------- |
| `cabalFile`     | Cabal file name                         | Plugin will read your root `.cabal` file name | `false`  |
| `packageName`   | Package name in Hackage                 |                                               | `true`   |
| `versionPrefix` | For supporting PVP versioning |                                               | `false`  |
| `publishDocumentation` | For publishing release candidate documentation |                                               | `false`  |

### Why adding a `versionPrefix` configuration?

[PVP](https://pvp.haskell.org/) is the standard versioning system for Haskell projects which is different from [Semantic Versioning](https://semver.org/). You may think that since this is a `semantic-release` plugin, you'll have to move out from PVP. But thanks to the `versionPrefix` option, you can keep the 4th digit in your version.

This is just an optional feature to enable backward compatibility when starting to use this plugin.

We strongly recommend moving to semantic versioning to keep things simple and follow a well-known standard. But `versionPrefix` can save the day if changing the versioning system is not an option.

For example, if you have the version number `0.2.0.7` and want to create a new release for a new feature, semantic-release is going to infer the next version as `2.1.0`, you can keep your previous versioning by adding the following to the plugin configuration:  

```
"versionPrefix" : "0."
```
The plugin will add the `0.` prefix to the new version, so your final version will be `0.2.1.0`.
## License

MIT, see [the LICENSE file](LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guideline](/docs/CONTRIBUTING.md) to know how you can help us build it.

---

<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%"></img>  
[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
