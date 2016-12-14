var express = require('express'); // gebruikt de express serve module
    mongoose = require('mongoose');// // gebruikt mongoose voor db connectie net zoals bij entity framework.
    bodyparser = require('body-parser');// gebruikt body parser om binnenkomende data om te zetten naar json

var db;
if(process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/schoolAPI_test'); // connect met mongodb via moose op db schoolapi test.
else{
    db = mongoose.connect('mongodb://localhost/schoolAPI'); // connect met mongodb via moose op db schoolapi .
}
var CD = require('./Models/cdModel'); // verteld dat CD een model is op basis van model cdmodel file.
var app = express(); // app is een naam waarmee we de express module gebruiken
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
cdRouter = require('./Routes/cdRoutes')(CD);


app.use('/api/CDs', cdRouter); // verteld express om cdrouter router te gebruiken op /api pad

app.get('/', function (req, res) { // main pad wat komt als je niet /api gebruikt. default
    res.send('Hello World!');
});
app.get('/test', function (req, res) { // wat gebeurt als je /test used.
    res.send("Dit is een test!");
});
app.listen(8000, function () { //  zet express service aan op poort 3000 zodat req inkomen.
    console.log("Gulp listening on port 8000!");
});

module.exports =app;