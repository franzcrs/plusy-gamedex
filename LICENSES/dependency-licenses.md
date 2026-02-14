# Dependency Licenses

This file lists the licenses for all dependencies in the project.
For full license texts, see the corresponding `.txt` files in this `LICENSES/` folder.

## Node.js Dependencies

Source: `inventory/node-licenses.txt`

| License | Packages |
|---------|----------|
| Apache-2.0 | baseline-browser-mapping@2.9.7, typescript@5.8.3 |
| Apache-2.0 OR MIT | @tauri-apps/api@2.9.1, @tauri-apps/cli-darwin-arm64@2.9.6, @tauri-apps/cli@2.9.6 |
| BSD-3-Clause | source-map-js@1.2.1 |
| CC-BY-4.0 | caniuse-lite@1.0.30001760 |
| ISC | electron-to-chromium@1.5.267, lru-cache@5.1.1, lucide-react@0.561.0, picocolors@1.1.1, semver@6.3.1, yallist@3.1.1 |
| MIT | @babel/code-frame@7.27.1, @babel/compat-data@7.28.5, @babel/core@7.28.5, @babel/generator@7.28.5, @babel/helper-compilation-targets@7.27.2, @babel/helper-globals@7.28.0, @babel/helper-module-imports@7.27.1, @babel/helper-module-transforms@7.28.3, @babel/helper-plugin-utils@7.27.1, @babel/helper-string-parser@7.27.1, @babel/helper-validator-identifier@7.28.5, @babel/helper-validator-option@7.27.1, @babel/helpers@7.28.4, @babel/parser@7.28.5, @babel/plugin-transform-react-jsx-self@7.27.1, @babel/plugin-transform-react-jsx-source@7.27.1, @babel/template@7.27.2, @babel/traverse@7.28.5, @babel/types@7.28.5, @esbuild/darwin-arm64@0.25.12, @jridgewell/gen-mapping@0.3.13, @jridgewell/remapping@2.3.5, @jridgewell/resolve-uri@3.1.2, @jridgewell/sourcemap-codec@1.5.5, @jridgewell/trace-mapping@0.3.31, @rolldown/pluginutils@1.0.0-beta.27, @rollup/rollup-darwin-arm64@4.53.3, @types/babel__core@7.20.5, @types/babel__generator@7.27.0, @types/babel__template@7.4.4, @types/babel__traverse@7.28.0, @types/estree@1.0.8, @types/react-dom@19.2.3, @types/react@19.2.7, @vitejs/plugin-react@4.7.0, browserslist@4.28.1, convert-source-map@2.0.0, csstype@3.2.3, debug@4.4.3, esbuild@0.25.12, escalade@3.2.0, fdir@6.5.0, fsevents@2.3.3, gensync@1.0.0-beta.2, js-tokens@4.0.0, jsesc@3.1.0, json5@2.2.3, ms@2.1.3, nanoid@3.3.11, node-releases@2.0.27, picomatch@4.0.3, postcss@8.5.6, react-dom@19.2.3, react-refresh@0.17.0, react@19.2.3, rollup@4.53.3, scheduler@0.27.0, tinyglobby@0.2.15, update-browserslist-db@1.2.2, vite@7.2.7 |
| MIT OR Apache-2.0 | @tauri-apps/plugin-opener@2.5.2 |

## Rust Dependencies

Source: `inventory/rust-licenses.txt`

