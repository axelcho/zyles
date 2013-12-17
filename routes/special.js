var VocabDAO = require('../vocab').VocabDAO
  , sanitize = require('validator').sanitize; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function SpecialHandler (db) {
    "use strict";

	var vocab = new VocabDAO(db);
	
    this.displayVocabularay = function(req, res, next) {
        "use strict";
		
		
	        vocabularay.getByRandom(function(err, results) {
            "use strict";

            if (err) return next(err);

            return res.render('vocabulary', {
                title: 'Vocabulary',				
                username: req.username,
                item: results
            });
        });
    }

}

module.exports = SpecialHandler;
