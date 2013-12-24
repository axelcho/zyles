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
		
			var randomnum = Math.floor(Math.random()*num);
			console.log(randomnum);
		
			vocab.findOne({ '_id' : randomnum }, function(err, voc) {
				"use strict";

				if (err) return callback(err, null);
			
				console.log(voc);
        
				callback(null, voc);
			});	
		
		});
	}
	
	
	
	
}

module.exports.VocabDAO = VocabDAO;
