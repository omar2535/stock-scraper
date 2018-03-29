const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

//passes stock ticker to be searched for
/** 
* @param {string} StockTicker the stock ticker
* @param {callback} Callback contains return statistics of stock and has error check in front
**/
module.exports = (stockTicker, callback)=>{
    
    //Requests from the URL constructed
    request(constrctUrl(stockTicker), function(err, resp, html) {
        if (!err){
            let $ = cheerio.load(html);
            if(checkSymbol($)){
                //Do stuff if symbol is correct

                let $ = cheerio.load(html);
                let priceData = getPriceData($);
                console.log("Current price: ", priceData.price);
                console.log("Day change($): ", priceData.dayChangePrice);
                console.log("Day change(%): ", priceData.dayChangePercent);
                console.log(getStatistics($));
                
                let returnObject = {
                    currentPrice: priceData.price,
                    dayChangeInPercent: priceData.dayChangePercent,
                    dayChangeInPrice: priceData.dayChangePrice,
                    statistics: getStatistics($),
                };
                // return returnObject;
                callback(false,returnObject);
            }else{
                callback(true, "invalid ticker symbol");
            }
        }
    });
};

//takes the jquery element and returns price data in JSON 
let getPriceData = function($){
    let comparitor = "watchlist";
    let priceBeforeTruncation =  $('#quote-header-info').text();
    let stringForPriceInfo = priceBeforeTruncation.slice(priceBeforeTruncation.indexOf(comparitor) + comparitor.length);
    let price = stringForPriceInfo.substring(0, stringForPriceInfo.indexOf(".")+3);
    let dayChangeInPrice = stringForPriceInfo.substring(stringForPriceInfo.indexOf(".")+3, stringForPriceInfo.indexOf("("));
    let dayChangeInPercent = stringForPriceInfo.substring(stringForPriceInfo.indexOf("(")+1, stringForPriceInfo.indexOf(")")-1); 
    let priceData = {
        price: price,
        dayChangePrice: dayChangeInPrice,
        dayChangePercent: dayChangeInPercent,
    };
    
    return priceData;
};


//returns all statistics data in JSON format
let getStatistics = function($){
    cheerioTableparser($);
    let data = $('.table-qsp-stats').parsetable(false, false, true);
    let returnData = {};
    
    for(let i=0; i<data[0].length; i++){
        let name =  data[0][i];
        let value = data[1][i];
        returnData[name] = value;
    }
    return returnData;
};

//Checks if stock ticker symbol is valid
let checkSymbol = function($){
    if(getPriceData($).price.length != 0 && getPriceData($).dayChangePrice.length != 0){
        return true;
    }
    return false;
};


//Constructs URL to be requested from Yahoo Finance
let constrctUrl = function(ticker){
    let URL = "https://ca.finance.yahoo.com/quote/" + ticker + "/key-statistics?";
    return URL; 
};

