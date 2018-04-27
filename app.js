//Initialise the dependancies for scripts
var stockScraper = require('./scripts/current-data');
var historyScraper = require('./scripts/historical-data');
var financialScraper = require('./scripts/financial-data');
var optionsScraper = require('./scripts/option-data');

//dependancies for API server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));

var PORT = (process.env.PORT || 3000);

//wait for start
app.listen(PORT, ()=>{
    console.log(`App running on ${PORT}`);
});

//Query string must be in format /api/<option>?<param1=ans1>/<param2=ans2>
//For Stock In general, just pass Stock ticker
//For historical, need to pass start and end date
//for financials, just pass stock name
//for options, also just pass stock name

app.get('/api/:query', function(req, res){
    var query = req.params.query;
    //console.log(query);
    console.log(req.query);
    switch(query){
        case "stock":
            stockHandler(req.query, req, res);
            break;
        case "financials":
            financialsHandler(req.query, req, res);
            break;
        case "options":
            optionsHandlder(req.query, req, res);
            break;
        default:
            break;
    }

});

//passed symbol in query string
//ex: /api/stock?symbol="BCE.TO"
/**
 * 
 * @param {JSON} params 
 * @param {HTTP Request Object} req 
 * @param {HTTP Response Object} res 
 */
function stockHandler(params, req, res){
    var ticker = params.symbol;
    stockScraper(ticker, (err, data) => {
        console.log(`Sent stock data for ${ticker}`);
        res.send(data);
    });
}

//REQUIRES: type of data and ticker
//ex: /api/financials?symbol=BCE.TO&type=income
//one of three types: income, balance, or cash
//default to cash
function financialsHandler(params, req, res){
    var ticker = params.symbol;
    var datatype = params.type;
    if(!datatype){
        datatype = "income";
    }
    financialScraper(datatype, ticker, (err, data)=>{
        console.log(`Sent stock financials for ${ticker} with type ${datatype}`);
        res.send(data);
    });
}

//REQUIRES: date and ticker
//ex: api/options?symbol=IBM&date=2018-05-04
function optionsHandlder(params, req, res) {
    var ticker = params.symbol;
    var date = params.date;
    if(!date){
        //console.log("no date");
        date = "";
    }
    optionsScraper(ticker, date, (err, data)=>{
        console.log(`Sent options data for ${ticker}`);
        res.send(data);
    });
}

function historyHandler(params, req, res) {
    var ticker = params.symbol;
    
}

