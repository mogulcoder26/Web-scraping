const puppeteer = require('puppeteer')

/*Puppeteer works on promise based function.hence use asynchronous functions!*/

async function takeScreenshot(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://en.wikipedia.org/wiki/JavaScript");
    await page.screenshot({path:"wikipedia.png",fullPage:true});
    await browser.close()
}

takeScreenshot();