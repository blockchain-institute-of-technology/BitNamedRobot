
var Web3 = require('web3');
var contractJSON = require('../build/contracts/NamedRobot.json');
console.log("get robot name: ");
web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/9IVwUjnwncMb0oQAHHIP"));

(async function() {

	var block = await web3.eth.getBlock(48);
	//console.log(JSON.stringify(block));

	var balance = await web3.eth.getBalance("0xcb10c549601b37ef8f15dae65fe7ca2946f7fa3a");
	//console.log(balance);

	//console.log(contractJSON.abi);

	var MyContract = web3.eth.contract(contractJSON.abi);

	// instantiate by address
	var contractInstance = MyContract.at("0xcb10c549601b37ef8f15dae65fe7ca2946f7fa3a");
	var name = await contractInstance.getName();
	name = web3.toAscii(name);
	console.log(name);

})()


