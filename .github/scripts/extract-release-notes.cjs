const fs = require('fs');
const path = require('path');

const changelogPath = path.join(__dirname, '..', '..', 'CHANGELOG.md');
// Remove 'v' prefix if present in the argument
const versionTag = process.argv[2] ? process.argv[2].replace(/^v/, '') : null;

if (!versionTag) {
  console.error('Usage: node extract-release-notes.cjs <version>');
  process.exit(1);
}

try {
  if (!fs.existsSync(changelogPath)) {
    throw new Error(`CHANGELOG.md not found at ${changelogPath}`);
  }

  const changelogContent = fs.readFileSync(changelogPath, 'utf8');
  const lines = changelogContent.split('\n');

  let inTargetVersionSection = false;
  const releaseNotes = [];

  // Regex to match version headers like:
  // ## [0.2.0] - 2024-02-15
  // ## 0.2.0
  // ### [0.2.0]
  const versionHeaderRegex = /^(#+)\s*\[?(\d+\.\d+\.\d+)/;

  for (const line of lines) {
    const match = line.match(versionHeaderRegex);

    if (match) {
      const headerVersion = match[2]; // Captured version string "0.2.0"

      if (headerVersion === versionTag) {
        inTargetVersionSection = true;
        // Include the header line
        releaseNotes.push(line);
        continue;
      } else if (inTargetVersionSection) {
        // We found a new version header, so stop collecting notes
        break;
      }
    }

    if (inTargetVersionSection) {
      releaseNotes.push(line);
    }
  }

  // Determine key sections to extract
  // We want to skip the "Compare" link line usually found right after the header if standard-version is used
  // e.g. [0.2.0]: https://github.com/...
  
  // Clean up leading/trailing whitespace
  let notes = releaseNotes.join('\n').trim();
  
  if (!notes) {
      console.warn(`Warning: No notes found for version ${versionTag}`);
  }

  console.log(notes);

} catch (error) {
  console.error(`Error processing release notes: ${error.message}`);
  process.exit(1);
}
