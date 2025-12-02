import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

export default function syncAssets() {
  return {
    name: 'sync-assets',
    hooks: {
      'astro:config:done': async () => {
        // Initial sync before server starts
        syncFiles();
      },
      'astro:server:setup': async ({ server }) => {
        // Watch for changes
        server.watcher.on('add', (filePath) => {
          if (filePath.includes('src/content/vault')) {
            syncFiles();
          }
        });
      },
      'astro:build:setup': async () => {
        syncFiles();
      }
    }
  };
}

function syncFiles() {
  const sourceDir = 'src/content/vault';
  const targetDir = 'public/vault-images';
  
  // Create target dir if not exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Find all images in vault (recursive)
  // Extensions commonly used in Obsidian
  const files = globSync('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: sourceDir });

  console.log(`[sync-assets] Found ${files.length} assets to sync.`);

  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const filename = path.basename(file); // Flatten structure
    const targetPath = path.join(targetDir, filename);

    // Copy only if changed or new
    try {
      if (!fs.existsSync(targetPath) || fs.statSync(sourcePath).mtime > fs.statSync(targetPath).mtime) {
        fs.copyFileSync(sourcePath, targetPath);
        // console.log(`[sync-assets] Synced: ${filename}`);
      }
    } catch (e) {
      console.error(`[sync-assets] Error syncing ${filename}:`, e);
    }
  });
}
