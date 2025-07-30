# E2E Testing for Circom Proof App

This directory contains end-to-end (E2E) tests for your React Native app with Circom proof functionality.

## 🏗️ Project Structure

```
e2e/
├── App.test.ts                    # Tests using text-based element selection
├── AppWithTestIDs.test.ts         # Tests using testID-based element selection (recommended)
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

## 📝 Adding TestIDs to Your Components

To make the tests more reliable, add `testID` props to your React Native components. Here's how to update your components:

### 1. Update TextInput components

```tsx
<TextInput
    style={styles.input}
    placeholder="Enter value for a"
    value={a}
    onChangeText={setA}
    keyboardType="numeric"
    testID="input-a"  // Add this line
/>
<TextInput
    style={styles.input}
    placeholder="Enter value for b"
    value={b}
    onChangeText={setB}
    keyboardType="numeric"
    testID="input-b"  // Add this line
/>
```

### 2. Update Button components

```tsx
<Button 
    title="Generate Circom Proof" 
    onPress={() => genProof()} 
    testID="generate-proof-button"  // Add this line
/>
<Button 
    title="Verify Circom Proof" 
    onPress={() => verifyProof()} 
    testID="verify-proof-button"  // Add this line
/>
```

### 3. Update output sections

```tsx
<ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">Proof is Valid:</ThemedText>
    <Text style={styles.output} testID="proof-valid-status">{isValid}</Text>
    
    <ThemedText type="subtitle">Public Signals:</ThemedText>
    <ScrollView style={styles.outputScroll} testID="public-signals-output">
        <Text style={styles.output}>{JSON.stringify(inputs)}</Text>
    </ScrollView>
    
    <ThemedText type="subtitle">Proof:</ThemedText>
    <ScrollView style={styles.outputScroll} testID="proof-output">
        <Text style={styles.output}>{JSON.stringify(proof)}</Text>
    </ScrollView>
</ThemedView>
```

## 🧪 Test Coverage

The tests cover the following scenarios:

### Basic Functionality
- ✅ Display of input fields and buttons
- ✅ Text input and validation
- ✅ Button interactions
- ✅ UI element visibility

### User Interactions
- ✅ Entering values in input fields
- ✅ Generating proofs
- ✅ Verifying proofs
- ✅ Scrolling through output sections

### Edge Cases
- ✅ Empty input handling
- ✅ Large input values
- ✅ Rapid button presses
- ✅ Error state handling
- ✅ Network connectivity issues

### State Management
- ✅ Input value persistence (if implemented)
- ✅ App state after reload

## 🔧 Test Files

### `App.test.ts`
- Uses text-based element selection
- Works with your current app without modifications
- Less reliable but easier to get started

### `AppWithTestIDs.test.ts` (Recommended)
- Uses testID-based element selection
- More reliable and maintainable
- Requires adding testIDs to your components

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

## 🎯 Best Practices

1. **Use TestIDs**: Always add `testID` props to your components for reliable testing
2. **Keep Tests Independent**: Each test should be able to run independently
3. **Handle Async Operations**: Always wait for async operations to complete
4. **Test Edge Cases**: Include tests for error conditions and edge cases
5. **Use Descriptive Names**: Test names should clearly describe what is being tested

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**: Run `npm run e2e:clean` and rebuild
2. **Simulator Issues**: Reset simulator content and settings
3. **Timeout Errors**: Increase timeout values in test files
4. **Element Not Found**: Check testID props and element selectors

### Element Selection

```typescript
// By testID (recommended)
await element(by.id('input-a')).tap();

// By text
await element(by.text('Generate Circom Proof')).tap();

// By label
await element(by.label('Accessibility Label')).tap();
```

## 📚 Additional Resources

- [Detox Documentation](https://wix.github.io/Detox/)
- [React Native Testing Best Practices](https://reactnative.dev/docs/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started) 