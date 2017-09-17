//Dependencies
//*****************************************/
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Express Server
//*****************************************/
var app = express();
var PORT = 3000;

//Express app handling data
//*****************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));


//Routing
//*****************************************/

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
    console.log("Home page hit!");
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
    console.log("Survey page hit!");
});



//Start Server
//*****************************************/
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});