const puppeteer = require('puppeteer')
const fs = require('fs/promises');//sing promises version of fs so to avoid the messy callbacks and use benefits of promises
const { it } = require('node:test');
/*Puppeteer works on promise based function.hence use asynchronous functions!*/

const cron = require("node-cron");

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
    const photos =await page.$$eval("img",(imgs)=>{
        return imgs.map(x=>x.src)
    }) 

    for(const photo of photos){
        const imagepage= await page.goto(photo)
        await fs.writeFile(photo.split("/").pop(),await imagepage.buffer())
    }

    await fs.writeFile("cats.txt", names.join("\n"));




    // const names = ['red','orange','yellow'];
    // await fs.writeFile("names.txt",names.join("\n"));
    await browser.close()

}
// scrapeNames();

// simulating clicking a button 

async function clickSimulation(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto("https://learnwebcode.github.io/practice-requests/");


    await page.click("#clickme");
    const clickedData = await page.$eval("#data",element=>element.textContent)
    console.log(clickedData)

    browser.close();
}

// clickSimulation();


//simulating submitting a form

async function submitFormAndGetData(){
    const  browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto("https://learnwebcode.github.io/practice-requests/");


    await page.type("#ourfield","blue")
    
    await Promise.all([await page.click("#ourform button"),
    await page.waitForNavigation()])

    const info = await page.$eval("#message",el=>el.textContent)

    console.log(info);
    fs.writeFile("secret.txt",info)
    browser.close()
}

// submitFormAndGetData()

// scheduling the task and automating it
// setInterval(submitFormAndGetData,5000);

// But for automating it as like : 5th day of every week , etc :

cron.schedule("*/5*****",submitFormAndGetData)
