//Initialise the dependancies
var stockScraper = require('./scripts/current-data');
var historyScraper = require('./scripts/historical-data');
var financialScraper = require('./scripts/financial-data');
var optionsScraper = require('./scripts/option-data');

// historyScraper.getHistoricalData("BCE.TO", new Date('May 06, 1996'), new Date(), "historical", "monthly", (data)=>{
//     console.log(data);
// });

// historyScraper("BCE.TO", new Date('May 06, 1996'), new Date(), "historical", "monthly", (err,data)=>{
//         console.log(data);
// });

// stockScraper("BCE.TO", (err, data)=>{
//     console.log(data);
//     console.log(err);
// });

// financialScraper("", "IBM", (err, data)=>{

// });

stockScraper("BCE.TO", (err, data)=>{
        console.log(data);
});

// optionsScraper("IBM", (err, dara)=>{

// });