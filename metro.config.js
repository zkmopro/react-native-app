const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, './MoproReactNativeBindings');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('zkey');
config.resolver.assetExts.push('bin');
config.resolver.assetExts.push('json');
config.resolver.assetExts.push('local');
config.resolver.assetExts.push('pk');
config.resolver.assetExts.push('vk');
config.resolver.assetExts.push('r1cs');

module.exports = withMetroConfig(config, {
  root,
  dirname: __dirname,
});
