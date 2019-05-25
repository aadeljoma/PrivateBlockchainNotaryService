/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');

//Importing levelSandbox class
const LevelSandboxClass = require('./levelSandbox.js');

// Creating the levelSandbox class object
const levelSandBox = new LevelSandboxClass.LevelSandbox();

const BlockClass = require('./Block.js');

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
	constructor() {
		this.getBlockHeight().then((height) => {
			if (height == -1) {
				this.addBlock(new BlockClass.Block("First block in the chain - Genesis block"));
			}
		}).catch(function (error) {
			console.log("Failed!", error);
		})
	}

	// Add new block
	addBlock(newBlock) {
		let self = this;
		return new Promise(function (resolve, reject) {
			newBlock.time = new Date().getTime().toString().slice(0, -3);
			self.getBlockHeight().then((height) => {
				newBlock.height = parseInt(height + 1);
				if (newBlock.height > 0) {
					return self.getBlock((newBlock.height) - 1);
				} else {
					newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
					levelSandBox.addLevelDBData(newBlock.height, JSON.stringify(newBlock).toString());
					resolve(newBlock);
				}
			}).catch(function (error) {
				console.log("Failed1!", error);
				reject();
			}).then((block) => {
				let obj = JSON.parse(block);
				newBlock.previousBlockHash = obj.hash;
				newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
				levelSandBox.addLevelDBData(newBlock.height, JSON.stringify(newBlock).toString());
				resolve(newBlock);
			}).catch(function (error) {
				console.log("Genesis block added successfuly!");
			})
		});
	}

	// Get block height
	getBlockHeight() {
		let count = -1;
		return new Promise(function (resolve, reject) {
			levelSandBox.db.createReadStream().on('data', function (data) {
				count++;
			}).on('error', function (err) {
				reject(err);
			}).on('close', function () {
				resolve(count);
			});
		});
	}

	// get block by height
	getBlock(blockHeight) {
		return new Promise(function (resolve, reject) {
			levelSandBox.db.get(blockHeight, (err, value) => {
				if (err) {
					if (err.type == 'NotFoundError') {
						resolve(undefined);
					} else {
						console.log('Block ' + blockHeight + ' get failed', err);
						reject(err);
					}
				} else {
					resolve(value);
				}
			});
		});
	}

	// Get block by hash
	getBlockByHash(hash) {
		let block = null;
		return new Promise(function (resolve, reject) {
			levelSandBox.db.createReadStream()
				.on('data', function (data) {
					let obj = JSON.parse(data.value);
					console.log("This is the hash: " + hash);
					console.log("data.value= " + data.value);
					console.log("obj.hash= " + obj.hash);
					if (obj.hash === hash) {
						console.log("sent hash" + hash);
						block = data.value;
					}
				})
				.on('error', function (err) {
					reject(err);
				})
				.on('close', function () {
					resolve(block);
				});
		});
	}

	getBlockByAddress(address){
		let blocks = [];
		let block = null;
		return new Promise(function (resolve, reject) {
			levelSandBox.db.createReadStream()
				.on('data', function (data) {
					let obj = JSON.parse(data.value);
					if (obj.body.address === address) {
						block = obj;
						blocks.push(block);
					}
				})
				.on('error', function (err) {
					reject(err);
				})
				.on('close', function () {
					resolve(blocks);
				});
		});
	}

	// validate block
	validateBlock(blockHeight) {
		let self = this;
		return new Promise(function (resolve, reject) {
			self.getBlock(blockHeight).then((block) => {
				return block;
			}).catch(function (error) {
				console.log("Failed!", error);
			}).then((block) => {
				let obj = JSON.parse(block);
				//console.log("obj:  " + obj);
				let blockHash = obj.hash;
				obj.hash = '';
				let validBlockHash = SHA256(JSON.stringify(obj)).toString();
				if (blockHash === validBlockHash) {
					resolve(true);
				} else {
					console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
					reject(false);
				}
			})
		});
	}

	validateChain() {
		this.getBlockHeight().then((height) => {
			let returnedHeight = parseInt(height);
			for (let i = 0; i < returnedHeight; i++) {
				this.validateBlock(i).then((returnedBoolean) => {
					if (!returnedBoolean) {
						console.log("Block# ", i + "not valid");
					}
					this.getBlock(i).then((blockA) => {
						let blockAJson = JSON.parse(blockA);
						let blockAHash = blockAJson.hash;
						return blockAHash;
					}).catch(function (error) {
						console.log("Failed!4", error);
					}).then((blockAHash) => {
						this.getBlock(i + 1).then((blockB) => {
							let blockBJson = JSON.parse(blockB);
							let blockBHash = blockBJson.previousBlockHash;
							if (blockAHash !== blockBHash) {
								console.log(blockAHash + "<>" + blockBHash);
								console.log("<<<<<<<<<<<<<>>>>>>>>>>>>> Block# " + i + " is not linked with block# " + (i + 1));
							} else {
								console.log("Block# " + i + " is linked with block# " + (i + 1));
							}
						}).catch(function (error) {
							console.log("Failed!3", error);
						})
					}).catch(function (error) {
						console.log("Failed!6", error);
					})
				}).catch(function (error) {
					console.log("Failed!2", error);
				})
			}
		}).catch(function (error) {
			console.log("Failed!1", error);
		})

	}
}
module.exports.Blockchain = Blockchain;
