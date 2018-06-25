$(document).ready(function() {
	var articleCont = $(".article-container");
	$(document).on("click", ".btn.save", handleArtSave);
	$(document).on("click", ".scrape-new", handleArtScrape);

	init();

	function init() {
		articleCont.empty();
		$.get("/api/headlines?saved=false")
		.then(function(data){
			if (data && data.length) {
				renderArticles(data);
			}
			else {
				renderEmpty();
			}
		});
	}

	function renderArticles(articles) {
		var articlePanels = [];
		for (var i = 0; i < articles.length; i++) {
			articlesPanels.push(createPanel(articles[i]));
		}
		articleCont.append(articlesPanels);
	}

	function createPanel(article) {
		var panel =
		$(["<div class='panel panel-default'>",
			"<div class='panel-heading'>",
			"<h3>",
			article.headline,
			"<a class='btn btn-success save'>",
			"Save Article",
			"</a>",
			"</h3>",
			"</div>",
			"<div class='panel-body'>",
			article.summary,
			"</div>",
			"</div"
			].join(""));
		panel.data("_id", article._id);
		return panel;
	}

	function renderEmpty() {
		var emptyAlert = 
		$(["<div class='alert alert-warning text-center'>",
			"<h4>Uh oh. Looks like we don't have any new articles.</h4>",
			"</div>",
			"<div class='panel panel-default'>",
			"<div class='panel-heading text-center'>",
			"<h3>What Would You Like To Do?</h3>",
			"</div>",
			"<div class='panel-body text-center'>",
			"<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
			"<h4><a href='/saved'>Go to Saved Articles</a></h4>",
			"</div>",
			"</div>"
			].join(""));
		articleCont.append(emptyAlert);
	}

	function handleArticalSave() {
		var articleToSave = $(this).parents(".panel").data();
		articleToSave.saved = true;
	}
})
