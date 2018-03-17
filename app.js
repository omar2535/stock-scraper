//Initialise the dependancies
var stockScraper = require('./current-data');
var historyScraper = require('./historical-data.js');

// setInterval(()=>{
//     stockScraper("BCE.TO");
// }, 3000);


historyScraper.getHistoricalData("BCE.TO", new Date('May 1, 2008'), new Date(), "dividend", "monthly");
