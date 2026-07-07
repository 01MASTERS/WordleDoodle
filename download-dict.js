const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const words = data.split('\n').filter(w => w.length >= 3).map(w => w.toUpperCase());
    const fileContent = `export const COMMON_WORDS = new Set(${JSON.stringify(words)});\n`;
    fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'wordList.ts'), fileContent);
    console.log('Downloaded and saved ' + words.length + ' words.');
  });
}).on('error', err => {
  console.error(err);
});
