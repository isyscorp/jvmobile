
/*
 * GET users listing.
 */

var mysql = require('mysql');

exports.list = function(req, res) {
  res.send("respond with a resource");
};

exports.signout = function(req, res) {
	req.session = null;
	res.redirect("/login")
}

// Login Post
exports.login = function(req, res){
  	var data = {};

  	var dbOptions 	= req.app.locals.dbOptions;
  	var client 		= mysql.createConnection(dbOptions);

  	var email 		= req.body.email;
  	var password 	= req.body.password;

  	if(email == "" || password == "")
  	{
  		data.message = "Email or password is invalid!";
  		data.action 	= "retry";
  		res.send(data);
  	}
  	else
  	{

	  	client.connect(function(err) {

		  	data.error = false;
	  		
	  		if(!err)
	  		{
	  			client.query('SELECT id,firstname,lastname,vanity,birthdate,agencyname,nickname,age,gender FROM users WHERE email = ? AND password = md5(?)',[email,password], function(error, rows){	  				
	  				if(rows.length > 0)
	  				{
	  					req.session.users = rows;
	  					data.action = "forward";
	  					data.rows = rows;
	  					data.url = "/";
	  					res.send(data);
	  				}
	  				else
	  				{
	  					data.action = "retry";
	  					data.message = "Email or password is invalid!";
	  					res.send(data);
	  				}

	  			})
	  		}
	  		else
	  		{
	  			data.error = true;
	  			res.send(data);
	  		}
		});

	}
  	
};