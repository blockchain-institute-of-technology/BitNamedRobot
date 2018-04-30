const assert = require('assert');
var namedRobot = require('../src');


//mocha describe syntax
describe("Named Robot lib", function(){
	it("The default name should be Hal Finney", async function(){
		let name = await namedRobot.getName();
		assert.equal(name,'Hal Finney', 'Name Should be Hal Finney');
	});
	describe("Setting name", function(){
		it("Should be able to set Name", async function(){
			let newName = "BitBot";
			let resp = await namedRobot.setName(newName);
			console.log('set name response', resp)
			assert.equal(await namedRobot.getName(), newName);
		});
	})
	//namedRobot.setName()
})