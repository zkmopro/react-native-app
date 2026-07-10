# E2E Tests for React Native Proof App

This directory contains end-to-end (E2E) tests for the React Native cryptographic proof generation app using Maestro.

## Test Structure

- `tests/` - Contains individual test files
    - `circom-proof-test.yaml` - Tests for Circom proof generation and verification
- `maestro.yaml` - Global Maestro configuration
- `reports/` - Test execution reports (generated automatically)

## Prerequisites

1. **Maestro CLI** - Install using:

    ```bash
    curl -Ls "https://get.maestro.mobile.dev" | bash
    export PATH="$PATH":"$HOME/.maestro/bin"
    ```

2. **iOS Simulator** (for iOS tests):
    - Xcode installed
    - iOS Simulator running
    - App built and installed

3. **Android Emulator** (for Android tests):
    - Android Studio installed
    - Android Emulator running
    - App built and installed

## Running Tests

### Run All Tests

```bash
# From project root
npm run e2e:test
```

### Run Individual Tests

```bash
# Run specific test
maestro test e2e/tests/circom-proof-test.yaml
```

### Run Tests with Different Configurations

```bash
# Run with custom device
maestro test e2e/tests/ --device "iPhone 14 Pro"

# Run with verbose output
maestro test e2e/tests/ --verbose

# Run and generate reports
maestro test e2e/tests/ --format junit --output e2e/reports/
```

## Test Coverage

The E2E tests cover:

1. **App Launch** - Verifies app starts correctly
2. **Tab Navigation** - Tests switching between Circom, Halo2, and Noir tabs
3. **Input Validation** - Tests text input fields for each proof type
4. **Proof Generation** - Tests proof generation functionality
5. **Proof Verification** - Tests proof verification functionality
6. **UI Elements** - Verifies all UI components are visible and interactive
7. **Complete Workflow** - Tests end-to-end user journey

## Test Data

Tests use various input values to verify proof generation:

- Circom: a=3, b=4 and a=5, b=6
- Halo2: out=55 and out=89
- Noir: a=7, b=8 and a=2, b=3

## Troubleshooting

### Common Issues

1. **App not found**: Ensure the app is built and installed on the device/simulator
2. **Element not found**: Check that testID attributes are correctly set in the app
3. **Timeout errors**: Increase timeout values in maestro.yaml
4. **Device not found**: Ensure simulator/emulator is running and accessible

### Debug Mode

Run tests in debug mode for detailed logging:

```bash
maestro test e2e/tests/ --debug
```

### Screenshots

Screenshots are automatically taken on test failures and saved to `e2e/reports/screenshots/`

## CI/CD Integration

The tests are designed to run in CI/CD pipelines. Use the following commands:

```bash
# Install Maestro in CI
curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH":"$HOME/.maestro/bin"

# Run tests
maestro test e2e/tests/ --format junit --output e2e/reports/
```

## Adding New Tests

1. Create a new `.yaml` file in the `tests/` directory
2. Follow the Maestro YAML syntax
3. Use existing testID attributes from the app
4. Add the test to the test suite by running it individually first
5. Update this README if needed

## Test Maintenance

- Update tests when UI changes
- Add new test cases for new features
- Remove obsolete tests
- Keep test data realistic and varied
