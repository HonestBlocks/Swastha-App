'use strict';

var Fabric_Client = require('fabric-client');
var fs = require('fs');
var path = require('path');

var firstnetwork_path = path.resolve('..');
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
/**
 * Vendor View PO List of Manufactures
 * @param {string} vendor_id ID of Vendor.
 */
module.exports.vendor_view_po = (async (vendor_id) => {
	console.log("dcsdcsdc")
	// taking vendorid as param
	return new Promise( async (resolve, reject) => {
		console.log("dcsdcsdc223e23e")
		await Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			console.log("sdcsdcsdcsd");
			// assign the store to the fabric client
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();
			// use the same location for the state store (where the users' certificate are kept)
			// and the crypto store (where the users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});
			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			return fabric_client.getUserContext(vendor_id, true);
		}).then((user_from_store) => {
			if (user_from_store && user_from_store.isEnrolled()) {
				console.log("sdcsdcsdc")
			} else {
				reject("User Wallet is not created yet");
			}
			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'vendor_view_po',
				args: [vendor_id]
			};
			return channel.queryByChaincode(request);
		}).then((query_responses) => {
			console.log(query_responses[0])
			if (query_responses && query_responses.length == 1) {
				if (query_responses[0] instanceof Error) {					
					reject(query_responses[0]);
				} else {
					resolve(query_responses[0]);
				}
			} else {
				reject("No Payload return from network");
			}
		}).catch((err) => {
			reject(err)
		});
	});
});

/**
 * Vendor View Single Purchase Order
 * @param {string} po_no Order No.
 * @param {string} vendor_id ID of Vendor.
 */

module.exports.vendor_view_single_po = (async (po_no, vendor_id) => {
	return new Promise((resolve, reject) => {
		Fabric_Client.newDefaultKeyValueStore({
			path: store_path
		}).then((state_store) => {
			// assign the store to the fabric client
			fabric_client.setStateStore(state_store);
			var crypto_suite = Fabric_Client.newCryptoSuite();
			// use the same location for the state store (where the users' certificate are kept)
			// and the crypto store (where the users' keys are kept)
			var crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});
			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
			return fabric_client.getUserContext(vendor_id, true);
		}).then((user_from_store) => {
			if (user_from_store && user_from_store.isEnrolled()) {

			} else {
				reject("User Wallet is not created yet");
			}
			const request = {
				chaincodeId: 'SwasthaContract',
				fcn: 'vendor_view_single_po',
				args: [po_no, vendor_id]
			};

			return channel.queryByChaincode(request);
		}).then((query_responses) => {

			if (query_responses && query_responses.length == 1) {
				if (query_responses[0] instanceof Error) {
					reject(query_responses[0]);
				} else {
					resolve(query_responses[0]);
				}
			} else {
				reject("No Payload return from network");
			}
		}).catch((err) => {
			reject(err)
		});
	});
});