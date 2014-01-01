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

	this.addVocabulary = function(req, res, next) {
		"use strict";
		
		var word = req.body.word
		var part = req.body.part
		var definition = req.body.definition
		
		voc.putVocab(word, part, definition, function(err, word){
			"use strict";
			if (err) return next(err);
			return res.redirect("/vocabulary/" + word)
		});
	
	}
	
	this.displayAddVocab = function(req, res, next) {
		"use strict";
		
		if (!req.username || req.username != "Seong") return res.redirect("/vocabulary");
		
		return res.render('addvocab_template', {
			word: "",
			part: "",
			definition: ""
			});
	
	}
}

module.exports = SpecialHandler;
