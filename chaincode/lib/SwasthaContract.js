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
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"$doc_type": "manufacture_po"},{"vendor_id": {"$eq": ${vendor_id}}}]}`);
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
        const iterator = await ctx.stub.getQueryResult(`{"selector": {"$and": [{"$doc_type": "manufacture_po"},{"vendor_id": {"$eq": ${vendor_id}}},{"po_no": {"$eq": ${po_no}}}]}`);
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

     }


     /**
     * Manufacture Generate Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {object} Payload Purchase Order Object.
     */

    async manufacture_generate_po(ctx, payload) {
        
    }

    /**
     * Manufacture View Their Own Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     */

    async manufacture_view_po(ctx, created_by) {

    }

    /**
     * Manufacture View Single Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     */

    async manufacture_view_single_po(ctx, created_by, po_no) {
            
    }

    /**
     * Manufacture Perform Quality Check.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     * @param {object} qualityCheck Of Order.
     */

    async manufacture_do_qc(ctx, created_by, po_no, qualityCheck) {
            
    }

    /**
     * Manufacture Update Good Receive Status.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     * @param {object} grn_status Good Receive Status.
     */

    async manufacture_do_grn(ctx, created_by, po_no, grn_status) {
            
    }


    /**
     * Manufacture Create Product.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {object} payload New Product Object.
     */

    async manufacture_create_product(ctx, payload) {
            
    }

    /**
     * Manufacture View Product List.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     */

    async manufacture_view_product(ctx, created_by) {
            
    }

    /**
     * Manfacture View Single Product.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} serial_no Serial No. of Product
     */

    async manufacture_view_single_product(ctx, created_by) {
            
    }

    /**
     * Manfacture do boxing batch wise.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} created_by Manufacture Unique ID.
     * @param {string} batch_no Serial No. of Product.
     */

    async manufacture_do_boxing(ctx, created_by, batch_no) {
            
    }

    /**
     * Manfacture view Purchase Order List of Distributor.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} manufacture_id Manufacture Unique ID.
     */

    async manufacture_view_po_of_distributor(ctx, manufacture_id) {
            
    }

    /**
     * Manfacture view Single Purchase Order of Distributor.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} manufacture_id Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     */

    async manufacture_view_single_po_of_distributor(ctx, manufacture_id, po_no) {
            
    }


    /**
     * Manufacture Update Status of Purchase Order of Distributor.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} manufacture_id Manufacture Unique ID.
     * @param {string} po_no Purchase Order No.
     * @param {object} status Current Status of Purchase Order.
     */

    async manufacture_change_po_status_of_distributor(ctx, manufacture_id, po_no, status) {
            
    }

    /**
     * Regulator Search Product Using Material Code and Batch No.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} material_code Material code.
     */

    async regulator_search_product_using_raw_material(ctx, material_code) {
            
    }

    /**
     * Regulator Search Product Using Serial No. or Batch No.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} serial_no of Product.
     * @param {string} batch_no of Product
     */

    async regulator_search_product_by_serial_no_batch_no(ctx, serial_no, batch_no) {
            
    }


    /**
     * Distributor Generate Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {object} payload Purchase Order Object.
     */

    async distributor_generate_po(ctx, payload) {
            
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

    async distributor_view_single_po_of_retailer(ctx, po_no) {
            
    }

    /**
     * Distributor Change Status of Purchase Order.
     * @param {object} ctx Super Class Object from from Contract Class
     * @param {string} distributor_id Distributor Unique ID.
     * @param {string} po_no Purchase Order.
     * @param {object} status Current Status of Order
     */

    async distributor_change_po_status_of_retailer(ctx, po_no) {
            
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

}   

module.exports = SwasthaContract;
