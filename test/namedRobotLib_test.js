const assert = require('assert');
var NamedRobot = require('../src');
var mneumonic = 'gadget robust eager rabbit drum attitude power sight hazard cost real aim';



//mocha describe syntax
describe("Named Robot lib", function(){

	describe("Initializing Named Robot Client", () => {

		it('#init should accept a mneumonic seed', async () => {
			let namedRobot = await NamedRobot.init(mneumonic)

			await namedRobot.getName();
		})
	})

	it("The default name should be Hal Finney", async function(){
		let namedRobot = await NamedRobot.init(mneumonic)
		let name = await namedRobot.getName();
		assert.equal(name,'Hal Finney', 'Name Should be Hal Finney');
	});
	describe("Setting name", function(){
		it("Should be able to set Name", async function(){
			let namedRobot = await NamedRobot.init(mneumonic)
			let newName = "BitBot";
			let resp = await namedRobot.setName(newName);
			console.log('set name response', resp)
			assert.equal(await namedRobot.getName(), newName);
		});
	})
	//namedRobot.setName()
})