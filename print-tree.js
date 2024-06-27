const fs = require('fs');
const path = require('path');

function printTree(dir, level = 0, expandSrc = false) {
  const prefix = '│   '.repeat(level);
  const files = fs.readdirSync(dir);
  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const isLast = index === files.length - 1;
    const connector = isLast ? '└── ' : '├── ';

    console.log(prefix + connector + file);

    if (stat.isDirectory()) {
      if (expandSrc && dir.includes('src')) {
        printTree(filePath, level + 1, expandSrc);
      } else if (dir === __dirname) {
        printTree(filePath, level + 1, file === 'src');
      }
    }
  });
}

console.log('.');
printTree(__dirname);
