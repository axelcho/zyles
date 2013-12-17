function VocabDAO(db) {
    "use strict";

    if (false === (this instanceof VocabDAO)) {
        console.log('Warning: VocabDAO constructor called without "new" operator');
        return new VocabDAO(db);
    }

    var vocabulary = db.collection("vocabulary");

    this.getRandom = function(callback) {
        "use strict";
		
		count = vocabulary.count();
		
		random = Math.floor(Math.random()*count);

        vocabulary.findOne({ '_id' : random }, function(err, vocab) {
            "use strict";

            if (err) return callback(err, null);

            callback(null, vocab);
        });
    }
}

module.exports.VocabDAO = VocabDAO;
