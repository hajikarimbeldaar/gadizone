const fs = require('fs');
const path = require('path');

const DIRECTORIES_TO_SCAN = ['app', 'components', 'lib', 'public', 'backend'];
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist'];

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Conversions:
    // 1. "Assad Motors" -> "Gadizone" (Title Case)
    // 2. "assadmotors" -> "gadizone" (lower case)
    // 3. "ASSAD_MOTORS" -> "GADIZONE" (upper case)

    // First save instances of 'Assad Motors Logo' so they don't break with plain 'Gadizone'
    content = content.replace(/Assad Motors/g, 'Gadizone');
    content = content.replace(/assad motors/g, 'gadizone');
    content = content.replace(/assadmotors/g, 'gadizone');
    content = content.replace(/ASSAD_MOTORS/g, 'GADIZONE');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                scanDirectory(fullPath);
            }
        } else if (stat.isFile()) {
            // only process text-based files
            if (/\.(js|jsx|ts|tsx|html|css|json|md|yaml|yml|env|txt)$/.test(file) || file === '.env') {
                try {
                    replaceInFile(fullPath);
                } catch (e) {
                    console.error(`Error processing file ${fullPath}:`, e);
                }
            }
        }
    }
}

DIRECTORIES_TO_SCAN.forEach(dir => {
    const fullDirPath = path.join(__dirname, dir);
    if (fs.existsSync(fullDirPath)) {
        scanDirectory(fullDirPath);
    }
});

console.log('Replacement complete.');
