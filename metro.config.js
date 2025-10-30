const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const { withMetroConfig } = await import('react-native-monorepo-config');

  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts.push('zkey', 'bin', 'json', 'local');

  return withMetroConfig(config, {
    root: path.resolve(__dirname, './MoproReactNativeBindings'),
    dirname: __dirname,
  });
})();
