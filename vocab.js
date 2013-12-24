function VocabDAO(db) {
    "use strict";

    if (false === (this instanceof VocabDAO)) {
        console.log('Warning: VocabDAO constructor called without "new" operator');
        return new VocabDAO(db);
    }

	var vocab = db.collection("vocabularay"); 	
	
	this.getVocab = function(callback){
		"use strict";
		console.log("calling vocabulary");
		
		db.collection("vocabulary").count(function(err, num){
		if (err) return callback(err, null);
		console.log(num);
		number = num; 
		});
		
		console.log(number);
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
