function PostsDAO(db) {
    "use strict";


    if (false === (this instanceof PostsDAO)) {
        console.log('Warning: PostsDAO constructor called without "new" operator');
        return new PostsDAO(db);
    }

    var posts = db.collection("posts");
	var vocab = db.collection("vocabularay"); 
	
	
	this.getVocab = function(callback){
		"use strict";
		console.log("calling vocabulary");
		var random = Math.floor(Math.random()*5014);
		
		console.log(random);
		vocab.findOne({ '_id' : random }, function(err, voc) {
            "use strict";

            if (err) return callback(err, null);
        console.log(voc)
            callback(null, voc);
        });
	
	
	}

    this.insertEntry = function (title, body, tags, author, callback) {
        "use strict";
        console.log("inserting blog entry" + title + body);

        // fix up the permalink to not include whitespace
        var permalink = title.replace( /\s/g, '_' );
        permalink = permalink.replace( /\W/g, '' );

        // Build a new post
        var post = {"title": title,
                "author": author,
                "body": body,
                "permalink":permalink,
                "tags": tags,
                "comments": [],
                "date": new Date()}

        // now insert the post
		
		db.collection('posts').insert(post, function (err, inserted)
			{
			if (err) callback(err, null);			
			callback(null, post.permalink); 			
			});		
    }

    this.getPosts = function(num, callback) {
        "use strict";

        posts.find().sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }

    this.getPostsByTag = function(tag, num, callback) {
        "use strict";

        posts.find({ tags : tag }).sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }

    this.getPostByPermalink = function(permalink, callback) {
        "use strict";
        posts.findOne({'permalink': permalink}, function(err, post) {
            "use strict";

            if (err) return callback(err, null);

            callback(err, post);
        });
    }

    this.addComment = function(permalink, name, email, body, callback) {
        "use strict";

        var comment = {'author': name, 'body': body}
 
        if (email != "") {
            comment['email'] = email
        }

        var query = {'permalink': permalink};
		var operator = {'$push': {'comments': comment}};
		
		db.collection('posts').update(query, operator, function(err, updated)
		{
		if (err) callback(err, null);		
		callback(null, updated.permalink);
		
		});        
    }
}

module.exports.PostsDAO = PostsDAO;
