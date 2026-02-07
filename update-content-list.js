// Auto-update content files list in content-loader.js
const fs = require('fs');
const path = require('path');

const contentDir = './content';
const loaderFile = './content-loader.js';

// Get all .md files from content directory
const mdFiles = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md'))
    .sort();

console.log('Found markdown files:', mdFiles);

// Read the content-loader.js file
let loaderContent = fs.readFileSync(loaderFile, 'utf8');

// Build the new contentFiles array
const filesArray = mdFiles.map(file => `    '${file}'`).join(',\n');
const newContentFiles = `const contentFiles = [\n${filesArray}\n];`;

// Replace the contentFiles array
const regex = /const contentFiles = \[[\s\S]*?\];/;
loaderContent = loaderContent.replace(regex, newContentFiles);

// Write back to file
fs.writeFileSync(loaderFile, loaderContent);

console.log('✅ Updated content-loader.js with', mdFiles.length, 'files');
console.log('Files added:', mdFiles.join(', '));
