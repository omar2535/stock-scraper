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
    console.log(query);
    console.log(req.query);
    switch(query){
        case "stock":
            stockHandler(req.query, req, res);
            break;
        default:
            break;
    }

});

//passed symbol in query string
function stockHandler(params, req, res){
    var ticker = params.symbol;
    stockScraper(ticker, (err, data) => {
        res.send(data);
    });
}

function historyHandler(params, req, res){

}

function financialsHandler(params, req, res){

}

function optionsHandlder(params, req, res){

}


