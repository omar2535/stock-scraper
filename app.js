
//dependancies for API server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.use(express.static(path.join(__dirname + "/public")));

app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

var PORT = (process.env.PORT || 3000);

//wait for start
app.listen(PORT, ()=>{
    console.log(`App running on ${PORT}`);
});


const apiRoutes = require("./routes/api-routes");
const mainRoutes = require("./routes/main-routes");
app.use('/api', apiRoutes);
app.use('/', mainRoutes);


