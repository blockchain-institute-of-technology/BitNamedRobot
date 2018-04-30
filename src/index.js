
var Web3 = require('web3');
var contractJSON = require('../build/contracts/NamedRobot.json');
var HDWalletProvider = require("truffle-hdwallet-provider");

//web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/9IVwUjnwncMb0oQAHHIP"));

//web3 = new Web3(new HDWalletProvider(mnemonic, "https://ropsten.infura.io/9IVwUjnwncMb0oQAHHIP", 0));
//web3.eth.defaultAccount = '0x9c76b879dceb4936b890127be7e4930ca9525db4';
//var MyContract = web3.eth.contract(contractJSON.abi);
//var contractInstance = MyContract.at("0xcb10c549601b37ef8f15dae65fe7ca2946f7fa3a");
class NamedRobot{

	constructor(contractInstance){
		this.contractInstance = contractInstance
	}

	getName() {
		var promise = new Promise((resolve, reject) => {
			this.contractInstance.getName((err, response) => {
				if (err) { return promise.reject(err)}
				resolve(hex_to_ascii(response));
			});
		});

		return promise;
	}

	setName(newName) {
		return new Promise((resolve, reject) => {
			this.contractInstance.setName(newName, function(error, response) {
				if (error) return reject(error);
					resolve(response);
			});
		})
	}

};


module.exports.init = function(mnemonic){
	return new Promise((resolve, reject) => {
		var web3 = new Web3(new HDWalletProvider(mnemonic, "https://ropsten.infura.io/9IVwUjnwncMb0oQAHHIP", 0));
	 	web3.eth.getAccounts(function(err, res){
			if (err){throw err;}
			web3.eth.defaultAccount = res[0];
			var MyContract = web3.eth.contract(contractJSON.abi);
			var contractInstance = MyContract.at("0xcb10c549601b37ef8f15dae65fe7ca2946f7fa3a");
			resolve(new NamedRobot(contractInstance));
		});
	})
}



function hex_to_ascii(str1)
 {
  var hex  = str1.toString();
  var str = '';
  for (var n = 2; n < hex.length; n += 2) {
    var newStr = String.fromCharCode(parseInt(hex.substr(n, 2), 16));

    if (newStr !== '\u0000') {
      str += newStr
    }
  }
  return str;
 }