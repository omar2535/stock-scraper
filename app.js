//Initialise the dependancies
var stockScraper = require('./current-data');
var historyScraper = require('./historical-data.js');

// setInterval(()=>{
//     stockScraper("BCE.TO");
// }, 3000);


// historyScraper.getHistoricalData("BCE.TO", new Date('May 06, 1996'), new Date(), "historical", "monthly", (data)=>{
//     console.log(data);
// });

// historyScraper("BCE.TO", new Date('May 06, 1996'), new Date(), "splits", "monthly", (data)=>{
//         console.log(data);
// });

stockScraper("BCE.TO", (data)=>{
    console.log(data);
});