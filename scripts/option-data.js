/*
File for option data
will check in the money and have changable expiration date
*/

const request = require("request");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");

/**
 *@callback callbackForOptionsData   
 *@param {bool} err
 *@param {JSON} data
 * /

/**
 * 
 * @param {String} stockTicker 
 * @param {callbackForOptionsData} callback 
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

            var lengthOfEachRow = data[0].length;
            var puts = {};
            var calls = {};
            var indexOfSeperation = findIndexOfSeperation(data, lengthOfEachRow);
            //index of seperation represents the seperation index between calls and puts. If index = 31, it means next set starts at index 32.

            //first Set (calls)
            for(var i=0; i<indexOfSeperation; i++){
                var set1 = {
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
                calls[data[0][i]] = set1;
            }
            //second set (puts)
            for(var x=indexOfSeperation+1; x<lengthOfEachRow; x++){
                var set2 = {
                    tradeDate: data[1][x],
                    strikePrice: data[2][x],
                    lastPrice: data[3][x],
                    bids: data[4][x],
                    asks: data[5][x],
                    change: data[6][x],
                    percentChange: data[7][x],
                    volume: data[8][x],
                    openInterest: data[9][x],
                    impliedVolatility: data[10][x],
                };
                puts[data[0][x]] = set2;
            }
            returnData.calls = calls;
            returnData.puts = puts;
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

function findIndexOfSeperation(data, lengthOfEachRow){
    var index = 0;
    for (var i = 0; i < lengthOfEachRow; i++) {
        if (data[0][i].includes("Contract")) {
            index = i;
        }
    }
    return index;
}