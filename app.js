/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var async = require('async');
var bodyParser = require('body-parser');
var ibmdb = require('ibm_db');
var request = require('request');
var util = require('./util.js');
var vcapCredential = require('./vcapCredentialExtraction.js');
var dao = require('./dao.js');




// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(bodyParser.json());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
vcapCredential.setVCAP_Parameters(process.env.VCAP_SERVICES);

//-------------------------CORS support----------------------------------//

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//Function for performing Read Operation from DB
function readDB(Select_Query) {
	var connection = util.getDBConn();
	console.log("connection created! ");
	console.log(" query is : " + Select_Query);
	var result = connection.querySync(Select_Query);
	console.log(" query executed");
	util.closeDBConn(connection);
	return result;

}

// Function for performing Write Operation into DB - InsertOrUpdate_Query
/**
 * DB connection called  
 * as env['dashDB'][0] is calling DB 
 */
function GetDBCon() {
	var dbcred;
	if (process.env.VCAP_SERVICES) {
		var env = JSON.parse(process.env.VCAP_SERVICES);
		var db2 = env['dashDB'][0];
		dbcred = db2.credentials;
		console.log("dbcred :" + dbcred);
		var db2uri = dbcred.jdbcurl;
		console.log("Connected to Bluemix Dash DB via VCAP" + db2uri);

	}
	var cn = "DRIVER={DB2};DATABASE=" + dbcred.db + ";HOSTNAME=" + dbcred.host
			+ ";PORT=" + dbcred.port + ";UID=" + dbcred.username + ";PWD="
			+ dbcred.password + ";";

	return cn;

}

/*****************************************************************************************************************************************/

//loading db tables slide 6
app.get('/loadtable', function(req, res) {
	
	if(typeof(req.headers['Access-Control-Allow-Headers']) === 'undefined'){
        req.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept";
    }
	console.log(req.headers['Access-Control-Allow-Headers'])
	var error_msg = "";
	var conn = util.getDBConn();
	try {
		var viewData = {
			Data : []
		};

		async.series([
				function(callback) {
					viewData = dao.getTableDetails(conn, viewData, req);
					callback(null);
				}, function(callback) {
					util.closeDBConn(conn);
					callback(null);
				} ], function(err) {
			if (!err) {
				res.setHeader('Content-Type', 'application/json');
				res.send(viewData);
			} else {
				console.log(JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in loadtable :: " + err);
		if (conn.connected)
			util.closeDBConn(conn);
		res.status(600);
		res.send(error_msg);
	}
});
/******************************************************************************************************************************************/
//NewPrice service
app.get('/newPrice', function(req, res) {
	
	if(typeof(req.headers['Access-Control-Allow-Headers']) === 'undefined'){
        req.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept";
    }
	console.log(req.headers['Access-Control-Allow-Headers'])
	var error_msg = "";
	var conn = util.getDBConn();
	try {
		var viewData = {
			Data : []
		};

		async.series([
				function(callback) {
					viewData = dao.getNewPriceDetails(conn, viewData, req);
					callback(null);
				}, function(callback) {
					util.closeDBConn(conn);
					callback(null);
				} ], function(err) {
			if (!err) {
				res.setHeader('Content-Type', 'application/json');
				res.send(viewData);
			} else {
				console.log(JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in newPrice :: " + err);
		if (conn.connected)
			util.closeDBConn(conn);
		res.status(600);
		res.send(error_msg);
	}
});



/*****************************************************************************************************************************************/

//finalize button slide 6
app.post('/finalize', function(req, res) {
	
	if(typeof(req.headers['Access-Control-Allow-Headers']) === 'undefined'){
        req.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept";
    }
	console.log(req.headers['Access-Control-Allow-Headers'])
	var error_msg = "";
	var conn = util.getDBConn();
	try {
		var viewData = {
			Data : []
		};

		async.series([
				function(callback) {
					viewData = dao.getfinalizeDetails(conn, viewData, req);
					callback(null);
				}, function(callback) {
					util.closeDBConn(conn);
					callback(null);
				} ], function(err) {
			if (!err) {
				res.setHeader('Content-Type', 'application/json');
				res.send(viewData);
			} else {
				console.log(JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in finalize :: " + err);
		if (conn.connected)
			util.closeDBConn(conn);
		res.status(600);
		res.send(error_msg);
	}
});

/*****************************************************************************************************************************************/

//run scenario button slide 6
app.post('/runscenario', function(req, res) {
	
	if(typeof(req.headers['Access-Control-Allow-Headers']) === 'undefined'){
        req.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept";
        req.headers['Content-Type'] = "application/json";
    }
	console.log(req.headers['Access-Control-Allow-Headers'])
	var error_msg = "";
	var conn = util.getDBConn();
	try {
	
		async.series([
				function(callback) {
					dao.getRunscenarioDetails(conn, req, res);
					callback(null);
				}, function(callback) {
					util.closeDBConn(conn);
					callback(null);
				} ], function(err) {
			if (!err) {
				console.log("In app");
//				res.setHeader('Content-Type', 'application/json');
//				res.send(viewData);
			} else {
				console.log(JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in runscenario :: " + err);
		if (conn.connected)
			util.closeDBConn(conn);
		res.status(600);
		res.send(error_msg);
	}
});

/*****************************************************************************************************************************************/

































// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
