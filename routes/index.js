var SessionHandler = require('./session')
  , ContentHandler = require('./content')
  , PageHandler = require('./page')  //static pages
  , SpecialHandler = require('./special')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var contentHandler = new ContentHandler(db);
	var pageHandler = new PageHandler(db);
	var specialHandler = new SpecialHandler(db); 

    // Middleware to see if a user is logged in
    app.use(sessionHandler.isLoggedInMiddleware);

    // The main page
    app.get('/', contentHandler.displayMainPage);
	
	//The blog main page
	app.get('/blog', contentHandler.displayBlogPage);

	//vocabulary page
	app.get('/vocabulary', specialHandler.displayVocabulary); 
	app.get('/addvocab', specialHandler.displayAddVocab);
	app.post('/addvocab', specialHandler.addVocabulary);
	app.get('/findvocab/:vocab', specialHandler.displaySingleVocabulary);
	
	//about page
	app.get('/page/:page', pageHandler.displayPage);
	
    // The main page of the blog, filtered by tag
    app.get('/tag/:tag', contentHandler.displayMainPageByTag);

    // A single post, which can be commented on
    app.get("/post/:permalink", contentHandler.displayPostByPermalink);
    app.post('/newcomment', contentHandler.handleNewComment);
    app.get("/post_not_found", contentHandler.displayPostNotFound);

    // Displays the form allowing a user to add a new post. Only works for logged in users
    app.get('/newpost', contentHandler.displayNewPostPage);
    app.post('/newpost', contentHandler.handleNewPost);

    // Login form
    app.get('/login', sessionHandler.displayLoginPage);
    app.post('/login', sessionHandler.handleLoginRequest);

    // Logout page
    app.get('/logout', sessionHandler.displayLogoutPage);

    // Welcome page
    app.get("/welcome", sessionHandler.displayWelcomePage);

    // Signup form
    app.get('/signup', sessionHandler.displaySignupPage);
    app.post('/signup', sessionHandler.handleSignup);

    // Error handling middleware
    app.use(ErrorHandler);
}
