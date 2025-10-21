const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('./modules/mopro/package.json');

const root = path.resolve(__dirname, 'modules/mopro');

module.exports = getConfig(
  {
    presets: ['module:@react-native/babel-preset'],
  },
  { root, pkg }
);
