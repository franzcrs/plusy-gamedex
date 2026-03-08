#!/bin/bash

# 1. Ensure ANDROID_HOME is set and adb is available
if [ -z "$ANDROID_HOME" ]; then
    ANDROID_HOME="$HOME/Library/Android/sdk"
fi

if [ ! -d "$ANDROID_HOME" ]; then
    echo "❌ Error: Android SDK not found at $ANDROID_HOME"
    echo "💡 Complete the prerequisites installation: https://v2.tauri.app/start/prerequisites/"
    exit 1
fi

export PATH="$ANDROID_HOME/platform-tools:$PATH"

if ! command -v adb &> /dev/null; then
    echo "❌ Error: adb not found in $ANDROID_HOME/platform-tools"
    echo "💡 Install Android SDK Platform-Tools via Android Studio's SDK Manager"
    exit 1
fi

# 2. Find the first connected device ID
DEVICE=$(adb devices | grep -w "device" | awk '{print $1}' | head -n 1)

# 3. Check if a device was actually found
if [ -z "$DEVICE" ]; then
  echo "❌ Error: No device connected via USB/Wi-Fi. Make sure USB debugging is enabled."
  exit 1
fi

echo "📲 Found device: $DEVICE"

# 4. Path to your specific APK (Relative to project root)
APK_PATH="./src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk"

if [ ! -f "$APK_PATH" ]; then
    echo "❌ Error: APK file not found at $APK_PATH"
    echo "Did you run 'npm run tauri android build -- --apk' first?"
    exit 1
fi

# 5. Install it
echo "🚀 Installing APK to $DEVICE..."
adb -s "$DEVICE" install -r "$APK_PATH"

echo "✅ Success! App installed and ready."