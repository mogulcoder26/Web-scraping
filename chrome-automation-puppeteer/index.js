const puppeteer = require('puppeteer')
const fs = require('fs/promises')//sing promises version of fs so to avoid the messy callbacks and use benefits of promises
/*Puppeteer works on promise based function.hence use asynchronous functions!*/

async function takeScreenshot() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://en.wikipedia.org/wiki/JavaScript");
    await page.screenshot({ path: "wikipedia.png", fullPage: true });
    await browser.close()
}

// takeScreenshot();

async function scrapeNames() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://learnwebcode.github.io/practice-requests/");
    //div.info > strong
    const names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".info strong")).map(x => {
            return x.textContent
        })
    })
//used for selecting multiple images
//Q.what is nodelist? 
    const photos = page.$$eval("img",(imgs)=>{
        return imgs.map(x=>x.src)
    }) 

    await fs.writeFile("cats.txt", names.join("\n"));




    // const names = ['red','orange','yellow'];
    // await fs.writeFile("names.txt",names.join("\n"));
    await browser.close()

}
scrapeNames();