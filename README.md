# semantic-release-hackage

[semantic-release](https://semantic-release.gitbook.io/semantic-release/) plugin to publish a haskell package to [Hackage](https://hackage.haskell.org/)

## Motivation

Semantic-release is widely used in the development world but have not been implemented for haskell projects and applications until now. This plugin is intended to help you creating your candidate releases for a hackage package using the benefits of semantic-release

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
        "versionPrefix": "0."
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
| `versionPrefix` | For supporting Haskell package versions |                                               | `false`  |

### Why adding a `versionPrefix` configuration?

Haskell projects use a different way of versioning (A.B.C.D) than semantic versioning, you could think that since this plugin uses semantic-release, you have to move from your preview versioning way but thanks to the `versionPrefix` you could keep the usage of the 4 digits in your version.

This is just an optional feature to enable backward compatibility when starting to use this plugin.

We strongly recommend moving to semantic-versioning but if you cannot, the string `versionPrefix` can save the day.

For example, if you have the version number `0.2.0.7` and want to create a new release for a new feature, semantic-release is going to infer the next version as `2.1.0`, you can keep your previous versioning adding the  
```
"versionPrefix" : "0."
```
And the plugin will add the `versionPrefix` to the new version, so your final version will be `0.2.1.0`.
## License

MIT, see [the LICENSE file](LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guideline](/docs/CONTRIBUTING.md) to know how you can help us build it.

---

<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%"></img>  
[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
