'use strict';

var Fabric_Client = require('fabric-client');
var fs = require('fs');
var path = require('path');

var firstnetwork_path = path.resolve('..');
var org1tlscacert_path = path.resolve(firstnetwork_path, 'crypto-config', 'peerOrganizations', 'manufacture.in.swastha.com', 'tlsca', 'tlsca.manufacture.in.swastha.com-cert.pem');
var org1tlscacert = fs.readFileSync(org1tlscacert_path, 'utf8');

//
var fabric_client = new Fabric_Client();

// setup the fabric network
var channel = fabric_client.newChannel('commonchannel');
var peer = fabric_client.newPeer('grpc://localhost:2051', {
	pem: org1tlscacert
});
channel.addPeer(peer);
var store_path = path.join(__dirname, 'hfc-key-store');
console.log('Store path:'+store_path);



/**
 * Manufacture view list of PO
 * @param {string} manufacture_id id(email of manufacture)
 */

module.exports.get_all_po = (async (manufacture_id) => {
	// taking manufacture_id as param
	// returns a promise
	console.log (typeof(manufacture_id))
	return new Promise( async (resolve, reject) => {
		console.log('Fi');
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			console.log(state_store);
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			console.log(fabric_client.getUserContext(manufacture_id, true))
			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
			console.log('F12');
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Enrolled User')
			} else{
				reject("User Wallet is not created yet");
			}

			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'manufacture_view_po',
				args: [manufacture_id]
			};
			// console.log(request);
			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
			console.log('ress');
			console.log(query_responses);
			console.log(query_responses[0]);
			if (query_responses && query_responses.length ==1) {
				if(query_responses[0] instanceof Error){
					reject(query_responses[0]);
				}
				else{
					resolve(query_responses[0]);
				}
			}
			else{
				reject ("No payload return from network");
			}
		})
		.catch( (err) => {reject(err);});

	});
});


/**
 * Manufacture View Single Purchase Order.
 * @param {string} manufacture_id ID of Maunufacture
 * @param {string} po_no purchased order number 
 */

module.exports.get_po_by_po = (async (manufacture_id, po_no) => {
	// taking manufacture_id as param
	// returns a promise
	console.log (typeof(manufacture_id,po_no))
	return new Promise( async (resolve, reject) => {
		console.log('Fi');
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			console.log(state_store);
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			console.log(fabric_client.getUserContext(manufacture_id, true))
			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
			console.log('F12');
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Enrolled User')
			} else{
				reject("User Wallet is not created yet");
			}

			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'manufacture_view_single_po',
				args: [manufacture_id, po_no]
			};
			// console.log(request);
			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
			console.log('ress');
			console.log(query_responses);
			console.log(query_responses[0]);
			if (query_responses && query_responses.length ==1) {
				if(query_responses[0] instanceof Error){
					reject(query_responses[0]);
				}
				else{
					resolve(query_responses[0]);
				}
			}
			else{
				reject ("No payload return from network");
			}
		})
		.catch( (err) => {reject(err);});

	});
});


/**
 * Manufacture Perform Quality Check.
 * @param {string} manufacture_id Manufacture Unique ID.
 * @param {string} po_no Purchase Order No.
 * @param {object} qualityCheck Of Order.
 */

 module.exports.manufacture_do_qc = (async (manufacture_id,qualityCheck ,po_no) => {
	console.log("oiioioioioi");
	console.log (typeof(manufacture_id,po_no, qualityCheck))
	return new Promise( async (resolve, reject) => {
		console.log('Fi');
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			console.log(state_store);
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			console.log(fabric_client.getUserContext(manufacture_id, true))
			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
			console.log('F12');
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Enrolled User')
			} else{
				reject("User Wallet is not created yet");
			}

			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'manufacture_do_qc',
				args: [manufacture_id, po_no, qualityCheck]
			};
			// console.log(request);
			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
			console.log('ress');
			console.log(query_responses);
			console.log(query_responses[0]);
			if (query_responses && query_responses.length ==1) {
				if(query_responses[0] instanceof Error){
					reject(query_responses[0]);
				}
				else{
					resolve(query_responses[0]);
				}
			}
			else{
				reject ("No payload return from network");
			}
		})
		.catch( (err) => {reject(err);});

	});
});


/**
 * Manufacture Update Good Receive Status.
 * @param {string} created_by Manufacture Unique ID.
 * @param {string} po_no Purchase Order No.
 *  @param {object} grn_status Good Receive Status.
 */

 module.exports.manufacture_do_grn = (async (manufacture_id,qualityCheck ,po_no) => {
	// taking manufacture_id as param
	// returns a promise
	console.log("oiioioioioi");
	console.log (typeof(manufacture_id,po_no, grn_status))
	return new Promise( async (resolve, reject) => {
		console.log('Fi');
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			console.log(state_store);
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			console.log(fabric_client.getUserContext(manufacture_id, true))
			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
			console.log('F12');
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Enrolled User')
			} else{
				reject("User Wallet is not created yet");
			}

			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'manufacture_do_grn',
				args: [manufacture_id, po_no, grn_status]
			};
			// console.log(request);
			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
			console.log('ress');
			console.log(query_responses);
			console.log(query_responses[0]);
			if (query_responses && query_responses.length ==1) {
				if(query_responses[0] instanceof Error){
					reject(query_responses[0]);
				}
				else{
					resolve(query_responses[0]);
				}
			}
			else{
				reject ("No payload return from network");
			}
		})
		.catch( (err) => {reject(err);});

	});
});


