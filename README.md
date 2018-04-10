# Quick Dev

Zero-configuration web environments with babel and webpack.

### Installation
```
$> npm install -g quick-dev-cli
```

### Usage
Start a dev server from the current directory (no args required by default):

```
$> qd [-d <directory>] [-p <port>] [-b <.babelrc>] [-w <webpack.config>] [-e <index.js>] [-i <index.html>]
```

QD provides the following with no configuration:

- Default entry file `index.js`
  - Override with the `-e` option
- [Default index.html](templates/index.html.tmp)
  - If an `index.html` is found in directory, will override
  - Auto loads any `css` files in base directory
  - Override with the `-i` option
- [Default babel config](templates/.babelrc.tmp)
  - Override with the `-b` option
- [Default webpack config](templates/webpack.config.js.tmp)
  - Override with the `-w` option

You can override these with their respective arguments
  - `-b, --babel <location to .babelrc>`
  - `-w, --webpack <location to webpack.config>`
  - `-i, --index <location to index.html>`

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
