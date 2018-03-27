const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

/** function for initializing financial data, all numbers will be in thousands
*@param {string} dataType specify one of 3 types: income, balance, or cash (stands for Income statement, Balance sheet, and Cash flow respectively)
*@param {string} stockTicker ticker for stock 
*@param {callback} callback that will be passed, contains err and data
*/
module.exports =(dataType, stockTicker, callback)=>{
    var URL = constructURL(dataType, stockTicker);
    var returnData = {};
    var requestStatusError = false;

    request(URL, (err, response, html)=>{
        if(!err){
            var $ = cheerio.load(html);
            cheerioTableparser($);
            var data = $('#Main').parsetable(false, false, true);
            
            for(var i = 1; i<data.length; i++){
                var dataAccum = {};
                for(var x=0; x<data[0].length; x++){
                    var name = data[0][x];
                    var value = data[i][x];
                    dataAccum[name] = value;
                }
                var date = data[i][0];
                returnData[date] = dataAccum;
            }
            console.log(returnData);
        }
        else{
            requestStatusError = true;
        }
    });
    callback(requestStatusError, returnData);
}





//function for constructing URL
//Must be contructed before call to get webpage
function constructURL(dataType, stockTicker){
    var URL = "";
    switch(dataType){
        case "income":
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/financials?p="+stockTicker;
            break;
        case "balance":
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/balance-sheet?p="+stockTicker;
            break;
        case "cash":
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/cash-flow?p="+stockTicker;
            break;
        default:
            console.log("type was invalid, defaulting to financials");
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/financials?p="+stockTicker;
            break;
    }
    return URL;
}