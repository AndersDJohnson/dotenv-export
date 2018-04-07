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

### Multiline Support

To export multiline environment variables (as supported in the [`dotenv`](https://github.com/motdotla/dotenv#rules) package), use the literal characters `\n` in your variable:

```
MULTILINE_VAR="I\nlike\ntrains"
```

And run the following command to convert the `\n` characters to actual new lines:

```
source <(dotenv-export | sed 's/\\n/\n/g')
```

[dotenv]: https://github.com/motdotla/dotenv
