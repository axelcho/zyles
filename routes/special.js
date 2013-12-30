var VocabDAO = require('../vocab').VocabDAO
   , sanitize = require('validator').sanitize; 

; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function SpecialHandler (db) {
    "use strict";

    var voc = new VocabDAO(db);

	//vocabulary special page
	
	this.displayVocabulary = function(req,res,next) {
		"use strict";
		voc.getVocab(function(err, results) {
            "use strict";

            if (err) return next(err);

            return res.render('vocabulary', {
                title: 'Vocabulary',				
                username: req.username,
                item: results,
				word: results.word
				
            });           
        });
		
	
	}

}

module.exports = SpecialHandler;
