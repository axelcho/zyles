function VocabDAO(db) {
    "use strict";

    if (false === (this instanceof VocabDAO)) {
        console.log('Warning: VocabDAO constructor called without "new" operator');
        return new VocabDAO(db);
    }

	var vocab = db.collection("vocabularay"); 	
	
	this.getVocab = function(callback){
<<<<<<< HEAD
		"use strict";		
		vocab.count(function(err, num){
			if (err) return callback(err, null);		
		
			var random = Math.floor(Math.random()*num);
			console.log(random);
=======
		"use strict";
		//console.log("calling vocabulary");
		
		db.collection("vocabulary").count(function(err, num){
		if (err) return callback(err, null);		
		
		//console.log(num); 
		
		var random = Math.floor(Math.random()*num);
		
		console.log(random);

>>>>>>> parent of 125cddd... vocab
		
			vocab.findOne({ '_id' : random }, function(err, voc) {
				"use strict";

				if (err) return callback(err, null);
			
				console.log(voc);
        
				callback(null, voc);
			});	
		
		});
	}
	
	
	
	
}

module.exports.VocabDAO = VocabDAO;
