/*
File for option data
will check in the money and have changable expiration date
*/

const request = require("request");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");


module.exports = (stockTicker, callback)=>{
    let URL = constructURL(dataType, stockTicker);
    let returnData = {};
    let requestStatusError = false;

};
//function for constructing URL
//Must be contructed before call to get webpage
function constructURL(dataType, stockTicker) {
    let URL = "";
    switch (dataType) {
        case "income":
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/financials?p=" + stockTicker;
            break;
        case "balance":
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/balance-sheet?p=" + stockTicker;
            break;
        case "cash":
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/cash-flow?p=" + stockTicker;
            break;
        default:
            console.log("type was invalid, defaulting to financials");
            URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/financials?p=" + stockTicker;
            break;
    }
    return URL;
}