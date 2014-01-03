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
				output.found = "yes";
				

        
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
				output.definition = [{"id": 1, "meaning": "The word " + needle + " is not defined in the database."}];
				output.notfound = "yes"

				
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
				output.found = "yes";
				}
				
				callback(null, output);
			});	
		
		});
	}
	
	this.putVocab = function(word, part, definition, callback){
		"use strict";
		
			db.collection('vocabulary').count(function(err, num){
			
			if (err) callback (err, null);
		
			var newword = {"_id": num, 
					"word": word,
					"part": part,
					"definition": definition}
					
	
			db.collection('vocabulary').insert(newword, function(err, inserted)
			{
			if (err) callback (err, null);
			callback (null, inserted); 
			});	
		});
	}	
	
	this.putGrammar = function(sentence, AC, AW, BC, BW, CC, CW, DC, DW, callback){
		"use strict";
		

					
		db.collection('grammar').count(function(err,num){
		
			if (err) callback(err,null);
		
			var newitem = {
					"_id": num,
					"sentence": sentence,
					"A": {"right": AC, "wrong":AW},
					"B": {"right": BC, "wrong":BW},
					"C": {"right": CC, "wrong":CW},					
					"D": {"right": DC, "wrong":DW}
					};
					
			db.collection('grammar').insert(newitem, function(err, inserted)
			{
				if (err) callback (err, null);
				callback (null, inserted); 
			});
		});
	}
	
	this.getGrammar = function(callback){
		"use strict";		
		db.collection('grammar').count(function(err, num){
			if (err) return callback(err, null);			
				
			var pick = Math.floor(Math.random()*num);


			db.collection('grammar').findOne({"_id":pick}, function(err, gram){
			
			if (err) return callback(err, null); 
			
			var output = {}; 
			
			var sentence = gram.sentence; 
						
			var answer = Math.floor(Math.random()*5);
			
			for (var i = 0; i < 4; i++)
			{			
				var chr = String.fromCharCode(65 + i);
				var label = "(" + chr + ")";
				
				
				if (i == answer)
				{				
				var replacer = gram[chr].wrong;
				output.answer = chr;				
				}
				
				else
				{				
				var replacer = gram[chr].right;				
				}
				
			output[chr] = replacer; 
	
			var styled = "<span class='labeled'>" + replacer + "<span class='label'>" + label + "</span></span>"; 
			
			sentence = sentence.replace(label, styled);			
			}
			
			sentence = sentence + " <span class = 'labeled'>No error<span class = 'label'>E</span></span>"; 
			
			output.sentence = sentence; 
		
		
			callback(null, output); 			
			});
		});
	}
	
	
}

module.exports.VocabDAO = VocabDAO;
