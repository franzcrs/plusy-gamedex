# Changelog

All notable changes to PlusY Gamedex are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-28

### Added
- **Initial Release**: First functional version to land the app idea.
- **Game Search**: Real-time search by title or remarks.
- **Game Registration**: Register multiple games at once via a form.
- **Game Management**: Edit and delete games in a table view.
- **Persistent Storage**: Local data storage that persists across app sessions.
- **Cross-Platform Support**: Installers for macOS Apple Silicon (.dmg), macOS Intel (.dmg), Windows (.msi/.exe), and Android (.apk).

### Technical
- Built with Tauri (Rust backend) and React (TypeScript frontend).
- Configured GitHub Actions for automated multi-platform builds and draft release publishing.