# Mopro React Native App with Expo framework

This is a sample [Expo](https://expo.dev) app that demonstrates how mopro can be used to prove a `multiplier2` circuit.

> Example zkey: [multiplier2_final.zkey](https://github.com/zkmopro/mopro/raw/ae88356e680ac4d785183267d6147167fabe071c/test-vectors/circom/multiplier2_final.zkey)

Learn more about Mopro: https://zkmopro.org.

## Get started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

-   start an android emulator

    ```bash
    npm run android
    ```

-   start an iOS simulator

    ```bash
    npm run ios
    ```

-   start a web app (WIP)

    ```bash
    npm run web
    ```


### 3. Update Mopro Bindings

-   Get `MoproiOSBindings` and `MoproAndroidBindings` through [Rust Setup](https://zkmopro.org/docs/getting-started/rust-setup)
-   Update `modules/mopro/ios/MoproiOSBinding` with `MoproiOSBindings`

-   Copy the `MoproAndroidBindings/jniLibs` directory to `modules/mopro/android/src/main/jniLibs`. <br/>
    And copy `MoproAndroidBindings/uniffi` directory to `modules/mopro/android/src/main/java/uniffi`. <br/>
    The folder structure should be as follows: <br/>

## Screenshots

### iOS

<img src="./images/Simulator Screenshot - iPhone 15 Pro - 2024-08-22 at 21.53.19.png" width=300>

### Android

<img src="./images/Screenshot_20240822_215337.png" width=300>
````
