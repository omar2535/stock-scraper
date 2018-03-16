//Initialise the dependancies
var stockScraper = require('./current-data');
var historyScraper = require('./historical-data.js');

// setInterval(()=>{
//     stockScraper("BCE.TO");
// }, 3000);


//stockScraper("BCE.TO");
historyScraper.getHistoricalData("BCE.TO");