const fs = require('fs');
const path = require('path');

const SHOWCASE_DIR = path.resolve(__dirname, '..', 'showcase');
const MEDIA_DIR = path.join(SHOWCASE_DIR, 'media');
const MANIFEST_PATH = path.join(SHOWCASE_DIR, 'manifest.json');

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.avi', '.mkv']);

function getMediaType(extension) {
    if (IMAGE_EXTENSIONS.has(extension)) {
        return 'image';
    }

    if (VIDEO_EXTENSIONS.has(extension)) {
        return 'video';
    }

    return null;
}

function buildManifest() {
    if (!fs.existsSync(MEDIA_DIR)) {
        throw new Error(`Showcase media directory not found at ${MEDIA_DIR}`);
    }

    const entries = fs.readdirSync(MEDIA_DIR, { withFileTypes: true })
        .filter(entry => entry.isFile())
        .map(entry => entry.name)
        .filter(name => {
            const ext = path.extname(name).toLowerCase();
            return getMediaType(ext);
        })
        .map(name => {
            const ext = path.extname(name).toLowerCase();
            const type = getMediaType(ext);
            const basename = path.basename(name, ext);

            return {
                src: `showcase/media/${name}`.replace(/\\/g, '/'),
                type,
                title: basename.replace(/[-_]+/g, ' '),
                filename: name
            };
        })
        .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' }))
        .map(({ filename, ...rest }) => rest); // Remove filename before saving

    const manifest = {
        updatedAt: new Date().toISOString(),
        items: entries
    };

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Updated showcase manifest with ${entries.length} item(s).`);

    // Copy showcase folder to public for React app
    const PUBLIC_SHOWCASE_DIR = path.resolve(__dirname, '..', 'public', 'showcase');
    if (!fs.existsSync(PUBLIC_SHOWCASE_DIR)) {
        fs.mkdirSync(PUBLIC_SHOWCASE_DIR, { recursive: true });
    }
    if (!fs.existsSync(path.join(PUBLIC_SHOWCASE_DIR, 'media'))) {
        fs.mkdirSync(path.join(PUBLIC_SHOWCASE_DIR, 'media'), { recursive: true });
    }

    // Copy manifest to public
    fs.copyFileSync(MANIFEST_PATH, path.join(PUBLIC_SHOWCASE_DIR, 'manifest.json'));

    // Copy media files to public
    const mediaFiles = fs.readdirSync(MEDIA_DIR);
    mediaFiles.forEach(file => {
        const srcPath = path.join(MEDIA_DIR, file);
        const destPath = path.join(PUBLIC_SHOWCASE_DIR, 'media', file);
        if (fs.statSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
        }
    });

    console.log('Copied showcase to public directory.');
}

try {
    buildManifest();
} catch (error) {
    console.error('Failed to update showcase manifest:', error.message);
    process.exitCode = 1;
}
