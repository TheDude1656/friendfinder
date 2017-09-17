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
app.use(express.static(__dirname + '/app/public'));

//Routing
//*****************************************/

//html routing
require("./app/routing/htmlRoutes.js")(app);

//api routing

require("./app/routing/apiRoutes.js")(app);



//Start Server
//*****************************************/
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});