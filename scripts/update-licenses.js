import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const licensesDir = join(__dirname, "LICENSES");
const inventoryDir = join(licensesDir, "inventory");

mkdirSync(inventoryDir, { recursive: true });

// --- Step 1: Regenerate inventory files ---

console.log("Generating Node.js license inventory...");
const nodeOutput = execSync("yarn licenses list", {
  cwd: __dirname,
  encoding: "utf-8",
});
const nodePath = join(inventoryDir, "node-licenses.txt");
writeFileSync(nodePath, nodeOutput);
console.log(`  Saved to ${nodePath}`);

console.log("Generating Rust license inventory...");
const rustOutput = execSync("cargo license", {
  cwd: join(__dirname, "src-tauri"),
  encoding: "utf-8",
});
const rustPath = join(inventoryDir, "rust-licenses.txt");
writeFileSync(rustPath, rustOutput);
console.log(`  Saved to ${rustPath}`);

// --- Step 2: Parse inventory files ---

function parseNodeLicenses(text) {
  const licenses = new Map();
  let currentLicense = null;

  for (const line of text.split("\n")) {
    if (line.startsWith("yarn licenses")) continue;

    const contentMatch = line.match(/[├└]─\s+(.+)$/);
    if (!contentMatch) continue;

    const content = contentMatch[1].trim();

    if (
      content.startsWith("URL:") ||
      content.startsWith("VendorName:") ||
      content.startsWith("VendorUrl:")
    )
      continue;

    // License header: line starts directly with a tree branch (no │ prefix)
    if (line.match(/^[├└]─/)) {
      currentLicense = content;
      if (!licenses.has(currentLicense)) {
        licenses.set(currentLicense, []);
      }
    } else if (currentLicense && content.includes("@")) {
      // Package line: nested, contains @ for version
      licenses.get(currentLicense).push(content);
    }
  }

  return licenses;
}

function parseRustLicenses(text) {
  const licenses = [];

  for (const line of text.split("\n")) {
    const match = line.match(/^(.+?)\s+\((\d+)\):\s+(.+)$/);
    if (!match) continue;

    const [, license, count, pkgsStr] = match;
    if (license === "N/A") continue;

    const pkgs = [
      ...new Set(
        pkgsStr
          .split(", ")
          .map((p) => p.trim())
          .filter(Boolean),
      ),
    ];

    licenses.push({ license, count: parseInt(count, 10), packages: pkgs });
  }

  return licenses;
}

const nodeText = readFileSync(nodePath, "utf-8");
const rustText = readFileSync(rustPath, "utf-8");

const nodeLicenses = parseNodeLicenses(nodeText);
const rustLicenses = parseRustLicenses(rustText);

// --- Step 3: Generate markdown ---

let md = `# Dependency Licenses

This file lists the licenses for all dependencies in the project.
For full license texts, see the corresponding \`.txt\` files in this \`LICENSES/\` folder.

## Node.js Dependencies

Source: \`inventory/node-licenses.txt\`

| License | Packages |
|---------|----------|
`;

for (const [license, packages] of nodeLicenses) {
  md += `| ${license} | ${packages.join(", ")} |\n`;
}

md += `
## Rust Dependencies

Source: \`inventory/rust-licenses.txt\`

| License | Count | Packages |
|---------|-------|----------|
`;

for (const { license, count, packages } of rustLicenses) {
  md += `| ${license} | ${count} | ${packages.join(", ")} |\n`;
}

const mdPath = join(licensesDir, "dependency-licenses.md");
writeFileSync(mdPath, md);

console.log(`\nGenerated ${mdPath}`);
console.log("Done!");
