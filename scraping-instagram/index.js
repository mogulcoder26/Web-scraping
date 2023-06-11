const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const url = `https://www.instagram.com/`

// async function scrapeInsta(){
//     const browser =await  puppeteer.launch()
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.screenshot({path:"instahome.png",fullPage:true});
    
//     await page.type(`div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1xmf6yo.x1e56ztr.x540dpk.x1m39q7l.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1 button._acan._acap._acas._aj1-`,"soubhikgon_");
//     await page.type(`input[name="password"]._aa4b._add6._ac4d`,"We1c0me#45")
//     await Promise.all([await page.click("._acan _acap _acas _aj1-"),
//     await page.waitForNavigation()])
//     await page.screenshot({path:"afterLogin.png",fullPage:true});

//     await browser.close();

// }

// scrapeInsta()


// username
// <input aria-label="Phone number, username, or email" aria-required="true" autocapitalize="off" autocorrect="off" maxlength="75" class="_aa4b _add6 _ac4d" dir="" type="text" value="" name="username">

// pass
/* <input aria-label="Password" aria-required="true" autocapitalize="off" autocorrect="off" class="_aa4b _add6 _ac4d" type="password" value="" name="password"> */




async function ScrapeProfile(){
    const url = "https://www.instagram.com/soubhikgon_/";
    const browser =await  puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path:"instahome.png",fullPage:true});
    const posts = await page.evaluate(()=>{
        document.querySelector("._ac2a").compareDocumentPosition(x=>{
            return x.textContent})
    })
    console.log(`There were ${posts} in this id!`);
}
ScrapeProfile()