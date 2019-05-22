/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');


class SwasthaContract extends Contract {

    /**
     * Initialize Smart Contract.
     * @param {Object} ctx Super Class Object from from Contract Class
     * 
     */
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

    /**
     * Get list of all users from Active Directory
     * @param {object} ctx Super Class Object from from Contract Class
     */
    async getAllUsers(ctx) {
        // return List
    }

    

}

module.exports = SwasthaContract;
