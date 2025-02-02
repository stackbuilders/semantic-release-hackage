# semantic-release-hackage

[semantic-release][] plugin to publish a Haskell package to [Hackage][].

[semantic-release]: https://semantic-release.gitbook.io/semantic-release/
[hackage]: https://hackage.haskell.org/

> [!NOTE]
> This plugin is a fork of `stackbuilders/semantic-release-haskell` and differs
> in the following major ways:
>
> 1. It expects and updates `package.yaml` instead of the `.cabal` file
> 1. It uses `stack` instead of `cabal`
> 1. It uploads as a package candidate **only if it's a prerelease branch**,
>    otherwise the package is actually published
> 1. It doesn't support uploading documentation
>
> This project began as a fork because I thought I could make contributions to
> support these things, but the differences are too large, and I ended up
> rewriting things entirely.
>
> This project will be renamed soon to prevent confusion.

## Motivation

Semantic-release is widely used in the development world but have not been
implemented for Haskell projects and applications until now. This plugin is
intended to help you create your candidate releases for a Hackage package using
the benefits of semantic-release

## Steps

| Step               | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `verifyConditions` | verify the environment variable `HACKAGE_TOKEN`                                 |
| `prepare`          | Update the version in `package.yaml` and create the distribution package (.tar) |
| `publish`          | Publish the Hackage package to the specified repository                         |

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

The plugin can be configured in the [**semantic-release** configuration
file][semantic-release-config] Here is a minimal example:

[semantic-release-config]: https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-hackage",
      {
        "sdistOptions": "--pvp-bounds lower",
        "stripSuffix": true,
        "versionPrefix": "0."
      }
    ]
  ]
}
```

### Development

Based on the semantic-release philosophy, you don't need to keep track of the
version in your repository anymore. The plugin will build the package with the
proper version on the fly, making it simpler for you to maintain your packages.
In simpler words, you can change your `.cabal` file to the following:

```yaml
version: 0.0.0.0
```

**Note: Your Hackage release is going to have the released version in the .cabal
file.**

## Configuration

### _sdistOptions_

Required: `false`

Description: Extra options to pass to `stack sdist`, such as `--pvp-bounds
lower`.

### _stripSuffix_

Required: `false`

Description: Whether to strip suffixes from the version or not. For example, if
set to `true`, a prerelease version like `1.0.0-rc.plugin.1` will be released as
a Hackage candidate `1.0.0`. Otherwise, it will be used as-is.

Default: The plugin will read your root `.cabal` file name.

### _versionPrefix_

Required: `false`

Description: This is a version prefix created for supporting PVP versioning.

Default: `""`

### _workingDirectory_

Required: `false`

Description: If defined, change to this directory before doing the prepare or
publish steps.

Default: `""`

### Why adding a `versionPrefix` configuration?

[PVP][] is the standard versioning system for Haskell projects which is
different from [Semantic Versioning][semver]. You may think that since this is a
`semantic-release` plugin, you'll have to move out from PVP. But thanks to the
`versionPrefix` option, you can keep the 4th digit in your version.

This is an optional feature enabling PVP compatibility when using this plugin.
So, if your package uses PVP, `versionPrefix` can save the day, and you can
continue using PVP versioning with this amazing tool.

Keep in mind that using Semantic Versioning does make things simpler while
following another well-known standard.

For example, if you have the version number `0.2.0.7` and want to create a new
release for a new feature, semantic-release is going to infer the next version
as `2.1.0`, you can keep your previous versioning by adding the following to the
plugin configuration:

[PVP]: https://pvp.haskell.org/
[semver]: https://semver.org/

```
"versionPrefix" : "0."
```

The plugin will add the `0.` prefix to the new version, so your final version will be `0.2.1.0`.

---

[LICENSE](./LICENSE)
