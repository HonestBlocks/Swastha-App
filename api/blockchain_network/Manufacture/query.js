'use strict';

var Fabric_Client = require('fabric-client');
var fs = require('fs');
var path = require('path');

var firstnetwork_path = path.resolve('..', '..');
var org1tlscacert_path = path.resolve(firstnetwork_path, 'crypto-config', 'peerOrganizations', 'vendor.in.swastha.com', 'tlsca', 'tlsca.vendor.in.swastha.com-cert.pem');
var org1tlscacert = fs.readFileSync(org1tlscacert_path, 'utf8');

//
var fabric_client = new Fabric_Client();

// setup the fabric network
var channel = fabric_client.newChannel('commonchannel');
var peer = fabric_client.newPeer('grpc://localhost:1051', {
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

	return Promise( async (resolve, reject) => {
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to fabric client
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();

			// use  the same location for the state store(where user's certificate is kept )
			// and the crypto store (where users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: state_store
			});

			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);

			return fabric_client.getUserContext(manufacture_id, true);
		})
		.then((user_from_store) => {
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

			return channel.queryByChaincode(request);
		})
		.then( (query_responses) => {
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
 * 
 * 
 */

