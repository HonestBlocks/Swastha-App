let express = require('express');
let Router = express.Router();
let _ = require('lodash');

let manufactureInvoke = require('../blockchain_network/Manufacture/invoke');
let manufactureQuery = require("../blockchain_network/Manufacture/query");
let jwt = require('jsonwebtoken')

Router.post('/manufacture_generate_po', (req, res) => {
    let manufacture_id = req.id;
    let body = _.pick(req.body, ['po_no', 'vendor_id', 'Material', 'expectedDate', 'totalAmt']);
    body["date"] = Date.now();
    body["timeline"] = []
    body.timeline.push({msg : "Purchase Order Created", date : Date.now(), updated_by : manufacture_id});
    body["created_by"] = manufacture_id;
    body["docType"] = "manufacture_po"
    manufactureInvoke.manufacture_generate_po(body, manufacture_id).then((result) => {
        res.status(200).json({msg: result}).end();
    }).catch(err => {
        res.status(500).json({msg: err}).end();
    });
});


// To be corrected
Router.post('/packaging_by_manufacture', (req,res) => {
    let manufacture_id = req.id;
    let body = _.pick(req.body, ['batch_no', 'box_no', 'new_owner']);
    manufactureInvoke.manufacture_do_boxing(manufacture_id, body).then(result => {
        res.status(200).json({msg:result}).end();
    }).catch(err => {
        res.status(500).json({msg:err}).end();
    });
});


// ***
Router.post('/quality_check/:po_no', (req, res) => {
    let po_no = req.params.po_no;
    let manufacture_id =  req.id;
    let qualityCheck = req.body.qualityCheck;
    console.log(po_no, qualityCheck)
    manufactureQuery.manufacture_do_qc(manufacture_id, qualityCheck ,po_no).then((result) => {
        console.log("completed");
        res.status(200).json({msg:result}).end();
    }).catch( (err) => {
        res.status(500).json({msg:err}).end();
    })
})


// **** - to be tested
Router.post('/goods_recv_status/:po_no', (req, res) => {
    let po_no = req.params.po_no;
    let manufacture_id =  req.id;
    let grn_status = req.body.grn_status;
    console.log(po_no, grn_status)
    manufactureQuery.manufacture_grn(manufacture_id,po_no, grn_status).then((result) => {
        console.log("completed");
        res.status(200).json({msg:result}).end();
    }).catch( (err) => {
        res.status(500).json({msg:err}).end();
    })
})

Router.get('/get_all_po', (req, res) => {
    let manufacture_id = req.id;
    manufactureQuery.get_all_po(manufacture_id).then((result) => {
        console.log('HEYY')
        res.status(200).json({msg : result}).end();
    }).catch(err => {
        res.status(500).json({msg : err}).end();
    })
});


Router.get('/get_po/:po_no', (req, res) => {
    let po_no = req.params.po_no;
    let manufacture_id = req.id;
    manufactureQuery.get_po_by_po(manufacture_id, po_no).then((result) =>  {
        console.log("Completed");
        res.status(200).json({msg : result}).end();
    }).catch(err => {
        res.status(500).json({msg:err}).end();
    })
})

// token => jwttoken
Router.post('/create_product', (req,res) => {
    let manufacture_id = req.id;
    let body = _.pick(req.body, ['product_name', 'product_description', 'Material', 'mftDate', 'ExpiryDate', 'serial_no', 'batch_no'])
    body['created_by'] = manufacture_id
    body['timeline'] = []
    body['docType'] = 'product'
    body.timeline.push({msg : "Product Created", date : Date.now(), updated_by : manufacture_id});
    body['created_at'] = Date.now()

    // Jwt token which keeps the record of a paricular product 
    let record = []
    record.push({'type': "Manufacture", 'ID' : manufacture_id, 'date':Date.now(), 'product_name': body['product_name'], 'batch_no':body['batch_no'] })
    body['token'] = jwt.sign({record : record},process.env.JSON_SECRET);
    
    console.log(body) 
    manufactureInvoke.manufacture_create_product(body, manufacture_id).then((result) => {
        console.log('Result' , result)
        res.status(200).json({msg:result}).end();
    }).catch(err => {
        res.status(500).json({msg:err}).end();
    });
});


Router.get('/view_products', (req, res) => {
    let manufacture_id = req.id;
    console.log(manufacture_id);
    manufactureQuery.manufacture_view_product(manufacture_id).then((result) => {
        console.log('HEYY')

        res.status(200).json({msg : result}).end();
    }).catch(err => {
        res.status(500).json({msg : err}).end();
    })
});


Router.get('/view_product/:serial_no', (req, res) => {
    let serial_no = req.params.serial_no;
    let manufacture_id = req.id;
    manufactureQuery.manufacture_view_single_product(manufacture_id, serial_no).then((result) => {
        console.log('HEYY')
        res.status(200).json({msg : result}).end();
    }).catch(err => {
        res.status(500).json({msg : err}).end();
    })
});

Router.get('/view_po_distributor', (req, res) => {
    let manufacture_id = req.id;
    manufactureQuery.manufacture_view_po_of_distributor(manufacture_id).then((result) => {
        console.log('HEYY')
        res.status(200).json({msg : result}).end();
    }).catch(err => {
        res.status(500).json({msg : err}).end();
    })
});


Router.get('/view_po_distributor/:po_no', (req, res) => {
    let manufacture_id = req.id;
    let po_no = req.params.po_no
    manufactureQuery.manufacture_view_single_po_of_distributor(manufacture_id, po_no).then((result) => {
        console.log('HEYY')
        res.status(200).json({msg : result}).end();
    }).catch(err => {
        res.status(500).json({msg : err}).end();
    })
});




module.exports = Router;