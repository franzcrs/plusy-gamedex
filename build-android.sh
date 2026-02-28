#!/bin/bash

# 1. Patch Android project files
MANIFEST="src-tauri/gen/android/app/src/main/AndroidManifest.xml"
JAVA_ROOT="src-tauri/gen/android/app/src/main/java"
MAINACTIVITY=$(find "$JAVA_ROOT" -name "MainActivity.kt" -maxdepth 5 2>/dev/null | head -n 1)

echo "🔧 Patching Android project files..."

# Add adjustResize to AndroidManifest.xml if not already present
if [ -f "$MANIFEST" ]; then
    if ! grep -q 'android:windowSoftInputMode' "$MANIFEST"; then
        sed -i '' 's|android:launchMode="singleTask"|android:launchMode="singleTask"\n            android:windowSoftInputMode="adjustResize"|' "$MANIFEST"
        echo "  ✅ AndroidManifest.xml: added adjustResize"
    else
        echo "  ⏭️  AndroidManifest.xml: adjustResize already present"
    fi
else
    echo "  ❌ Error: $MANIFEST not found. Run 'yarn tauri android init' first."
    exit 1
fi

# Add light status bar style to MainActivity.kt if not already present
if [ -f "$MAINACTIVITY" ]; then
    if ! grep -q 'SystemBarStyle' "$MAINACTIVITY"; then
        sed -i '' 's|import androidx.activity.enableEdgeToEdge|import androidx.activity.SystemBarStyle\nimport androidx.activity.enableEdgeToEdge|' "$MAINACTIVITY"
        sed -i '' 's|enableEdgeToEdge()|enableEdgeToEdge(\n      statusBarStyle = SystemBarStyle.light(\n        android.graphics.Color.TRANSPARENT,\n        android.graphics.Color.TRANSPARENT\n      )\n    )|' "$MAINACTIVITY"
        echo "  ✅ MainActivity.kt: added light status bar style"
    else
        echo "  ⏭️  MainActivity.kt: light status bar style already present"
    fi
else
    echo "  ❌ Error: $MAINACTIVITY not found. Run 'yarn tauri android init' first."
    exit 1
fi

# 2. Build the APK
echo "📦 Building APK..."
yarn tauri android build --apk true
