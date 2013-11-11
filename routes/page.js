/* The ContentHandler must be constructed with a connected db */
function PageHandler (db) {
    "use strict";

    var posts = new PostsDAO(db);

    this.displayAboutPage = function(req, res, next) {
        "use strict";
	var page = req.params.page;


        return res.render(page, {
            title: page,
        });
    }

}

module.exports = PageHandler;
