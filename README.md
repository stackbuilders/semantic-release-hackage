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

### Development
Based on the semantic-release philosophy, you don't need to keep track of the version in your repository (.cabal) anymore. The plugin will build the package with the proper version on the fly, making it simpler for you to maintain your packages. In simpler words, you can change your `.cabal` file to the following:

```cabal
  ...
  version: 0.0.0.0
  ...
```

__Note: Your Hackage release candidate is going to have the released version in the .cabal file.__

> If you still want to keep track of the version in the repository, you'll need to allow semantic-release to update your .cabal file in your repository after the semantic-release-hackage plugin finishes. This can be achieved with the [@semantic-release/git plugin](https://github.com/semantic-release/git), but keep in mind that semantic-release explicitly [discourages making commits during your release process](https://semantic-release.gitbook.io/semantic-release/support/faq#making-commits-during-the-release-process-adds-significant-complexity).

## Configuration

### _packageName_

Required: `true`

Description: Package name in Hackage.

### _cabalFile_

Required: `false`

Description: Library cabal file name.

Default: The plugin will read your root `.cabal` file name.

### _publishDocumentation_

Required: `false`

Description: Boolean value used for publishing release candidate documentation. When `true` the plugin will publish the documentation along with the candidate release.

Default: `false`

### _versionPrefix_

Required: `false`

Description: This is a version prefix created for supporting PVP versioning.

Default: `""`

### Why adding a `versionPrefix` configuration?

[PVP](https://pvp.haskell.org/) is the standard versioning system for Haskell projects which is different from [Semantic Versioning](https://semver.org/). You may think that since this is a `semantic-release` plugin, you'll have to move out from PVP. But thanks to the `versionPrefix` option, you can keep the 4th digit in your version.

This is an optional feature enabling PVP compatibility when using this plugin. So, if your package uses PVP, `versionPrefix` can save the day, and you can continue using PVP versioning with this amazing tool.

Keep in mind that using Semantic Versioning does make things simpler while following another well-known standard.

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
