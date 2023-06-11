const puppeteer=require("puppeteer");
// const fs = require("fs/promises");
const { EventEmitter } = require("stream");
const url = "https://scrapeme.live/shop/";
process.setMaxListeners(47); // Increase the listener limit to 15
const fs = require('fs');

async function scrapeFullPage(){
    const browser = await puppeteer.launch(`headless: "new"`);
    const page = await browser.newPage();
    await page.goto(url)

    await page.screenshot({path:"pokemonpg.png",fullPage:true});
    await browser.close()
}

// scrapeFullPage();

async function getNamesOfPokemons(pageNum){
    const BASE_URL = 'https://scrapeme.live/shop/page'
    const browser = await puppeteer.launch(`headless: "new"`);
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/${pageNum}/`);
    console.log(`${BASE_URL}/${pageNum}/`)
    const namesOfPokemon = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll(".woocommerce-loop-product__title")).map(x=>{
            return x.textContent
        })
    })
    let savegard = await fs.readFile("pokemon.txt","utf-8")
    await fs.writeFile("pokemon.txt",savegard+"\n"+  namesOfPokemon.join("\n"));
    await browser.close();
}

// (async () => {
//     let i = 0;
//     for (i; i <= 47; i++) {
//       await getNamesOfPokemons(i);
//     }
//   })();

async function getPokemonImages(pageNum){
    const BASE_URL = 'https://scrapeme.live/shop/page'
    const browser = await puppeteer.launch(`headless: "new"`);
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/${pageNum}/`);
    console.log(`${BASE_URL}/${pageNum}/`)
    const imagesOfPokemon = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll("img")).map(x=>{
            return x.src
        })
    }) 
}


async function getPokemonImagesAndNames(pageNum){
    const BASE_URL = 'https://scrapeme.live/shop/page'
    const browser = await puppeteer.launch(`headless: "new"`);
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/${pageNum}/`);
    console.log(`${BASE_URL}/${pageNum}/`)

    const imagesOfPokemon = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll("img")).map(x=>{
            return x.src
        })
    })

    const namesOfPokemon = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll(".woocommerce-loop-product__title")).map(x=>{
            return x.textContent
        })
    })

    //this returns an array of Objects!

    let PokeInfo =  namesOfPokemon.map((name, i) => {
        return {
          name: name,
          imgsrc: imagesOfPokemon[i],
        };
      });
  
    let savedData = [];

    try {
      const fileContent = await fs.promises.readFile("pokemon.json", "utf-8");
      savedData = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading pokemon.json file:", error);
    }
  
    savedData.push(...PokeInfo);
    try {
      await fs.promises.writeFile("pokemon.json", JSON.stringify(savedData, null, 2));
      console.log("pokemon.json file has been updated.");
    } catch (error) {
      console.error("Error writing to pokemon.json file:", error);
    } 

}

(async () => {
    let i = 0;
    for (i; i <= 47; i++) {
      await getPokemonImagesAndNames(i);
    }
  })();

