const puppeteer = require('puppeteer');

(async () => {

const browser=await puppeteer.launch();

    const page=await browser.newPage();
    await page.goto('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-1',{waitUntil:'networkidle2'});
 
var allStars=[];
  allStars=allStars.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));
    

let url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-\i'
 let index=await page.evaluate(() =>

    document.querySelector('div.item-list ul.pager li.last').previousElementSibling.innerText);

 
   for (i = 1; i <= index; i++)
{
	url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i;
	
	    await page.goto(url,{waitUntil:'networkidle2'});
       allStars= allStars.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));

}
url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin';
	
	    await page.goto(url,{waitUntil:'networkidle2'});
var oneStar=[];

oneStar=oneStar.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));
    

index=await page.evaluate(() =>

    document.querySelector('div.item-list ul.pager li.last').previousElementSibling.innerText);


   for (i = 1; i <= index; i++)
{
	url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/page-'+i;
	
	    await page.goto(url,{waitUntil:'networkidle2'});
       oneStar= oneStar.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));

       

      
    
}
url='https://restaurant.michelin.fr/restaurants/france/restaurants-2-etoile-michelin';
	
	    await page.goto(url,{waitUntil:'networkidle2'});

var twoStars=[];
twoStars.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));

index=await page.evaluate(() =>

    document.querySelector('div.item-list ul.pager li.last').previousElementSibling.innerText);


   for (i = 1; i <= index; i++)
{
	url='https://restaurant.michelin.fr/restaurants/france/restaurants-2-etoile-michelin/page-'+i;
	
	    await page.goto(url,{waitUntil:'networkidle2'});
       twoStars= twoStars.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));

       
    
}
url='https://restaurant.michelin.fr/restaurants/france/restaurants-3-etoile-michelin';
	
	    await page.goto(url,{waitUntil:'networkidle2'});


var threeStars=[];

threeStars.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));
index=await page.evaluate(() =>

    document.querySelector('div.item-list ul.pager li.last').previousElementSibling.innerText);


   for (i = 1; i <= 2; i++)
{
	url='https://restaurant.michelin.fr/restaurants/france/restaurants-3-etoile-michelin/page-'+i;
	
	    await page.goto(url,{waitUntil:'networkidle2'});
       threeStars= threeStars.concat(await page.evaluate(() =>

    Array.from(document.querySelectorAll("div.panel-pane-inside div.poi_card-display-title")).map(compact => compact.innerText)));

       
     
      
    
}

     
   await page.goto('https://www.relaischateaux.com/fr/destinations/europe/france',{waitUntil:'networkidle2'});

 /* let Restaurants=await page.evaluate(() =>
Array.from(document.querySelectorAll('div.hotelQuickView h3.mainTitle3 a span')).map(compact => compact.innerText));*/

  var Resto=[];

 Resto=Resto.concat(await page.evaluate(() =>
Array.from(document.querySelectorAll('div.hotelQuickView h3.mainTitle3 a span')).map(compact => compact.innerText)));


      
try{

let indexList=await page.evaluate(() => document.querySelectorAll('ul.pagination li').length);


while(indexList >0)
{


await page.$$eval('ul.pagination li.next a', elements => elements[0].click());
await page.waitFor(4000);


     /* Restaurants= Restaurants + await page.evaluate(() =>
Array.from(document.querySelectorAll('div.hotelQuickView h3.mainTitle3 a span')).map(compact => compact.innerText));*/

/*Resto.push(await page.evaluate(() =>
Array.from(document.querySelectorAll('div.hotelQuickView h3.mainTitle3 a span')).map(compact => compact.innerText)));*/




Resto=Resto.concat(await page.evaluate(() =>
Array.from(document.querySelectorAll('div.hotelQuickView h3.mainTitle3 a span')).map(compact => compact.innerText)));




      //let doc=await page.evaluate(() => document.querySelector('li.current').innerText);

//console.log(doc);
indexList--;
}
}
catch
{

}


/*for(i=0;i<Resto.length;i++)
{
  console.log(Resto[i]);
}
console.log(Resto.length);

console.log("------------------------------------------------");
for (i = 0; i < allStars.length; i++) { 
	console.log(allStars[i]);
  
}
console.log("------------------------------------------------");
for (i = 0; i < oneStar.length; i++) { 
	console.log(oneStar[i]);
  
}
    console.log("------------------------------------------------");
    for (i = 0; i < twoStars.length; i++) { 
	console.log(twoStars[i]);
  
}
  console.log("------------------------------------------------");
    for (i = 0; i < threeStars.length; i++) { 
	console.log(twoStars[i]);
}*/
var RestoBon=[];
for(i=0;i<allStars.length;i++)
{
	for(j=0;j<Resto.length;j++)
	{
		if(Resto[j].includes(allStars[i]))
		{
             RestoBon=RestoBon.concat(Resto[j]);
		}
	}
}
var RestoOneStar=[];
for(i=0;i<oneStar.length;i++)
{
	for(j=0;j<Resto.length;j++)
	{
		if(Resto[j].includes(oneStar[i]))
		{
             RestoOneStar=RestoOneStar.concat(Resto[j]);
		}
	}
}
var RestoTwoStars=[];
for(i=0;i<twoStars.length;i++)
{
	for(j=0;j<Resto.length;j++)
	{
		if(Resto[j].includes(twoStars[i]))
		{
             RestoTwoStars=RestoTwoStars.concat(Resto[j]);
		}
	}
}
var RestoThreeStars=[];
for(i=0;i<threeStars.length;i++)
{
	for(j=0;j<Resto.length;j++)
	{
		if(Resto[j].includes(threeStars[i]))
		{
             RestoThreeStars=RestoThreeStars.concat(Resto[j]);
		}
	}
}


for(i=0;i<RestoOneStar.length;i++)
{
	for(j=i+1;j<RestoOneStar.length;j++)
	{
		if(RestoOneStar[j]==RestoOneStar[i])
		{
             RestoOneStar.splice(i,1);
		}
	}
}
//console.log(Resto.length);
//console.log(Resto);

console.log(RestoOneStar);
console.log(RestoTwoStars);
console.log(RestoThreeStars);

await browser.close();
})();


























