/*
File for option data
will check in the money and have changable expiration date
*/

const request = require("request");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");



/**
 * 
 * @param {Ticker For Stock} stockTicker 
 * @param {Callback Function(err, body)} callback 
 */
module.exports = (stockTicker, callback)=>{
    let URL = constructURL(stockTicker);
    let returnData = {};
    let requestStatusError = false;

    request(URL, (err, response, html)=>{
        if(!err){
            let $ = cheerio.load(html);
            cheerioTableparser($);
            var isAvailable = $('#Main').text();
            //if unavailble
            if(isAvailable == "Options data is not available."){
                returnData.status = "unavailble";
                callback(true, returnData);
                return;
            }
            //else availble
            var data = $("#Main").parsetable(false, false, true);
            var calls = {};
            for(var i=1; i<=30; i++){
                var set = {
                    tradeDate: data[1][i],
                    strikePrice: data[2][i],
                    lastPrice: data[3][i],
                    bids: data[4][i],
                    asks: data[5][i],
                    change: data[6][i],
                    percentChange: data[7][i],
                    volume: data[8][i],
                    openInterest: data[9][i],
                    impliedVolatility: data[10][i],
                };
                calls[data[0][i]] = set;
            }
            returnData.calls = calls;
            console.log(returnData);

        }

    });
};



//function for constructing URL
//Must be contructed before call to get webpage
function constructURL(stockTicker) {
    let URL = "";
    URL = `https://ca.finance.yahoo.com/quote/${stockTicker}/options?p=${stockTicker}`;
    console.log(URL);
    return URL;
}