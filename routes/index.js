
/*
 * GET home page.
 */

var   mysql = require('mysql')
	, dateFormat = require('dateformat');

exports.index = function(req, res){

	var users = req.session.users;
	var details = {};

	if(typeof users == "undefined")
	{
		res.redirect("/login");
	}
	else
	{

		if(typeof users != "undefined")
		{

			var dbOptions 	= req.app.locals.dbOptions;
		  	var client 		= mysql.createConnection(dbOptions);


		  

			client.connect(function(err) {
				var sql = "SELECT * FROM users LEFT JOIN countries ON (countries.countries_id = users.id) WHERE users.id = 53077";

				client.query(sql,users[0].id, function(error, rows){

					console.log(users[0].id);

					if(rows.length > 0)
					{
						var user 		= rows[0];
						var position 	= user.position;
						var bod			= user.birthdate;
						//var birthdate	= bod.format('mmmm');

						user.fullname = user.firstname + ' ' + user.lastname;
						user.position = position.substring(0,28) + '...';
						user.birthdate = dateFormat(user.birthdate, 'mmmm dd, yyyy');	
					

						res.render('index',{
							title: 'Jobsville',
							details: user
						})
					}
					else
					{
						//res.redirect("/login");
						res.send("no users found");
					}
				});
			});

		}


	}


};