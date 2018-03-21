
/*eslint-env node */

	
exports.setVCAP_Parameters = function(vcap){
	
	if(vcap!=undefined){ 
		var vcap_services = JSON.parse(vcap);
		var dbcred =vcap_services['dashDB'][0].credentials;
	//	 var cn = "DRIVER={DB2};DATABASE="+dbcred.db+";HOSTNAME="+dbcred.host+";PORT="+dbcred.port+";UID="+dbcred.username+";PWD="+dbcred.password+";" ;
		exports.db2_connectionStr = "DRIVER={DB2};DATABASE="+dbcred.db+";HOSTNAME="+dbcred.host+";PORT="+dbcred.port+";UID="+dbcred.username+";PWD="+dbcred.password+";" ;
		
	}
	
		
};