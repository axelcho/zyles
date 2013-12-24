function VocabDAO(db) {
    "use strict";

    if (false === (this instanceof VocabDAO)) {
        console.log('Warning: VocabDAO constructor called without "new" operator');
        return new VocabDAO(db);
    }

	var vocab = db.collection("vocabularay"); 	
	
	this.getVocab = function(callback){
		"use strict";		
		vocab.count(function(err, num){
		if (err) return callback(err, null);		
		
		var random = Math.floor(Math.random()*num);
		console.log(random);
		
		db.collection("vocabulary").findOne({ '_id' : random }, function(err, voc) {
            "use strict";

            if (err) return callback(err, null);
			
		console.log(voc);
        
            callback(null, voc);
        });	
		
		});
	}
}

module.exports.VocabDAO = VocabDAO;
