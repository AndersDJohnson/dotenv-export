# dotenv-export

Source & export `.env` into your shell.
Adds `export` statements to each line of a [dotenv] `.env` file, for defining
any variables therein in your shell.

## Install

```
npm i -g dotenv-export
```

## Use

```
source <(dotenv-export)
```

Or you can use a custom file name instead of the default `.env`, e.g., `.env.test`:

```
source <(dotenv-export .env.test)
```

[dotenv]: https://github.com/motdotla/dotenv
