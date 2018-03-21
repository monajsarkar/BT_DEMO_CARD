
var vcapCredential	= require('./vcapCredentialExtraction.js');
//var env = require('./EnvConf.js');
var ibmdb = require("ibm_db");
var dbConnStr = "";
var conPl=90;

var Pool = require("ibm_db").Pool,
pool = new Pool({
		max : conPl ,
 		idleTimeoutMillis : 60000
}) ;

var openedConnection = 0;
exports.dbConn = null;
	
exports.getDBConn = function(){	
	dbConnStr = vcapCredential.db2_connectionStr;
	console.log(dbConnStr)
	
var dbConn = null;
	if (pool.availablePool[dbConnStr] && pool.availablePool[dbConnStr].length){		
		dbConn = pool.availablePool[dbConnStr].shift();
    	pool.usedPool[dbConnStr].push(dbConn);
	}
	else{
		if(openedConnection <= conPl){
			dbConn = ibmdb.openSync(dbConnStr);
			
			openedConnection += 1;			
			pool.usedPool[dbConnStr] = pool.usedPool[dbConnStr] || [];
	      	pool.usedPool[dbConnStr].push(dbConn);
		}		
	}
	
	exports.dbConn = dbConn;
	return dbConn;
};


exports.closeDBConn = function(conn){
	var connIndex = pool.usedPool[dbConnStr].indexOf(conn);
	
	if(connIndex !== -1){
		pool.usedPool[dbConnStr].splice(connIndex, 1) || [];
	}	
	
	pool.availablePool[dbConnStr] = pool.availablePool[dbConnStr] || [];
	pool.availablePool[dbConnStr].push(conn);
	openedConnection -= 1;
	console.log("Connection number in closing = " + openedConnection);
};