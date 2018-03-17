const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

/*
DOCUMENTATION: 
date is always since start of inception until stated otherwise
    all date must be in time format of milliseconds since January 1, 1970, 00:00:00.
    To call the getHistorical data function, date1 and 2 must be passed in as new dates of format: new Date('MONTH DATE, YEAR')
*/

module.exports = {
    getHistoricalData,
}
//Query Table to keep track of current enums for Yahoo Finance
var queryTable = {
    monthly: "1mo",
    weekly: "1wk",
    daily: "1d", 
    dividend: "div",
    historical: "history",
    splits: "split",
}

/** function for getting historical data
* @param {string} stockTicker (the stock ticker)
* @param {date} date1 (the date you want your data FROM)
* @param {date} date2 (the date you wnat your data UNTIL)
* @param {string} type (the type of data wanted: CHOOSE BETWEEN "DIVIDEND", "HISTORICAL", or "SPLITS")
* @param {string} frequency (the frequency between each data set: CHOOSE BETWEEN "DAILY", "WEEKLY", or "MONTHLY")
*/
function getHistoricalData (stockTicker, date1, date2, type, frequency){
    var url = constructQueryString(stockTicker, date1, date2, type, frequency);
}

//function for constructing query string
function constructQueryString(stockTicker, date1, date2, type, frequency){
    //Object for all query data
    //Must be contructed before call to get webpage
    var querySettings = {
        fromDate: Math.floor(date1.getTime() / 1000),
        toDate: Math.floor(date2.getTime() / 1000),
        show: queryTable[type],
        frequency: queryTable[frequency],
    }
    var URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/history?period1=" + querySettings.fromDate+ "&period2="+querySettings.toDate+ "&filter="+querySettings.show+"&frequency="+querySettings.frequency;
    console.log(`the url is: ${URL}`);
}



