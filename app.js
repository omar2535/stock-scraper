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


app.get('/api:query', function(req, res){
    var query = req.params.query;
    console.log(query);
});