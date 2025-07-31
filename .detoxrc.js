/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/jest.config.ts',
  apps: {
    'reactnativeapp.ios': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/reactnativeapp.app',
      build: 'xcodebuild -workspace ios/reactnativeapp.xcworkspace -scheme reactnativeapp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'reactnativeapp.ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/reactnativeapp.app',
      build: 'xcodebuild -workspace ios/reactnativeapp.xcworkspace -scheme reactnativeapp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'reactnativeapp.android': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'reactnativeapp.android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
  },
  devices: {
    'ios.simulator': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 16 Pro',
        os: '18.4'
      }
    },
    'android.emulator': {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_8_API_35'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'ios.simulator',
      app: 'reactnativeapp.ios'
    },
    'ios.sim.release': {
      device: 'ios.simulator',
      app: 'reactnativeapp.ios.release'
    },
    'android.emu.debug': {
      device: 'android.emulator',
      app: 'reactnativeapp.android'
    },
    'android.emu.release': {
      device: 'android.emulator',
      app: 'reactnativeapp.android.release'
    }
  }
};
