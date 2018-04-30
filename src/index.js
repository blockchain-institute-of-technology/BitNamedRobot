
var Web3 = require('web3');
var contractJSON = require('../build/contracts/NamedRobot.json');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = 'gadget robust eager rabbit drum attitude power sight hazard cost real aim';

//web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/9IVwUjnwncMb0oQAHHIP"));

web3 = new Web3(new HDWalletProvider(mnemonic, "https://ropsten.infura.io/9IVwUjnwncMb0oQAHHIP", 0));
web3.eth.defaultAccount = '0x9c76b879dceb4936b890127be7e4930ca9525db4';
var MyContract = web3.eth.contract(contractJSON.abi);
var contractInstance = MyContract.at("0xcb10c549601b37ef8f15dae65fe7ca2946f7fa3a");


module.exports.getName = function(){
	var promise = new Promise(function(resolve, reject) {
		contractInstance.getName(function(err, response) {
			if (err) { return promise.reject(err)}
			resolve(hex_to_ascii(response));
		});
	});

	return promise;
};

module.exports.setName = async function(newName){
	return new Promise(function(resolve, reject) {
		contractInstance.setName(newName, function(error, response) {
			if (error) return reject(error);
			resolve(response);
		});
	})


};

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