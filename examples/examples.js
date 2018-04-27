//Initialise the dependancies for scripts
var stockScraper = require('../scripts/current-data');
var historyScraper = require('../scripts/historical-data');
var financialScraper = require('../scripts/financial-data');
var optionsScraper = require('../scripts/option-data');

// historyScraper.getHistoricalData("BCE.TO", new Date('May 06, 1996'), new Date(), "historical", "monthly", (data)=>{
//     console.log(data);
// });

// historyScraper("BCE.TO", new Date('May 06, 1996'), new Date(), "historical", "monthly", (err,data)=>{
//         console.log(data);
// });

// stockScraper("BCE.TO", (err, data)=>{
//     console.log(data);
//     //console.log(err);
// });

// financialScraper("", "IBM", (err, data)=>{

// });

// stockScraper("BCE.TO", (err, data)=>{
//         console.log(data);
// });

optionsScraper("IBM", new Date("2018-05-04"),(err, data) => {
    console.log(data);
});
console.log(new Date("2018-05-04").getTime()/1000);
console.log(new Date(1525392000*1000));
console.log(new Date(1525996800*1000));

