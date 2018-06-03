// Dependencies
var express = require("express");
var exphbs  = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");

// Scraping dependencies
// var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT | 3000;

// Initialize Express
var app = express();


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
