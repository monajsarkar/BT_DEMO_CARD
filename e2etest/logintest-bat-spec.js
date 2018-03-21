//logintest-spec.js
'use strict';

var _BASE_URL ='http://batobacco.mybluemix.net/';
describe('BAT Application ',function(){
	it('On load application should be at# login page',function(){
		browser.get('#/login');
		//expect(browser.getTitle()).toEqual('Trivial Angular App');
		expect(browser.getLocationAbsUrl()).toBe(_BASE_URL+ '#/login');
	});
	
});
describe('Login page should have the appropriate controls',function(){
	var loginBtn = element(by.id('loginBtn'));
	var uidBox = element(by.id('userId'));
	var pwdBox = element(by.id('pwd'));

	
	it('Login page should have a text box for user id input',function(){
		expect(uidBox.isPresent()).toBe(true);
	});
	it('Login page should have a text box for entering password',function(){
		expect(pwdBox.isPresent()).toBe(true);
	});
	it('Login page should have a Authenticate button',function(){
		
		expect(loginBtn.isPresent()).toBe(true);
		expect(loginBtn.getText()).toEqual('Authenticate');
	});
});

describe('Login button should work as expected',function(){
	var loginBtn = element(by.id('loginBtn'));
	var uidBox = element(by.id('userId'));
	var pwdBox = element(by.id('pwd'));
		it('Login button is pressed after entering correct user id and password and user is taken to a My top accounts by market share',function(){
			uidBox.sendKeys('nextgen');
			pwdBox.sendKeys('nextgen');
			loginBtn.click();
			browser.wait(browser.driver.isElementPresent(by.xpath('/html/body/div[3]/div/div[1]/center/span')),10000);
			expect(browser.getLocationAbsUrl()).toBe(_BASE_URL+ '#/page0');
			expect(element(by.xpath('/html/body/div[3]/div/div[1]/center/span')).getText()).toBe('My top accounts by market share');
		});
});
		
		
		
	