var PostsDAO = require('../posts').PostsDAO
  , sanitize = require('validator').sanitize; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function PageHandler (db) {
    "use strict";

	var posts = new PostsDAO(db);
	
    this.displayPage = function(req, res, next) {
        "use strict";
	var page = req.params.page;

        return res.render(page, {
            title: page,
			username: req.username,
            myposts: results
        });
    }

}

module.exports = PageHandler;
