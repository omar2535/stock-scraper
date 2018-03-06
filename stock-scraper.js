const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

//passes stock ticker to be searched for
module.exports = (stockTicker)=>{
        
    //Requests from the URL constructed
    request(constrctUrl(stockTicker), function(err, resp, html) {
        var $ = cheerio.load(html);
        if(checkSymbol($)){
            if (!err){
                var $ = cheerio.load(html);
                var priceData = getPriceData($);
                console.log(priceData.price);
                console.log(priceData.dayChangePrice);
                console.log(priceData.dayChangePercent);
                console.log(getStatistics($));
            }
        }else{
            console.log("invalid ticker symbol");
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


//returns all statistics data in JSON format
var getStatistics = function($){
    cheerioTableparser($);
    var data = $('.table-qsp-stats').parsetable(false, false, true);
    var returnData = {};
    
    for(var i=0; i<data[0].length; i++){
        var name =  data[0][i];
        var value = data[1][i];
        returnData[name] = value;
    }
    return returnData;
};

//Checks if stock ticker symbol is valid
var checkSymbol = function($){
    if(getPriceData($).price.length != 0 && getPriceData($).dayChangePrice.length != 0){
        return true;
    }
    return false;
};

//Constructs URL to be requested
var constrctUrl = function(ticker){
    var URL = "https://ca.finance.yahoo.com/quote/" + ticker + "/key-statistics?";
    return URL; 
};