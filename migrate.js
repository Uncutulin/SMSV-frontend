const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, 'src', 'app');
const srcPagesDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(srcPagesDir)) {
    fs.mkdirSync(srcPagesDir, { recursive: true });
}

function traverseAndMove(dir, baseRoute = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file !== 'api' && file !== 'fonts') {
                const newBaseRoute = path.join(baseRoute, file);
                const targetDir = path.join(srcPagesDir, newBaseRoute);
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }
                traverseAndMove(fullPath, newBaseRoute);
            }
        } else if (file === 'page.tsx') {
            const targetFile = path.join(srcPagesDir, baseRoute, 'index.tsx');
            fs.copyFileSync(fullPath, targetFile);
            console.log(`Copied ${fullPath} to ${targetFile}`);
        }
    });
}

traverseAndMove(srcAppDir);
console.log('Done migrating pages to src/pages/*/index.tsx');
