const path = require('path');
const fs = require('fs');
const { readdirSync, readFileSync } = require('fs');

const serve = require('webpack-serve');
const { template } = require('lodash');

const DEFAULT_INDEX = path.resolve(__dirname, '../templates/index.html.tmp');
const DEFAULT_BABEL = path.resolve(__dirname, '../templates/.babelrc.tmp')
const DEFAULT_WEBPACK = path.resolve(__dirname, '../templates/webpack.config.js.tmp');

module.exports = function startEnv(args) {
  const dirContents = readdirSync(path.resolve(args.dir));
  const cssFiles = dirContents.filter(f => /\.s?css$/.test(f));
  const htmlFiles = dirContents.filter(f => /\.html$/.test(f));

  const indexFile = args.index || htmlFiles.find(f => f === 'index.html');
  const indexPath = indexFile && path.resolve(args.dir, indexFile);

  const babelPath = args.babel && path.resolve(args.dir, args.babel);
  const webpackPath = args.webpack && path.resolve(args.dir, args.webpack);

  const indexTmp = readFileSync(indexPath || DEFAULT_INDEX).toString('utf8');
  const babelTmp = readFileSync(babelPath || DEFAULT_BABEL).toString('utf8');
  const webpackTmp = readFileSync(webpackPath || DEFAULT_WEBPACK);

  const index = indexFile
    ? indexTmp
    : template(indexTmp)({
        dirName: __dirname,
        // Load any CSS files in directory, inject into HTML <head>
        styles: cssFiles.map(f => readFileSync(f).toString()),
        content: `
          <header></header>
          <main>
            <canvas></canvas>
          </main>
          <footer></footer>
        `
      });

  const webpackConfig = args.webpack
    ? webpackTmp
    : eval(
        template(webpackTmp)({
          sass: args.sass,
          baseDir: args.dir,
          outputDir: args.dir,
          modulesDir: path.resolve(__dirname, '../node_modules'),
          babelConfig: babelTmp,
          entryFile: args.entry
        })
      );

  serve({
    config: webpackConfig,
    port: args.port,
    add: (app, middleware, options) => {
      middleware.webpack();
      app.use(ctx => (ctx.body = index));
    }
  }).then((server) => {
    server.on('listening', () => {
      console.log('Dev server started!');
    });
  });
}
