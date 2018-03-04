const request = require('request');
const cheerio = require('cheerio');


//passes stock ticker to be searched for
module.exports = (stockTicker)=>{

    
    //Requests from the URL constructed
    request('https://ca.finance.yahoo.com/quote/%5EGSPC?p=^GSPC', function(err, resp, html) {
        if (!err){
            var $ = cheerio.load(html);
            var priceData = getPriceData($);
            console.log(priceData.price);
            console.log(priceData.dayChangePrice);
            console.log(priceData.dayChangePercent);
      }
    });
};

//takes the jquery element and returns price data in JSON 
var getPriceData = function($){
    var comparitor = "watchlist";
    var priceBeforeTruncation =  $('#quote-header-info').text();
    var stringForPriceInfo = priceBeforeTruncation.slice(priceBeforeTruncation.indexOf(comparitor) + comparitor.length);
    var price = stringForPriceInfo.substring(0, stringForPriceInfo.indexOf("+"));
    var dayChangeInPrice = stringForPriceInfo.substring(stringForPriceInfo.indexOf("+"), stringForPriceInfo.indexOf("("));
    var dayChangeInPercent = stringForPriceInfo.substring(stringForPriceInfo.indexOf("(")+1, stringForPriceInfo.indexOf(")")-1);

    var priceData = {
        price: price,
        dayChangePrice: dayChangeInPrice,
        dayChangePercent: dayChangeInPercent,
    };
    return priceData;
};


//Constructs URL to be requested
var constrctUrl = function(ticker){
    //stub
};