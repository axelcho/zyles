function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function VocabDAO(db) {
    "use strict";

    if (false === (this instanceof VocabDAO)) {
        console.log('Warning: VocabDAO constructor called without "new" operator');
        return new VocabDAO(db);
    }

	var vocab = db.collection("vocabulary"); 	
	
	this.getVocab = function(callback){
		"use strict";		
		vocab.count(function(err, num){
			if (err) return callback(err, null);

			var words = new Array();
			
			for (var i = 1; i<5; i++){		
				var pick = Math.floor(Math.random()*5014);
				if (inArray(pick, words))
				{
				i = i -0;				
				}
				else
				{
				words.push(pick); 
				}
			}
			
			
			
			
			console.log(words); 
		
			vocab.find({ '_id' : {$in:words }}).toArray(function(err, voc) {
				"use strict";

				if (err) return callback(err, null);
			
				console.log(voc);
        
				callback(null, voc);
			});	
		
		});
	}
	
	
	
	
}

module.exports.VocabDAO = VocabDAO;
