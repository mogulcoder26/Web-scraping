const puppeteer=require("puppeteer");
const fs = require("fs/promises");
const { EventEmitter } = require("stream");
const url = "https://scrapeme.live/shop/";
process.setMaxListeners(47); // Increase the listener limit to 15


async function scrapeFullPage(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    await page.screenshot({path:"pokemonpg.png",fullPage:true});
    await browser.close()
}

// scrapeFullPage();

async function getNamesOfPokemons(pageNum){
    const BASE_URL = 'https://scrapeme.live/shop/page'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/${pageNum}/`);
    const namesOfPokemon = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll(".woocommerce-loop-product__title")).map(x=>{
            return x.textContent
        })
    })
    let savegard = await fs.readFile("pokemon.txt","utf-8")
    await fs.writeFile("pokemon.txt",savegard+"\n"+  namesOfPokemon.join("\n"));
    await browser.close();
}

(async () => {
    let i = 0;
    for (i; i <= 47; i++) {
      await getNamesOfPokemons(i);
    }
  })();

