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
    "semantic-release-hackage"
  ]
}
```

## Configuration

| Property      | Description             | Default                                       |
| ------------- | ----------------------- | --------------------------------------------- |
| `cabalFile`   | Cabal file name         | Plugin will read your root `.cabal` file name |
| `packageName` | Package name in Hackage |                                               |

## License

MIT, see [the LICENSE file](LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guideline](/docs/CONTRIBUTING.md) to know how you can help us build it.

---

<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%"></img>  
[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
