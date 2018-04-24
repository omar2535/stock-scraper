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
            console.log(data);

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