const path = require('path');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  dependencies: {
    'my-test-library': {
      root: path.join(__dirname, 'modules/mopro'),
      platforms: {
        ios: {},
        android: {},
      },
    },
  },
  assets: ['./assets/keys/'],
};
