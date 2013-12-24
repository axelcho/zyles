function VocabDAO(db) {
    "use strict";

    if (false === (this instanceof VocabDAO)) {
        console.log('Warning: VocabDAO constructor called without "new" operator');
        return new VocabDAO(db);
    }

	var vocab = db.collection("vocabularay"); 	
	
	this.getVocab = function(callback){
		"use strict";
		var count = vocab.count();
		console.log(count);
		
		console.log("calling vocabulary");
		var random = Math.floor(Math.random()*5014);

		
		db.collection("vocabulary").findOne({ '_id' : random }, function(err, voc) {
            "use strict";

            if (err) return callback(err, null);
			
			console.log(voc);
        
            callback(null, voc);
        });	
	}
}

module.exports.VocabDAO = VocabDAO;
