const scrape = require("../scripts/scrape");
const createDate = require("../scripts/date");
const Headline = require("../models/Headline");

module.exports = {
	grab: function(cb) {
		scrape(function(data) {
			var articles = data;
			for (var i = 0; i < articles.length; i++) {
				articles[i].date = createDate();
				articles[i].saved = false;
			}
			Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
				cb(err, docs);
			});
		});
	},
	delete: function(query, cb) {
		Headline.remove(query, cb);
	},
	get: function(query, cb) {
		Headline.find(query)
		.sort({_id: -1})
		.exec(function(err, doc) {
			cb(doc);
		})
	},
	update: function(query, cb) {
		Headline.update({_id: query._id}, {
			$set: query
		}, {}, cb);
	}
}