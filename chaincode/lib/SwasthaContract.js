/**
 * @author Gaurav Bothra
 * @license MIT
 */
'use strict';

const {
    Contract
} = require('fabric-contract-api');


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
     * Vendor View PO List of Manufactures
     * @param {Object} ctx Super Class Object from from Contract Class
     * @param {string} vendor_id ID of Vendor.
     */

    async vendor_view_po(ctx, vendor_id) {
        console.info('============= START : Vendor View PO ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"vendor_id": {"$eq": "${vendor_id}"}}]}}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }


    /**
     * Vendor View Single Purchase Order
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} po_no Order No.
     * @param {string} vendor_id ID of Vendor.
     */

    
    async vendor_view_single_po(ctx, po_no, vendor_id) {
        console.info('============= START : Vendor View Single PO ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"vendor_id": {"$eq": "${vendor_id}"}},{"po_no": {"$eq": "${po_no}"}}]}}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    /**
     * Vendor Change Purchase Order Status.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} po_no Order No.
     * @param {string} vendor_id ID of Vendor.
     * @param {object} status Current Status of Purchase Order..
     */

     async vendor_change_po_status(ctx, po_no, vendor_id, status) {
        console.info('============= START : Vendor Change PO Status ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"vendor_id": {"$eq": "${vendor_id}"}},{"po_no": {"$eq": "${po_no}"}}]}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push(Record);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                let updatedPO = {}
                for(var i=0; i <= allResults.length; i++) {
                    updatedPO = JSON.parse(JSON.stringify(allResults[0]));
                    updatedPO.timeline.push(JSON.parse(status));
                    await ctx.stub.putState(po_no, Buffer.from(JSON.parse(JSON.stringify(updatedPO))));
                }

                return JSON.stringify(updatedPO);
            }
        }  
     }


     /**
     * Manufacture Generate Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {object} Payload Purchase Order Object.
     */

    async manufacture_generate_po(ctx, payload) {
        console.info('============= START : Manufacture Generate PO ===========');
        let newPayload = JSON.parse(payload);
        await ctx.stub.putState(newPayload.po_no, Buffer.from(JSON.parse(JSON.stringify(payload))));
        return payload;
    }

    /**
     * Manufacture View Their Own Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     */

    async manufacture_view_po(ctx, created_by) {
        console.log('============= START : Manufacture View Their OWN PO ===========');
        console.info('============= START : Manufacture View Their OWN PO ---- 1 ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"created_by": {"$eq": "${created_by}"}}]}}`);
        console.log(iterator);
        console.info('============= START : Manufacture :::::::::::::: ===========');
        const allResults = [];
        while (true) {
            console.info('============= START : Manufacture LOOP ===========');
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    /**
     * Manufacture View Single Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     */

    async manufacture_view_single_po(ctx, created_by, po_no) {
        console.info('============= START : Manufacture View Their OWN PO BY PO_NO ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"created_by": {"$eq": "${created_by}"}},{"po_no": {"$eq": "${po_no}"}}]}}`);
        console.info('============= START : Manufacture View Their OWN PO BY PO_NO ---2 ===========');
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }   
    }

    /**
     * Manufacture Perform Quality Check.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     * @param {object} qualityCheck Of Order.
     */

    async manufacture_do_qc(ctx, created_by, po_no, qualityCheck) {
        console.info('============= START : Manufacture Do Quality Check ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"created_by": {"$eq": "${created_by}"}},{"po_no": {"$eq": "${po_no}"}}]}"`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                let newPO = JSON.parse(JSON.stringify(allResults));
                newPO.status.push(JSON.parse(qualityCheck));
                await ctx.stub.putState(po_no, Buffer.from(JSON.parse(JSON.stringify(newPO))));
                return JSON.stringify(newPO);
            }
        }
    }

    /**
     * Manufacture Update Good Receive Status.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     * @param {object} grn_status Good Receive Status.
     */

    async manufacture_do_grn(ctx, created_by, po_no, grn_status) {
        console.info('============= START : Manifacture Do GRN of Material ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"created_by": {"$eq": "${created_by}"}},{"po_no": {"$eq": "${po_no}"}}]}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                let newPO = JSON.parse(JSON.stringify(allResults));
                newPO.status.push(JSON.parse(grn_status));
                await ctx.stub.putState(po_no, Buffer.from(JSON.parse(JSON.stringify(newPO))));
                return JSON.stringify(newPO);
            }
        }
    }


    /**
     * Manufacture Create Product.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {object} payload New Product Object.
     */

    async manufacture_create_product(ctx, payload) {
        console.info('============= START : Manufacture Create Product ===========');
        let newPayload = JSON.parse(payload);
        await ctx.stub.putState(newPayload.serial_no, Buffer.from(JSON.parse(JSON.stringify(payload))));
        return payload;
    }

    /**
     * Manufacture View Product List.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     */

    async manufacture_view_product(ctx, created_by) {
        console.info('============= START : Manufacture View Product List ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "product"},{"manufacture_id": {"$eq": "${created_by}"}}]}}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }   
    }

    /**
     * Manfacture View Single Product.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} serial_no Serial No. of Product
     */

    async manufacture_view_single_product(ctx, created_by, serial_no) {
        console.info('============= START : Manufacture View Single Product ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "manufacture_po"},{"created_by": {"$eq": "${created_by}"}},{"serial_no": {"$eq": ${serial_no}}}]}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    /**
     * Manfacture do boxing batch wise.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} batch_no Serial No. of Product.
     * @param {string} box_no BoxNo 
     * @param {string} newOwner New Owner of Box
     */

    async manufacture_do_boxing(ctx, created_by, batch_no, box_no, newOwner) {
        console.info('============= START : Manufacture Do Packaging of Product ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "product"},{"created_by": {"$eq": "${created_by}"}},{"batch_no": {"$eq": ${batch_no}}}]}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                // TODO: Looping Logic -> Acc to batch no
                let newPO = JSON.parse(JSON.stringify(allResults));
                newPO.boxid = box_no;
                newPO.currentOwner = newOwner;
                newOwner.ownerchain.push(JSON.parse(JSON.stringify({"owner" : newOwner, "date" : Date.now()})));
                await ctx.stub.putState(po_no, Buffer.from(JSON.parse(JSON.stringify(newPO))));
                return JSON.stringify(newPO);
            }
        }
    }

    /**
     * Manfacture view Purchase Order List of Distributor.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} manufacture_id Manufacture Unique ID.
     */

    async manufacture_view_po_of_distributor(ctx, manufacture_id) {
        console.info('============= START : Manufacture View Distributor Purchase Order ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "distributor_po"},{"manufacture_id": {"$eq": ${manufacture_id}}}]}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    /**
     * Manfacture view Single Purchase Order of Distributor.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} manufacture_id Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     */

    async manufacture_view_single_po_of_distributor(ctx, manufacture_id, po_no) {
        console.info('============= START : Manufacture View Distributor Po by Po_no ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "distributor_po"},{"manufacture": {"$eq": ${manufacture_id}}},{"po_no": {"$eq": "${po_no}"}}]}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }    
    }


    /**
     * Manufacture Update Status of Purchase Order of Distributor.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} manufacture_id Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     * @param {object} status Current Status of Purchase Order.
     */

    async manufacture_change_po_status_of_distributor(ctx, manufacture_id, po_no, status) {
        console.info('============= START : Vendor Change PO Status ===========');
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"docType": "distributor_po"},{"manufacture_id": {"$eq": ${manufacture_id}}},{"po_no": {"$eq": "${po_no}"}}]}`);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({
                    Key,
                    Record
                });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                let newPO = JSON.parse(JSON.stringify(allResults));
                newPO.status.push(JSON.parse(status));
                await ctx.stub.putState(po_no, Buffer.from(JSON.parse(JSON.stringify(newPO))));
                return JSON.stringify(newPO);
            }
        }  
    }

    /**
     * Regulator Search Product Using Material Code and Batch No.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} material_code Material code.
     */

    async regulator_search_product_using_raw_material(ctx, material_code) {
        // TODO: CoachDB Index Searching
    }

    /**
     * Regulator Search Product Using Serial No. or Batch No.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} serial_no of Product.
     * @param {string} batch_no of Product
     */

    async regulator_search_product_by_serial_no_batch_no(ctx, serial_no, batch_no) {
        // TODO: CoachDB Index Searching
    }


    /**
     * Distributor Generate Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {object} payload Purchase Order Object.
     */

    async distributor_generate_po(ctx, payload) {
        console.info('============= START : Distributor Generate PO ===========');
        let newPayload = JSON.parse(payload);
        await ctx.stub.putState(newPayload.po_no, Buffer.from(JSON.parse(JSON.stringify(payload))));
        return payload;
    }

    /**
     * Distributor View Their own Po.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Distributor Unique ID.
     */

    async distributor_view_po(ctx, created_by) {
        
    }

    /**
     * Distributor View Their own Po.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Distributor Unique ID.
     * @param {string} po_no Purchase Order.
     */

    async distributor_view_single_po(ctx, created_by, po_no) {
            
    }

    /**
     * Distributor View Retailer Po.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} distributor_id Distributor Unique ID.
     */

    async distributor_view_po_of_retailer(ctx, distributor_id) {
            
    }

    /**
     * Distributor View Retailer Po.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} distributor_id Distributor Unique ID.
     * @param {string} po_no Purchase Order.
     */

    async distributor_view_single_po_of_retailer(ctx, distributor_id, po_no) {
            
    }

    /**
     * Distributor Change Status of Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} distributor_id Distributor Unique ID.
     * @param {string} po_no Purchase Order.
     * @param {object} status Current Status of Order
     */

    async distributor_change_po_status_of_retailer(ctx, distributor_id, po_no, status) {
            
    }

    /**
     * Distributor do boxing serial wise.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} distributor_id Distributor Unique ID.
     * @param {string} box_no Box Num.
     * @param {string} serial_no Serial No of Product
     */

    async distributor_change_po_status_of_retailer(ctx, distributor_id, box_no, serial_no) {
            
    }


    /**
     * Retailer Generate Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {object} payload Purchase Order Payload.
     */

    async retailer_generate_po(ctx, distributor_id, box_no, serial_no) {
        console.info('============= START : Retailer Generate PO ===========');
        let newPayload = JSON.parse(payload);
        await ctx.stub.putState(newPayload.po_no, Buffer.from(JSON.parse(JSON.stringify(payload))));
        return payload;   
    }

    /**
     * Retailer View Purchase Order List.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Retailer Unique ID.
     */

    async retailer_view_po(ctx, created_by) {
    }

    /**
     * Retailer View Purchase Order List.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Retailer Unique ID.
     * @param {string} po_no Purchase Order No.
     */

    async retailer_view_single_po(ctx, created_by, po_no) {
            
    }


    /**
     * Retailer View Purchase Order List.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Retailer Unique ID.
     * @param {string} po_no Purchase Order No.
     */

    async retailer_add_product_into_cart(ctx, retailer_id, serial_no, newOwner) {
            
    }

    /**
     * Retailer View Purchase Order List.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} serial_no Serial No of Product.
     */

    async customer_query(ctx, serial_no) {
        // TODO: Customer Query's
    }

}   

module.exports = SwasthaContract;
