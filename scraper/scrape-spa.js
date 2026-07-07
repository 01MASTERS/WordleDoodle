const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to home page...");
  await page.goto('https://word-wala-game-f7yi.vercel.app/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const homeHtml = await page.evaluate(() => document.body.innerHTML);
  fs.writeFileSync('home.html', homeHtml);
  console.log("Saved home.html");

  // Try to find links or buttons
  const elements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button')).map(el => ({
      text: el.innerText,
      href: el.href || null,
      className: el.className
    }));
  });
  fs.writeFileSync('elements.json', JSON.stringify(elements, null, 2));
  console.log("Saved elements.json");

  // If there's a button/link for local play, click it
  const localPlayBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('button, a')).find(el => 
      el.innerText.toLowerCase().includes('local') || 
      el.innerText.toLowerCase().includes('play')
    );
  });

  if (localPlayBtn) {
    console.log("Clicking local play button...");
    await localPlayBtn.click();
    await new Promise(r => setTimeout(r, 3000));
    const localHtml = await page.evaluate(() => document.body.innerHTML);
    fs.writeFileSync('local.html', localHtml);
    console.log("Saved local.html");
  } else {
    console.log("Could not find a local play button.");
  }

  await browser.close();
  console.log("Done.");
})().catch(err => {
  console.error(err);
  process.exit(1);
});
