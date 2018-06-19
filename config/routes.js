const scrape = require("../scripts/scrape");
const headCont = require("../controllers/headlines");
const noteCont = require("../controllers/notes");

module.exports = function(router) {
	router.get("/", function (req, res) {
		res.render("home");
	});
	router.get("/saved", function(req, res) {
		res.render("saved");
	});

	router.get("/api/fetch", function(req, res) {
		headCont.fethc(function(err, docs) {
			if (!docs || docs.insertedCount === 0) {
				res.json({
					message: "No new articles today."
				});
			}
			else {
				res.json({
					message: "Added " + docs.insertedCount + "new articles"
				});
			}
		});
	});
}