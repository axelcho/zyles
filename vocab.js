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
			
			for (var i = 0; i<4; i++){		
				var pick = Math.floor(Math.random()*num);
				if (inArray(pick, words))
				{
				i = i -0;				
				}
				else
				{
				words.push(pick); 
				}
			}			
		
			vocab.find({ '_id' : {$in:words }}).toArray(function(err, voc) {
				"use strict";

				if (err) return callback(err, null);
				
				var output = {}
				var answer = Math.floor(Math.random()*4);
				
				output.word = voc[answer].word;
				output.part = voc[answer].part;
				output.answer = answer +1; 

				var definition = new Array();
				
				for (var k=1; k<5; k++)
				{
				var def = {"id":k, "meaning":voc[k-1].definition};
				definition.push(def); 
				}			
			
				output.definition = definition;
				
				console.log(output);
        
				callback(null, output);
			});	
		
		});
	}
	
	this.getVocabSingle = function(needle, callback){
		"use strict";		
		
		vocab.count(function(err, num){
			if (err) return callback(err, null);

			var words = new Array();
			
			for (var i = 0; i<3; i++){		
				var pick = Math.floor(Math.random()*num);
				if (inArray(pick, words))
				{
				i = i -0;				
				}
				else
				{
				words.push(pick); 
				}
			}			
		
			vocab.find({'$or': [{'word': needle},  {'_id' : {'$in':words }}]}).toArray(function(err, voc) {
				"use strict";

				if (err) return callback(err, null);
				
				
				var answer = 0;
				var output = {}
				var definition = new Array();
				
				if (voc.length < 4){
				output.answer = 1;
				output.word = needle;
				output.part = "undefined";
				output.definition = ["The word " + needle + " is not defined in the database."];				
				}
				
				
				
				else
				
				{
				
				
				for (var k =0; k < 4; k++){				
				
					if (voc[k].word == needle) {
						output.answer = k+1;
						output.word = voc[k].word;
						output.part = voc[k].part;					
						}
					var def = {"id":k+1, "meaning": voc[k].definition};
					definition.push(def);					
				}			
				output.definition = definition;
				}
				
				callback(null, output);
			});	
		
		});
	}
	
	this.putVocab = function(word, part, definition, callback){
		"use strict";
		
		var newword = {"word": word,
					"part": part,
					"definition": definition}
					
	
		db.collection('vocabulary').insert(newword, function(err, inserted)
		{
			if (err) callback (err, null);
			callback (null, inserted); 
		});	
	}	
	
}

module.exports.VocabDAO = VocabDAO;
