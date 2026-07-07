const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log("Navigating to Word Wala...");
  await page.goto('https://word-wala-game-f7yi.vercel.app/', { waitUntil: 'networkidle0' });
  
  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'word-wala-screenshot.png' });
  console.log("Screenshot saved as word-wala-screenshot.png");
  
  // Extract colors and basic info
  const info = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const colors = new Set();
    const fonts = new Set();
    
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      if(style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
        colors.add(style.backgroundColor);
      }
      if(style.color) colors.add(style.color);
      if(style.fontFamily) fonts.add(style.fontFamily);
    });
    
    return {
      title: document.title,
      colors: Array.from(colors).slice(0, 20),
      fonts: Array.from(fonts),
      html: document.body.innerHTML.substring(0, 1000)
    };
  });
  
  console.log("Info:", JSON.stringify(info, null, 2));
  
  fs.writeFileSync('word-wala-info.json', JSON.stringify(info, null, 2));
  
  await browser.close();
})();
