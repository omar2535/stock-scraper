const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

/*
DOCUMENTATION: 
date is always since start of inception until stated otherwise
    all date must be in time format of milliseconds since January 1, 1970, 00:00:00.

*/

module.exports = {
    getHistoricalData,
}

//function for getting historical data
//REQUIRES: 
//  (STRING): requires stock ticker
//  (DATE), (DATE): date to start from, date to end from,
//  (STRING) the type of data wanted: Historical prices/Dividend/Stock Splits
//  (STRING) Frequency of the data : monthly, weekly, daily 
//RETURNS: 
//  (JSON): Historical data

function getHistoricalData (stockTicker, date1, date2, type, frequency){

    
    

}

var queryTable = {
    monthly: "1mo",
    weekly: "1wk",
    daily: "1d", 
    dividend: "div",
    historical: "history",
    splits: "split",
}

function contructQueryString(stockTicker, date1, date2, type, frequency){
    //Object for all query data
    //Must be contructed before call to get webpage
    var querySettings = {
        fromDate: Math.floor(date1.getTime() / 1000),
        toDate: Math.floor(date2.getTime() / 1000),
    }
}


