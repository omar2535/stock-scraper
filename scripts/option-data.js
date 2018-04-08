/*
File for option data
will check in the money and have changable expiration date
*/

const request = require("request");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");


module.exports = (stockTicker, callback)=>{
    let URL = constructURL(stockTicker);
    let returnData = {};
    let requestStatusError = false;

};



//function for constructing URL
//Must be contructed before call to get webpage
function constructURL(stockTicker) {
    let URL = "";
    URL = `https://ca.finance.yahoo.com/quote/${stockTicker}/options?p=${stockTicker}`;
    console.log(URL);
    return URL;
}