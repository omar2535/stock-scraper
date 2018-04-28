//Initialise the dependancies for scripts
var stockScraper = require('../scripts/current-data');
var historyScraper = require('../scripts/historical-data');
var financialScraper = require('../scripts/financial-data');
var optionsScraper = require('../scripts/option-data');

//Other Dependancies
const bodyParser = require('body-parser');
const apiRouter = require('express').Router();

apiRouter.get('/:query', function (req, res) {
    var query = req.params.query;
    //console.log(query);
    console.log(req.query);
    switch (query) {
        case "stock":
            stockHandler(req.query, req, res);
            break;
        case "financials":
            financialsHandler(req.query, req, res);
            break;
        case "options":
            optionsHandlder(req.query, req, res);
            break;
        case "historical":
            historyHandler(req.query, req, res);
            break;
        default:
            res.send("<h1> Invalid query string </h1>");
            break;
    }

});

module.exports = apiRouter;

//passed symbol in query string
//ex: /api/stock?symbol="BCE.TO"
/**
 * 
 * @param {JSON} params 
 * @param {HTTP Request Object} req 
 * @param {HTTP Response Object} res 
 */
function stockHandler(params, req, res) {
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
function financialsHandler(params, req, res) {
    var ticker = params.symbol;
    var datatype = params.type;
    if (!datatype) {
        datatype = "income";
    }
    financialScraper(datatype, ticker, (err, data) => {
        console.log(`Sent stock financials for ${ticker} with type ${datatype}`);
        res.send(data);
    });
}

//REQUIRES: date and ticker
//ex: api/options?symbol=IBM&date=2018-05-04
function optionsHandlder(params, req, res) {
    var ticker = params.symbol;
    var date = params.date;
    if (!date) {
        date = "";
    }
    optionsScraper(ticker, date, (err, data) => {
        console.log(`Sent options data for ${ticker}`);
        res.send(data);
    });
}

//REQUIRES: start date, end date and ticker
//ex: api/historical?symbol=IBM&from=2016-07-18&to=2017-07-07
function historyHandler(params, req, res) {
    var ticker = params.symbol;
    var from = params.from;
    var to = params.to;
    var type = params.type;
    var frequency = params.frequency;
    historyScraper(ticker, to, from, type, frequency, (err, data) => {
        res.send(data);
    });
}



