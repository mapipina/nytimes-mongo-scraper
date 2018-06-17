const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();
require("./config/routes")(router);
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }

    else {
        console.log("mongoose connection was succesful");
    }
});

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});
