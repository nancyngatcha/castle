const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
var Hotels = [];
var Restaurants = [];

function RelaisScrapping(){
    request('https://www.relaischateaux.com/us/site-map/etablissements', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            const hotels = $('#countryF');
        //const france = hotels.next().html();
        //console.log(france);
        const list = hotels.next().first().children().next();
        //console.log(list.html());
        list.children().children().each(function(i, element){
            var a = $(this);
            var title = a.text();
            var url = a.attr('href');
            var str = title.replace(/\s\s+/g, " ")
            // Our parsed meta data object
            var metadata = {
                title: str,
                url: url
            }
            Hotels.push(metadata);
        })
    }
    for(var i = 0; i < Hotels.length; i++){
        var hotel = Hotels[i]
        /* SCRAPING THE HOTEL PAGES*/
        request(hotel.url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var s = cheerio.load(html);
                const rest = s('.jsSecondNavMain');
                const list = rest.children().next().find('a');
                var urlRestaurant = list.attr('href');
                //console.log(urlRestaurant);

                if(typeof urlRestaurant !== 'undefined' && urlRestaurant.match("restaurant")){

                    // THIRD REQUEST
                    request(urlRestaurant, function (error, response, html) {
                        if (!error && response.statusCode == 200) {
                            var c = cheerio.load(html);
                            const restos = c('.jsSecondNavSub');
                            if(restos.length >0){
                                const listrestos = restos.children();
                                //console.log(restos.html());
                                listrestos.each(function(i, element){
                                    var l = c(this);
                                    //console.log(l.html());

                                    var nomRestaurant = l.find('a').first().text();
                                    //console.log(nomRestaurant);
                                    var string = nomRestaurant.replace(/\s\s+/g, " ");
                                    //console.log(string);
                                    Restaurants.push({namehotel: hotel.title, urlhotel: hotel.url, restaurant: string, url : urlRestaurant})
                                })
                            }
                            else{
                                const restos = c('.hotelTabsHeaderTitle');
                                var nomRestaurant = restos.find('h3').text();
                                //console.log(nomRestaurant);
                                var string = nomRestaurant.replace(/\s\s+/g, " ");
                                //console.log(string);
                                Restaurants.push({namehotel: hotel.title, urlhotel: hotel.url, restaurant: string, url : urlRestaurant})
                            }
                        }
                    });
                };
            }
            //getsize();
        });
    };
});
};

function getsize(){
    console.log(Hotels.length)
    console.log(Restaurants.length)
}

RelaisScrapping()
setTimeout(getsize, 30000);