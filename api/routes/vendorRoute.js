let express = require('express');
let Router = express.Router();
let _ = require('lodash');
let db = require('../config/dbConfig');
let authMiddleware = require('../middleware/authMiddleware');
let vendorInvoke = require('../blockchain_network/Vendor/invoke');
let vendorQuery = require('../blockchain_network/Vendor/query');


Router.get('/vendor_view_po', (req, res) => {
    // let body = _.pick(req.body, ['po_no']);
    let vendor_id = req.id;
    console.log(vendor_id)
    vendorQuery.vendor_view_po(vendor_id).then((result) => {
        //console.log(result.toString("utf8"))
        let nR = result.toString("utf8")
        res.status(200).json({msg: JSON.parse(JSON.parse(nR))}).end()
    }).catch(err => {
        res.status(500).json({msg: err}).end()
    });
});


Router.get('/vendor_view_single_po', (req, res) => {
    let body = _.pick(req.body, ['po_no']);
    let vendor_id = req.id;
    vendorQuery.vendor_view_single_po(body.po_no, vendor_id).then((result) => {
        let nR = result.toString("utf8")
        res.status(200).json({msg: JSON.parse(JSON.parse(nR))}).end()
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: err}).end()
    });
});

Router.post('/vendor_change_po_status', (req, res) => {
    let body = _.pick(req.body, ['po_no', 'status']);
    let status = {}
    status["data"] = Date.now(),
    status["current_status"] = body.status
    let vendor_id = req.id;
    vendorInvoke.vendor_change_po_status(body.po_no,vendor_id, JSON.stringify(status)).then((result) => {
        res.status(200).json({msg: result}).end()
    }).catch(err => {
        res.status(500).json({msg: err}).end()
    }); 
});

module.exports = Router;
