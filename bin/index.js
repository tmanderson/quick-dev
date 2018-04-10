#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const startEnv = require('../src');

const USER_DIR = process.cwd();

const args = require('yargs')
  .option('dir', {
    alias: 'd',
    default: USER_DIR
  })
  .option('entry', {
    alias: 'e',
    default: 'index.js'
  })
  .option('index', {
    alias: 'i'
  })
  .option('babel', {
    alias: 'b'
  })
  .option('webpack', {
    alias: 'w'
  })
  .option('port', {
    alias: 'p',
    default: '3000'
  })
  .argv;

// fs.symlinkSync(path.resolve(__dirname, '../'), path.resolve(USER_DIR, 'node_modules'));
startEnv(args);

process.once('exit', async () => {
  const dir = args.dir;
  // fs.unlinkSync(path.resolve(USER_DIR, 'node_modules'));
  // fs.unlinkSync(path.resolve(process.env.PWD, 'node_modules'));
  // process.exit();
});
