# Mopro Expo App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
Learn more about Mopro: https://zkmopro.org.
This is an example for `multiplier2` circuits.

> Example zkey: [multiplier2_final.zkey](https://github.com/zkmopro/mopro/raw/ae88356e680ac4d785183267d6147167fabe071c/test-vectors/circom/multiplier2_final.zkey)

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Add Mopro Bindings

-   Get `MoproiOSBindings` and `MoproAndroidBindings` through [Rust Setup](https://zkmopro.org/docs/getting-started/rust-setup)
-   Copy `MoproiOSBinding` directory to `modules/mopro/ios`
    The folder structure should be as follows:
    <details>
    <summary><code>modules/mopro/ios</code></summary>

    ```sh
    modules/mopro/ios
    ├── Mopro.podspec
    ├── MoproModule.swift
    ├── MoproType.swift
    ├── MoproView.swift
    └── MoproiOSBindings
        ├── MoproBindings.xcframework
        │   ├── Info.plist
        │   ├── ios-arm64
        │   │   ├── Headers
        │   │   │   ├── module.modulemap
        │   │   │   └── moproFFI.h
        │   │   └── libmopro_bindings.a
        │   └── ios-arm64_x86_64-simulator
        │       ├── Headers
        │       │   ├── module.modulemap
        │       │   └── moproFFI.h
        │       └── libmopro_bindings.a
        └── mopro.swift
    ```

    </details>

-   Copy the `jniLibs` directory to `modules/mopro/android/src/main/`.
    And copy `uniffi` directory to `modules/mopro/android/src/main/java/`.
    The folder structure should be as follows:

    <details>
    <summary><code>modules/mopro/android/src/main</code></summary>

    ```sh
    modules/mopro/android/src/main
    ├── AndroidManifest.xml
    ├── java
    │   ├── expo
    │   │   └── modules
    │   │       └── mopro
    │   │           ├── MoproModule.kt
    │   │           ├── MoproType.kt
    │   │           └── MoproView.kt
    │   └── uniffi
    │       └── mopro
    │           └── mopro.kt
    └── jniLibs
        ├── arm64-v8a
        │   └── libuniffi_mopro.so
        ├── armeabi-v7a
        │   └── libuniffi_mopro.so
        ├── x86
        │   └── libuniffi_mopro.so
        └── x86_64
            └── libuniffi_mopro.so
    ```

    </details>

3. Start the app

    ```bash
     npx expo start
    ```

    - start an android emulator

        ```bash
        npm run android
        ```

    - start an iOS simulator

        ```bash
        npm run ios
        ```

    - start a web app (WIP)

        ```bash
        npm run web
        ```

## Screenshots

### iOS

<img src="./images/Simulator Screenshot - iPhone 15 Pro - 2024-08-22 at 21.53.19.png" width=300>

### Android

<img src="./images/Screenshot_20240822_215337.png" width=300>
