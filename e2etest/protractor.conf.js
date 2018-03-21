//protractor.conf.js
exports.config = {

  allScriptsTimeout: 51000,

  specs: [
    '*-bat-spec.js'
  ],

  multiCapabilities: [{
    'browserName': 'chrome',
	'name': 'BAT Login Test -Chrome'
  },
	{
    'browserName': 'firefox',
	'name': ' BAT Login Test Firefox'
  }],
  sauceUser: 'shaileshagarwal',
  sauceKey: '54e88738-b884-443f-844e-4b5fe95f23d5',

  baseUrl: 'http://batobacco.mybluemix.net/',

  framework: 'jasmine' ,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 50000
  }
};