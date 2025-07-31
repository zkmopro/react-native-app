# E2E Testing for Circom Proof App

This directory contains end-to-end (E2E) tests for your React Native app with Circom proof functionality.

## 🏗️ Project Structure

```
e2e/
├── App.test.ts                    # Tests using text-based element selection
├── config.json                    # Jest configuration
├── init.ts                        # Detox environment setup
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🚀 Setup

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Build the app for testing**
   ```bash
   # For iOS
   npm run e2e:build:ios
   
   # For Android
   npm run e2e:build:android
   ```

## 🧪 Running Tests

### iOS Simulator
```bash
npm run e2e:test:ios
```

### Android Emulator
```bash
npm run e2e:test:android
```

### Both Platforms
```bash
npm run e2e:test
```

## 🐛 Debugging

### 1. Run in Debug Mode
```bash
detox test --configuration ios.sim.debug --loglevel trace
```

### 2. Take Screenshots
```typescript
await device.takeScreenshot('test-name');
```

### 3. View Logs
```bash
detox test --configuration ios.sim.debug --record-logs all
```

## 📋 Test Commands

```bash
# Build and test iOS
npm run e2e:build:ios && npm run e2e:test:ios

# Build and test Android
npm run e2e:build:android && npm run e2e:test:android

# Clean and rebuild
npm run e2e:clean && npm run e2e:build:ios && npm run e2e:test:ios
```

## 📚 Additional Resources

- [Detox Documentation](https://wix.github.io/Detox/)
- [React Native Testing Best Practices](https://reactnative.dev/docs/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started) 