| License | Count | Packages |
|---------|-------|----------|
| (Apache-2.0 OR MIT) AND Unicode-3.0 | 1 | unicode-ident |
| 0BSD OR Apache-2.0 OR MIT | 1 | adler2 |
| Apache-2.0 | 2 | sync_wrapper, tao |
| Apache-2.0 AND MIT | 1 | dpi |
| Apache-2.0 OR Apache-2.0 WITH LLVM-exception OR MIT | 6 | linux-raw-sys, rustix, wasi, wasip2, wit-bindgen |
| Apache-2.0 OR BSD-2-Clause OR MIT | 2 | zerocopy, zerocopy-derive |
| Apache-2.0 OR BSD-3-Clause OR MIT | 2 | num_enum, num_enum_derive |
| Apache-2.0 OR BSL-1.0 | 1 | ryu |
| Apache-2.0 OR CC0-1.0 OR MIT-0 | 1 | dunce |
| Apache-2.0 OR LGPL-2.1-or-later OR MIT | 1 | r-efi |
| Apache-2.0 OR MIT | 295 | android_system_properties, anyhow, async-broadcast, async-channel, async-executor, async-io, async-lock, async-process, async-recursion, async-signal, async-task, async-trait, atomic-waker, autocfg, base64, bitflags, block-buffer, blocking, bumpalo, camino, cargo-platform, cargo_toml, cc, cesu8, cfg-expr, cfg-if, chrono, concurrent-queue, cookie, core-foundation, core-foundation-sys, core-graphics, core-graphics-types, cpufeatures, crc32fast, crossbeam-channel, crossbeam-utils, crypto-common, ctor, deranged, digest, dirs, dirs-sys, displaydoc, dtoa, dyn-clone, embed_plist, enumflags2, enumflags2_derive, equivalent, erased-serde, errno, event-listener, event-listener-strategy, fastrand, fdeflate, field-offset, find-msvc-tools, flate2, fnv, foreign-types, foreign-types-macros, foreign-types-shared, form_urlencoded, futf, futures-channel, futures-core, futures-executor, futures-io, futures-lite, futures-macro, futures-sink, futures-task, futures-util, fxhash, getrandom, glob, hashbrown, heck, hermit-abi, hex, html5ever, http, httparse, iana-time-zone, iana-time-zone-haiku, ident_case, idna, idna_adapter, indexmap, ipnet, iri-string, itoa, jni, jni-sys, js-sys, json-patch, jsonptr, keyboard-types, lazy_static, libappindicator, libappindicator-sys, libc, lock_api, log, mac, markup5ever, match_token, mime, muda, ndk, ndk-context, ndk-sys, nodrop, num-conv, num-traits, once_cell, ordered-stream, parking, parking_lot, parking_lot_core, pathdiff, percent-encoding, pin-project-lite, pin-utils, piper, pkg-config, png, polling, powerfmt, ppv-lite86, proc-macro-crate, proc-macro-error, proc-macro-error-attr, proc-macro-hack, proc-macro2, quote, rand, rand_chacha, rand_core, rand_hc, rand_pcg, ref-cast, ref-cast-impl, regex, regex-automata, regex-syntax, reqwest, rustc_version, rustversion, scopeguard, semver, serde, serde-untagged, serde_core, serde_derive, serde_derive_internals, serde_json, serde_repr, serde_spanned, serde_urlencoded, serde_with, serde_with_macros, serialize-to-javascript, serialize-to-javascript-impl, servo_arc, sha2, shlex, signal-hook-registry, siphasher, smallvec, socket2, softbuffer, stable_deref_trait, static_assertions, string_cache, string_cache_codegen, swift-rs, syn, system-deps, tao-macros, tauri, tauri-build, tauri-codegen, tauri-macros, tauri-plugin, tauri-plugin-opener, tauri-runtime, tauri-runtime-wry, tauri-utils, tempfile, tendril, thiserror, thiserror-impl, time, time-core, time-macros, toml, toml_datetime, toml_edit, toml_parser, toml_writer, tray-icon, typeid, typenum, unic-char-property, unic-char-range, unic-common, unic-ucd-ident, unic-ucd-version, unicode-segmentation, url, utf-8, utf8_iter, uuid, version_check, wasm-bindgen, wasm-bindgen-futures, wasm-bindgen-macro, wasm-bindgen-macro-support, wasm-bindgen-shared, wasm-streams, web-sys, winapi, winapi-i686-pc-windows-gnu, winapi-x86_64-pc-windows-gnu, window-vibrancy, windows, windows-collections, windows-core, windows-future, windows-implement, windows-interface, windows-link, windows-numerics, windows-result, windows-strings, windows-sys, windows-targets, windows-threading, windows-version, windows_aarch64_gnullvm, windows_aarch64_msvc, windows_i686_gnu, windows_i686_gnullvm, windows_i686_msvc, windows_x86_64_gnu, windows_x86_64_gnullvm, windows_x86_64_msvc, wry |
| Apache-2.0 OR MIT OR Zlib | 19 | bytemuck, dispatch2, miniz_oxide, objc2-app-kit, objc2-cloud-kit, objc2-core-data, objc2-core-foundation, objc2-core-graphics, objc2-core-image, objc2-core-text, objc2-core-video, objc2-exception-helper, objc2-io-surface, objc2-javascript-core, objc2-quartz-core, objc2-security, objc2-ui-kit, objc2-web-kit, raw-window-handle |
| Apache-2.0 WITH LLVM-exception | 1 | target-lexicon |
| BSD-3-Clause | 2 | alloc-no-stdlib, alloc-stdlib |
| BSD-3-Clause AND MIT | 1 | brotli |
| BSD-3-Clause OR MIT | 1 | brotli-decompressor |
| ISC | 1 | libloading |
| MIT | 121 | atk, atk-sys, block2, bytes, cairo-rs, cairo-sys-rs, cargo_metadata, cfb, cfg_aliases, combine, convert_case, darling, darling_core, darling_macro, derive_more, dispatch, dlopen2, dlopen2_derive, embed-resource, endi, gdk, gdk-pixbuf, gdk-pixbuf-sys, gdk-sys, gdkwayland-sys, gdkx11, gdkx11-sys, generic-array, gio, gio-sys, glib, glib-macros, glib-sys, gobject-sys, gtk, gtk-sys, gtk3-macros, http-body, http-body-util, hyper, hyper-util, ico, infer, is-docker, is-wsl, javascriptcore-rs, javascriptcore-rs-sys, kuchikiki, libredox, matches, memoffset, mio, new_debug_unreachable, nix, objc2, objc2-encode, objc2-foundation, open, pango, pango-sys, phf, phf_codegen, phf_generator, phf_macros, phf_shared, plist, precomputed-hash, quick-xml, redox_syscall, redox_users, schemars, schemars_derive, simd-adler32, slab, soup3, soup3-sys, strsim, synstructure, tauri-winres, tokio, tokio-util, tower, tower-http, tower-layer, tower-service, tracing, tracing-attributes, tracing-core, try-lock, uds_windows, urlpattern, version-compare, vswhom, vswhom-sys, want, webkit2gtk, webkit2gtk-sys, webview2-com, webview2-com-macros, webview2-com-sys, winnow, winreg, x11, x11-dl, zbus, zbus_macros, zbus_names, zvariant, zvariant_derive, zvariant_utils |
| MIT OR Unlicense | 6 | aho-corasick, byteorder, memchr, same-file, walkdir, winapi-util |
| MPL-2.0 | 5 | cssparser, cssparser-macros, dtoa-short, option-ext, selectors |
| Unicode-3.0 | 18 | icu_collections, icu_locale_core, icu_normalizer, icu_normalizer_data, icu_properties, icu_properties_data, icu_provider, litemap, potential_utf, tinystr, writeable, yoke, yoke-derive, zerofrom, zerofrom-derive, zerotrie, zerovec, zerovec-derive |