/**
 * Manufacture view list of PO
 * @param {string} manufacture_id id(email of manufacture)
 */

module.exports.manufacture_view_product = (async (manufacture_id) => {
	// taking manufacture_id as param
	// returns a promise
	console.log (typeof(manufacture_id))
	return new Promise( async (resolve, reject) => {
		console.log('Fi');
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			console.log(state_store);
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			console.log(fabric_client.getUserContext(manufacture_id, true))
			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
			console.log('F12');
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Enrolled User')
			} else{
				reject("User Wallet is not created yet");
			}

			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'manufacture_view_product',
				args: [manufacture_id]
			};
			// console.log(request);
			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
			console.log('ress');
			console.log(query_responses.length	);
			console.log(query_responses[0]);
			if (query_responses && query_responses.length ==1) {
				if(query_responses[0] instanceof Error){
					reject(query_responses[0]);
				}
				else{
					resolve(query_responses[0].toString('utf8'));
				}
			}
			else{
				reject ("No payload return from network");
			}
		})
		.catch( (err) => {reject(err)});

	});
});


/**
 * Manufacture view list of PO
 * @param {string} manufacture_id id(email of manufacture)
 * @param {string} serial_no Serial No. of Product
 */

module.exports.manufacture_view_single_product = (async (manufacture_id, serial_no) => {
	// taking manufacture_id as param
	// returns a promise
	console.log (typeof(manufacture_id))
	return new Promise( async (resolve, reject) => {
		console.log('Fi');
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			console.log(state_store);
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			console.log(fabric_client.getUserContext(manufacture_id, true))
			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
			console.log('F12');
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Enrolled User')
			} else{
				reject("User Wallet is not created yet");
			}

			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'manufacture_view_single_product',
				args: [manufacture_id,serial_no]
			};
			// console.log(request);
			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
			console.log('ress');
			console.log(query_responses);
			console.log(query_responses[0]);
			if (query_responses && query_responses.length ==1) {
				if(query_responses[0] instanceof Error){
					reject(query_responses[0]);
				}
				else{
					resolve(query_responses[0]);
				}
			}
			else{
				reject ("No payload return from network");
			}
		})
		.catch( (err) => {reject(err);});

	});
});


/**
     * Manfacture view Purchase Order List of Distributor.
     * @param {string} manufacture_id Manufacture Unique ID.
     */

	module.exports.manufacture_view_po_of_distributor = (async (manufacture_id) => {
		// taking manufacture_id as param
		// returns a promise
		console.log (typeof(manufacture_id))
		return new Promise( async (resolve, reject) => {
			console.log('Fi');
			await Fabric_Client.newDefaultKeyValueStore({
				path: store_path
			}).then((state_store) => {
				// assign the store to fabric client
				console.log(state_store);
				fabric_client.setStateStore(state_store);
				var crypto_suite = Fabric_Client.newCryptoSuite();
	
				// use  the same location for the state store(where user's certificate is kept )
				// and the crypto store (where users' keys are kept)
				var crypto_store = Fabric_Client.newCryptoKeyStore({
					path: store_path
				});
	
				crypto_suite.setCryptoKeyStore(crypto_store);
				fabric_client.setCryptoSuite(crypto_suite);
				console.log(fabric_client.getUserContext(manufacture_id, true))
				return fabric_client.getUserContext(manufacture_id, true);
			})
			.then((user_from_store) => {
				console.log('F12');
				if (user_from_store && user_from_store.isEnrolled()) {
					console.log('Enrolled User')
				} else{
					reject("User Wallet is not created yet");
				}
	
				const request = {
					chaincodeId: 'SwasthaContract',
					fcn: 'manufacture_view_po_of_distributor',
					args: [manufacture_id]
				};
				// console.log(request);
				return channel.queryByChaincode(request);
			})
			.then( (query_responses) => {
				console.log('ress');
				console.log(query_responses);
				console.log(query_responses[0]);
				if (query_responses && query_responses.length ==1) {
					if(query_responses[0] instanceof Error){
						reject(query_responses[0]);
					}
					else{
						resolve(query_responses[0]);
					}
				}
				else{
					reject ("No payload return from network");
				}
			})
			.catch( (err) => {reject(err);});
	
		});
});
	
/** 
 * @param {string} manufacture_id Manufacture Unique ID.
 * @param {string} po_no Purchase Order No.
 * */

module.exports.manufacture_view_single_po_of_distributor = (async (manufacture_id, po_no) => {
	// taking manufacture_id as param
	// returns a promise
	console.log (typeof(manufacture_id))
	return new Promise( async (resolve, reject) => {
		console.log('Fi');
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			console.log(state_store);
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			console.log(fabric_client.getUserContext(manufacture_id, true))
			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
			console.log('F12');
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log('Enrolled User')
			} else{
				reject("User Wallet is not created yet");
			}

			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'manufacture_view_single_po_of_distributor',
				args: [manufacture_id,po_no]
			};
			// console.log(request);
			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
			console.log('ress');
			console.log(query_responses);
			console.log(query_responses[0]);
			if (query_responses && query_responses.length ==1) {
				if(query_responses[0] instanceof Error){
					reject(query_responses[0]);
				}
				else{
					resolve(query_responses[0]);
				}
			}
			else{
				reject ("No payload return from network");
			}
		})
		.catch( (err) => {reject(err);});

	});
});

// manufacture_change_po_status_of_distributor
// manufacture_do_boxing
// manufacture_create_product

