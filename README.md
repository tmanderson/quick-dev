# Quick Dev

Zero-configuration web environments with babel and webpack.

### Installation
```
$> npm install -g quick-dev-cli
```

### Usage
**No arguments are required**

```
$> qd [-d <directory>] [-p <port>] [-b <.babelrc>] [-w <webpack.config>] [-e <entry.js>] [-i <index.html>]
```

QD provides the following with no configuration:

- [Default index.html](templates/index.html.tmp)
  - If an `index.html` is found in directory, will override
  - Auto loads any `css` files in base directory
- [Default babel config](templates/.babelrc.tmp)
- [Default webpack config](templates/webpack.config.js.tmp)

You can override these with their respective arguments
  - `--babel <location to .babelrc>`
  - `--webpack <location to webpack.config>`
  - `--index <location to index.html>`

### Babel configuration
#### Presets
- env
- react
- stage-2

#### Plugins
- transform-class-properties
- transform-object-rest-spread
- babel-plugin-transform-react-jsx

### Webpack configuration
#### Loaders
- styles-loader
- css-loader
- sass-loader
