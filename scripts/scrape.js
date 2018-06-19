const request = require("request");
const cheerio = require("cheerio");

function scrape (cb) {
	request("http://www.nytimes.com", function(err, res, body) {
		var $ = cheerio.load(body);
		var articles = [];
		$(".story.theme-summary").each(function(i, element){
			var head = $(this).children(".story-heading").text().trim();
			var sum = $(this).children(".summary").text().trim();

			if(head && sum) {
				var headClean = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
				var sumClean = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

				var dataToAdd = {
					headline: headClean,
					summary: sumClean
				};
				articles.push(dataToAdd);
			}
		});
		cb(articles);
	});
};

module.exports = scrape;