const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

/*
DOCUMENTATION: 
date is always since start of inception until stated otherwise
    all date must be in time format of milliseconds since January 1, 1970, 00:00:00.
    To call the getHistorical data function, date1 and 2 must be passed in as new dates of format: new Date('MONTH DATE, YEAR')
    MUST CHECK STATUS OF RETURNED OBJECT BEFORE PARSIN, STATUS WILL BE ONE OF "FAIL", "SUCCESS"
*/



//Query Table to keep track of current enums for Yahoo Finance
var queryTable = {
    monthly: "1mo",
    weekly: "1wk",
    daily: "1d", 
    dividend: "div",
    historical: "history",
    splits: "split",
};

/** function for getting historical data
* @param {string} stockTicker (the stock ticker)
* @param {date} date1 (the date you want your data FROM)
* @param {date} date2 (the date you wnat your data UNTIL)
* @param {string} type (the type of data wanted: CHOOSE BETWEEN "DIVIDEND", "HISTORICAL", or "SPLITS")
* @param {string} frequency (the frequency between each data set: CHOOSE BETWEEN "DAILY", "WEEKLY", or "MONTHLY")
* @param {callback} callback (function to call after data is finished parsing, returnData is passed into callback)
*/
module.exports = (stockTicker, date1, date2, type, frequency, callback)=>{
    var url = constructQueryString(stockTicker, date1, date2, type, frequency);
    var returnData = {};
    // TODO: this needs to be a CSV parser
    request(url, function(err, respose, html){
        var requestStatusError = false;
        if(!err){
            var $ = cheerio.load(html);
            cheerioTableparser($);
            var data = $("#Col1-1-HistoricalDataTable-Proxy").parsetable(false, false, true);
            if(type == "dividend"){
                if(data[0].length >3){
                    returnData["status"] = "success";
                }else{
                    returnData["status"] = "fail";
                }
                for(var i=1; i<data[0].length-1; i++){
                    var name =  data[0][i];
                    var value = data[1][i];
                    returnData[name] = value;
                }
            }
            if(type == "historical"){
                if(data[0].length <=3){
                    returnData["status"] = "success";
                }else{
                    returnData["status"] = "fail";
                }
                for(var i=1; i<data[0].length-1; i++){
                    var name =  data[0][i];
                    //make sure no overwritten data from dividend dates
                    if(!data[1][i].includes("Dividend")){
                        var value = {
                            open: data[1][i],
                            high: data[2][i],
                            low:  data[3][i],
                            close: data[4][i],
                            adjustedClose: data[5][i],
                            volume: data[6][i],
                        };
                        returnData[name] = value;
                    }
                }
            }
            if(type == "splits"){
                if(data[0][1]=="No Split"){
                    returnData["status"] = "fail";
                }else{
                    returnData["status"] = "success";
                }
                for(var i=1; i<data[0].length-1; i++){
                    var name =  data[0][i];
                    var value = data[1][i];
                    returnData[name] = value;
                }
            }    
        }else{
            requestStatusError = true;
        }
        callback(requestStatusError, returnData);
    });
};


//function for constructing query string
function constructQueryString(stockTicker, date1, date2, type, frequency){
    //Object for all query data
    //Must be contructed before call to get webpage
    var querySettings = {
        fromDate: Math.floor(date1.getTime() / 1000),
        toDate: Math.floor(date2.getTime() / 1000),
        show: queryTable[type],
        frequency: queryTable[frequency],
    };
    //var URL = "https://ca.finance.yahoo.com/quote/" + stockTicker + "/history?period1=" + querySettings.fromDate+ "&period2="+querySettings.toDate+"&interval"+querySettings.frequency+"&filter="+querySettings.show+"&frequency="+querySettings.frequency;
    var URL = "https://ca.finance.yahoo.com/quote/BCE.TO/history?period1=831355200&period2=1522296000&interval=1mo&filter=history&frequency=1mo";
    console.log(`the url is: ${URL}`);
    return URL;
}



