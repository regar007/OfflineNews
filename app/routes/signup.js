//define mongo db data set object
var mongoData = {name : '',mob : 0, age : '',twitterName: '',subscription : {cricSub : {matchURL : [], date : new Date(), overInterval : '', noOfMatches : 0 }}, hashTag : [], schedule : {days : [], times : []}, secret : {username : '', password : ''}};
var mongodbjs = require('../routes/mongodb.js');
var crypto = require('crypto');

//Add the Admin for tracking some data over the time



var MyApp = function(app){

	app.get('/signup', function(req, res){
		console.log("in signup get : ");
		res.render('signup');
	});

	app.post('/signup', function(req, res){
		var query = req.body;
		var todo = 'signup';
		mongoData.secret.username = query.username;
		mongoData.secret.password = crypto.createHash('md5').update(query.password).digest("hex");
		mongoData.name = query.name;
		mongoData.mob = query.mob;
		mongoData.age = query.age;
		mongoData.twitterName = query.twitterName;

		console.log("in signup post : "+ mongoData.secret.username);
		userExist = false;
		mongodbjs.findRecord(mongoData, res, req, todo);
	});

};

module.exports = MyApp;
