#!/bin/bash

# 1. Check if adb exists in PATH
if ! command -v adb &> /dev/null; then
    echo "❌ Error: adb command not found."
    echo "💡 You need to install Android Studio SDK Platform tools and register them in the PATH."
    echo "Check your ~/.zshrc for: export PATH=\"\$PATH:~/Library/Android/sdk/platform-tools\""
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