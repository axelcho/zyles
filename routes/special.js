var VocabDAO = require('../vocab').VocabDAO
  , sanitize = require('validator').sanitize; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function SpecialHandler (db) {
    "use strict";

	var vocab = new VocabDAO(db);
	
    this.displayVocabularay = function(res) {
        "use strict";
		
		
	        vocabularay.getByRandom(function(err, results) {
            "use strict";

            if (err) return err;

            return res.render('vocabulary', {
                title: 'Vocabulary',				                
                item: results
            });
        });
    }

}

module.exports = SpecialHandler;
