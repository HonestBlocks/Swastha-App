'use strict';
var Fabric_Client = require('fabric-client');
var Fabric_CA_Client = require('fabric-ca-client');

var fs = require('fs');
var path = require('path');

var firstnetwork_path = path.resolve('..');
var org1tlscacert_path = path.resolve(firstnetwork_path, 'crypto-config', 'peerOrganizations', 'distributor.in.swastha.com', 'tlsca', 'tlsca.distributor.in.swastha.com-cert.pem');
var org1tlscacert = fs.readFileSync(org1tlscacert_path, 'utf8');

//
var fabric_client = new Fabric_Client();
var fabric_ca_client = null;
var admin_user = null;
var member_user = null;
var store_path = path.join(__dirname, 'hfc-key-store');


async function registerUser(username) {
    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
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
        var tlsOptions = {
            trustedRoots: [org1tlscacert],
            verify: false
        };
        // be sure to change the http to https when the CA is running TLS enabled
        fabric_ca_client = new Fabric_CA_Client('http://localhost:3054', tlsOptions, 'ca.distributor.in.swastha.com', crypto_suite);

        // first check to see if the admin is already enrolled
        return fabric_client.getUserContext('admin', true);
    }).then((user_from_store) => {
        if (user_from_store && user_from_store.isEnrolled()) {
            console.log('Successfully loaded admin from persistence');
            admin_user = user_from_store;
        } else {
            throw new Error('Failed to get admin.... run enrollAdmin.js');
        }

        // at this point we should have the admin user
        // first need to register the user with the CA server
        return fabric_ca_client.register({
            enrollmentID: username,
            affiliation: 'org1.department1',
            role: 'client'
        }, admin_user);
    }).then((secret) => {
        // next we need to enroll the user with CA server
        console.log('Successfully registered user1 - secret:' + secret);

        return fabric_ca_client.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
    }).then((enrollment) => {
        console.log('Successfully enrolled member user "user1" ');
        return fabric_client.createUser({
            username: username,
            mspid: 'distributorMSP',
            cryptoContent: {
                privateKeyPEM: enrollment.key.toBytes(),
                signedCertPEM: enrollment.certificate
            }
        });
    }).then((user) => {
        member_user = user;

        return fabric_client.setUserContext(member_user);
    }).then(() => {
        console.log('User1 was successfully registered and enrolled and is ready to interact with the fabric network');

    }).catch((err) => {
        console.error('Failed to register: ' + err);
        if (err.toString().indexOf('Authorization') > -1) {
            console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
                'Try again after deleting the contents of the store directory ' + store_path);
        }
    });

}

module.exports.registerUser = registerUser;