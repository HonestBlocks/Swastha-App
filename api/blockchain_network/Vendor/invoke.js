'use strict';

const Fabric_Client = require('fabric-client');
const fs = require('fs');
const path = require('path');
const util = require('util');

var firstnetwork_path = path.resolve('..');
var org1tlscacert_path = path.resolve(firstnetwork_path, 'crypto-config', 'peerOrganizations', 'vendor.in.swastha.com', 'tlsca', 'tlsca.vendor.in.swastha.com-cert.pem');
var org1tlscacert = fs.readFileSync(org1tlscacert_path, 'utf8');


/**
 * Vendor Change Purchase Order Status.
 * @param {string} po_no Order No.
 * @param {string} vendor_id ID of Vendor.
 * @param {object} status Current Status of Purchase Order..
 */

module.exports.vendor_change_po_status = (async (po_no, vendor_id, status) => {
	return new Promise( async (resolve, reject) => {
		try {
			console.log('Setting up client side network objects');
			const fabric_client = new Fabric_Client();
	
			const channel = fabric_client.newChannel('commonchannel');
			console.log('Created client side object to represent the channel');

			const peer = fabric_client.newPeer('grpc://localhost:1051', {
				pem: org1tlscacert
			});
			console.log('Created client side object to represent the peer');
	
			const store_path = path.join(__dirname, 'hfc-key-store');
			console.log('Setting up the user store at path:' + store_path);

			const state_store = await Fabric_Client.newDefaultKeyValueStore({
				path: store_path
			});

			fabric_client.setStateStore(state_store);
			const crypto_suite = Fabric_Client.newCryptoSuite();
			const crypto_store = Fabric_Client.newCryptoKeyStore({
				path: store_path
			});
			crypto_suite.setCryptoKeyStore(crypto_store);
			fabric_client.setCryptoSuite(crypto_suite);
	
			const user = await fabric_client.getUserContext(vendor_id, true);
			if (user && user.isEnrolled()) {
				console.log('Successfully loaded "user1" from user store');
			} else {
				reject("User is not found in wallet");
			}
	
			console.log('Successfully setup client side');
			console.log('\n\nStart invoke processing');
	

	
			const orderer = fabric_client.newOrderer('grpc://localhost:7050')
			console.log('Created client side object to represent the orderer');
	
			const tx_id = fabric_client.newTransactionID();
			console.log(util.format("\nCreated a transaction ID: %s", tx_id.getTransactionID()));

			const proposal_request = {
				targets: [peer],
				chaincodeId: 'SwasthaContract',
				fcn: 'vendor_change_po_status',
				args: [po_no, vendor_id, status],
				chainId: 'commonchannel',
				txId: tx_id
			};
	
			const endorsement_results = await channel.sendTransactionProposal(proposal_request);
	
			const proposalResponses = endorsement_results[0];
			const proposal = endorsement_results[1];
	
			if (proposalResponses[0] instanceof Error) {
				console.error('Failed to send Proposal. Received an error :: ' + proposalResponses[0].toString());
				reject(proposalResponses[0]);
			} else if (proposalResponses[0].response && proposalResponses[0].response.status === 200) {
				console.log(util.format(
					'Successfully sent Proposal and received response: Status - %s',
					proposalResponses[0].response.status));
			} else {
				const error_message = util.format('Invoke chaincode proposal:: %j', proposalResponses[i]);
				console.error(error_message);
				reject(error_message);
			}
			const commit_request = {
				orderer: orderer,
				proposalResponses: proposalResponses,
				proposal: proposal
			};
			const transaction_id_string = tx_id.getTransactionID();
	
			
			const promises = [];
	
			
			const sendPromise = channel.sendTransaction(commit_request);
			
			promises.push(sendPromise);
	
			
			let event_hub = channel.newChannelEventHub(peer);
	
			
			let txPromise = new Promise((resolve, reject) => {
			
				let handle = setTimeout(() => {
					event_hub.unregisterTxEvent(transaction_id_string);
					event_hub.disconnect();
					resolve({
						event_status: 'TIMEOUT'
					});
				}, 30000);
	
			
				event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
			
						clearTimeout(handle);
						const return_status = {
							event_status: code,
							tx_id: transaction_id_string
						};
					}, (err) => {
						reject(new Error('There was a problem with the eventhub ::' + err));
					}, {
						disconnect: true
					} 
				);

				event_hub.connect();
				console.log('Registered transaction listener with the peer event service for transaction ID:' + transaction_id_string);
			});
	
			
			promises.push(txPromise);
			const results = await Promise.all(promises);

			if (results[0].status === 'SUCCESS') {
				console.log('Successfully sent transaction to the orderer');
			} else {
				const message = util.format('Failed to order the transaction. Error code: %s', results[0].status);
				console.error(message);
				reject(message);
			}
	
			if (results[1] instanceof Error) {
				reject(message);
			} else if (results[1].event_status === 'VALID') {
				resolve(message);
			} else {
				reject(message);
			}
		} catch (error) {
			reject(error.toString());
		}
	});
});