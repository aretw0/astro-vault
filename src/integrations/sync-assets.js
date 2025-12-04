import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

export default function syncAssets() {
  return {
    name: 'sync-assets',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        // Initial sync before server starts
        syncFiles(logger);
      },
      'astro:server:setup': async ({ server, logger }) => {
        // Watch for changes
        server.watcher.on('add', (filePath) => {
          if (filePath.includes('src/assets')) {
            syncFiles(logger);
          }
        });
      },
      'astro:build:setup': async ({ logger }) => {
        syncFiles(logger);
      }
    }
  };
}

function syncFiles(logger) {
  const sourceDir = 'src/assets';
  const targetDir = 'public/assets';
  const markdownFilesDir = 'src';
  
  // Create target dir if not exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. Scan all Markdown files for image references
  const markdownFiles = globSync('**/*.{md,mdx}', { cwd: markdownFilesDir });
  const referencedImages = new Set();
  
  // Regex to find ![[image.png]] and (image.png)
  // Matches: ![[filename.ext]] OR (filename.ext)
  // We look for common image extensions
  const imageRegex = /(?:!\[\[(.*?)(?:\|.*?)?\]\])|(?:\((.*?\.(?:png|jpg|jpeg|gif|svg|webp))\))/g;

  markdownFiles.forEach(file => {
    const content = fs.readFileSync(path.join(markdownFilesDir, file), 'utf-8');
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      // match[1] is wikilink, match[2] is standard link
      const filename = match[1] || match[2];
      if (filename) {
        // Extract just the basename in case path is provided
        referencedImages.add(path.basename(filename));
      }
    }
  });

  logger.info(`[sync-assets] Found ${referencedImages.size} referenced images.`);

  // 2. Find all images in source
  const files = globSync('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: sourceDir });

  files.forEach(file => {
    const filename = path.basename(file);
    
    // Skip private files (starting with _)
    if (filename.startsWith('_')) {
      return;
    }

    // Skip unreferenced files
    if (!referencedImages.has(filename)) {
      // console.log(`[sync-assets] Skipping unused: ${filename}`);
      return;
    }

    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, filename);

    // Copy only if changed or new
    try {
      if (!fs.existsSync(targetPath) || fs.statSync(sourcePath).mtime > fs.statSync(targetPath).mtime) {
        fs.copyFileSync(sourcePath, targetPath);
        logger.info(`[sync-assets] Synced: ${filename}`);
      }
    } catch (e) {
      logger.error(`[sync-assets] Error syncing ${filename}:`, e);
    }
  });
}
