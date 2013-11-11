/* The ContentHandler must be constructed with a connected db */
function PageHandler (db) {
    "use strict";

    this.displayAboutPage = function(req, res, next) {
        "use strict";
	var page = req.params.page;


        return res.render(page, {
            title: page,
        });
    }

}

module.exports = PageHandler;
