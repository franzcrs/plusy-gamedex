#!/bin/bash

# Function to check if a command exists
check_tool() {
    if ! command -v "$1" &> /dev/null; then
        echo "❌ Error: $1 is not installed. Please install it and try again."
        exit 1
    fi
}
# 1. Check for required tools
echo "🔍 Checking for required tools..."
check_tool "node"
check_tool "yarn"
check_tool "cargo" # Since this is a Tauri project, we need Rust too!

# 2. Setup Symlinks (Force update if exists)
echo "🔗 Setting up symlinks for Yarn and Node..."
sudo ln -sf "$(which yarn)" /usr/local/bin/yarn
sudo ln -sf "$(which node)" /usr/local/bin/node

# 3. Find the project file dynamically
XCODEPROJ_PATH=$(find src-tauri/gen/apple -name "*.xcodeproj" -maxdepth 1)
PBXPROJ="$XCODEPROJ_PATH/project.pbxproj"

# 4. Replace the shellScript line
if [ -f "$PBXPROJ" ]; then
    echo "📂 Found project at: $XCODEPROJ_PATH"
    echo "🏗️  Updating Xcode shellScript phase..."

    # CORRECTION KEY:
    # 1. We use single quotes (') for the Bash variable so nothing is expanded early.
    # 2. We use \\n for literal \n in the file.
    # 3. We use \\\& for ampersands so 'sed' doesn't interpret them as "the match".
    # 4. We use \\\" for quotes that need to stay escaped in the pbxproj file.
    # 5. We use \\\\. for the double backslash required before the dot.
    
    NEW_SCRIPT='# Clear any restricted PATH and add common dev paths\\nexport PATH=\\\"\$PATH:/opt/homebrew/bin:/usr/local/bin:\$HOME/.cargo/bin\\\"\\n\\n# If you use NVM for node, add this too:\\n[ -s \\\"\$HOME/.nvm/nvm.sh\\\" ] \&\& \\\\. \\\"\$HOME/.nvm/nvm.sh\\\"\\n\\n# Development build\\n# In project directory first run: yarn tauri ios dev\\nyarn tauri ios xcode-script -v --platform \${PLATFORM_DISPLAY_NAME:?} --sdk-root \${SDKROOT:?} --framework-search-paths \\\"\${FRAMEWORK_SEARCH_PATHS:?}\\\" --header-search-paths \\\"\${HEADER_SEARCH_PATHS:?}\\\" --gcc-preprocessor-definitions \\\"\${GCC_PREPROCESSOR_DEFINITIONS:-}\\\" --configuration \${CONFIGURATION:?} \${FORCE_COLOR} \${ARCHS:?}\\n'

    # Use sed to replace the shellScript line
    # The '|' delimiter avoids conflict with path slashes.
    sed -i '' "s|shellScript = \".*\";|shellScript = \"$NEW_SCRIPT\";|g" "$PBXPROJ"
    
    echo "✅ Successfully updated $PBXPROJ"

    # 5. Verify Xcode Select Path
    CURRENT_XCODE_PATH=$(xcode-select -p)
    TARGET_CLT_PATH="/Library/Developer/CommandLineTools"

    if [ "$CURRENT_XCODE_PATH" != "$TARGET_CLT_PATH" ]; then
        if [ -d "$TARGET_CLT_PATH" ]; then
            echo "🔄 Changing xcode-select to CommandLineTools to prevent simulator prompts..."
            sudo xcode-select -s "$TARGET_CLT_PATH"
        else
            echo "⚠️ Warning: $TARGET_CLT_PATH not found. Skipping switch."
        fi
    fi

    # 6. Start the Dev Server conditionally
    FINAL_XCODE_PATH=$(xcode-select -p)
    if [ "$FINAL_XCODE_PATH" == "$TARGET_CLT_PATH" ]; then
        echo "✅ xcode-select is pointing to CommandLineTools."
        echo "🚀 Opening a new terminal to run 'yarn tauri ios dev'..."
        
        # Detect local IP for real device dev (iPad needs to reach the Mac over LAN)
        LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
        if [ -n "$LOCAL_IP" ]; then
            osascript -e "tell application \"Terminal\" to do script \"cd '$(pwd)' && TAURI_DEV_HOST=$LOCAL_IP yarn tauri ios dev --host\""
        else
            echo "⚠️ Could not detect local IP. Falling back to localhost (simulator only)."
            osascript -e "tell application \"Terminal\" to do script \"cd '$(pwd)' && yarn tauri ios dev\""
        fi

        echo "💡 The Tauri dev server is starting in a separate window."
        echo "▶️  Once it is ready, press the 'Play' button in Xcode to build your provisional app."
        echo "✅ Success! Dev server and Xcode project are set up for development."
    else
        echo "❌ Aborting ios dev server start."
        echo "⚠️  Current path is: $FINAL_XCODE_PATH"
        echo "⚠️  Please ensure to install Command Line Tools and point xcode-select to it before running yarn tauri ios dev."
        echo "👉 Run: sudo xcode-select -s /Library/Developer/CommandLineTools"
    fi
    
else
    echo "❌ Error: Could not find a .xcodeproj file in src-tauri/gen/apple/"
    exit 1
fi