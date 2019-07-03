let express = require('express');
let bodyParser = require('body-parser');
let db = require('./config/dbConfig');
let _ = require('lodash');
let bcryptjs = require('bcryptjs');
let jwt = require('jsonwebtoken');
let cors = require("cors");
require('dotenv').config()

//Getting all routes
let vendorRoute = require('./routes/vendorRoute');
let manufactureRoute = require('./routes/manufactureRoute');
let distributorRoute = require('./routes/distributorRoute');
let retailerRoute = require('./routes/RetailerRoute');
let regulatorRoute = require('./routes/regulatorRoute');

let authMiddleware = require('./middleware/authMiddleware')

let vendorRegisterUser = require('./blockchain_network/Vendor/registerUser');
let distributorRegisterUser = require('./blockchain_network/Distributor/registerUser');
let manufactureRegisterUser = require('./blockchain_network/Manufacture/registerUser');
let retailerRegisterUser = require('./blockchain_network/Retailer/registerUser');
let regulatorRegisterUser = require('./blockchain_network/Regulator/registerUser');

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
    res.status(200).json({msg:"Blockchain Api is working"}).end();
});

app.post('/api/login', async (req, res) =>{
    let body = _.pick(req.body, ['email', 'password']);
    console.log(body)
    let sql = 'SELECT * FROM users where email = ?'
    let query = db.query(sql, [body.email], (err, resultset) => {
        if(err) {
            res.status(500).json({msg : "Database Error"}).end();
        } else {
            bcryptjs.compare(body.password, resultset[0].password, (err, success) => {
                if (success) {
                    let token = jwt.sign({email : resultset[0].email, role : resultset[0].type, notificationID : resultset[0].subscriberID, verified : resultset[0].verified},process.env.JSON_SECRET,{expiresIn:'2h'});
                    return res.status(200).json({token}).end();
                } else {
                    return res.status(401).json({msg : "Unauthorized User"}).end();
                }
            })
        }
    });
});


app.post('/api/admin/register', async (req, res) =>{
    try {
    let body = _.pick(req.body, ['email', 'name', 'type', 'password', 'phoneNO']);
    body['verified'] = 1;
    console.log(body)
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(body.password, salt, (err, hash) => {
            body.password = hash;
            let sql = 'INSERT INTO users SET ?';
            let query = db.query(sql, [body], async (err, resultset) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({msg : "Database Error"}).end();   
                } else {
                    let token = jwt.sign({email : body.email, role : body.type},process.env.JSON_SECRET,{expiresIn:'2h'});
                    if(body.type === "Vendor") {
                         await vendorRegisterUser.registerUser(body.email).then((result) => {
                            return res.status(200).json({token}).end();
                        }).catch((err) => {
                            res.status(500).json({msg : JSON.stringify(err)}).end();
                        });
                    } else if(body.type === "Manufacture") {
                        await manufactureRegisterUser.registerUser(body.email).then((result) => {
                            return res.status(200).json({token}).end();
                        }).catch((err) => {
                            res.status(500).json({msg : JSON.stringify(err)}).end();
                        });

                    } else if(body.type === "Distributor") {
                        await distributorRegisterUser.registerUser(body.email).then((result) => {
                            return res.status(200).json({token}).end();
                        }).catch((err) => {
                            res.status(500).json({msg : JSON.stringify(err)}).end();
                        });
                    } else if(body.type === "Retailer") {
                        await retailerRegisterUser.registerUser(body.email).then((result) => {
                            return res.status(200).json({token}).end();
                        }).catch((err) => {
                            res.status(500).json({msg : JSON.stringify(err)}).end();
                        });
                    } else if(body.type === "Regulator") {
                        await regulatorRegisterUser.registerUser(body.email).then((result) => {
                            return res.status(200).json({token}).end();
                        }).catch((err) => {
                            res.status(500).json({msg : JSON.stringify(err)}).end();
                        });
                    } else {    
                        res.sendStatus(404).json({msg: "NO SUCH TYPE EXIST"})
                    }
                }
            });
        });
    });
    } catch(err) {
        res.status(500).json({msg : JSON.stringify(err)}).end();
    }
    
});

//Using all Routes
app.use('/api/vendor', authMiddleware, vendorRoute);
app.use('/api/manufacture', authMiddleware, manufactureRoute);
app.use('/api/retailer', authMiddleware, retailerRoute);
app.use('/api/distributor',authMiddleware, distributorRoute);
app.use('/api/regulator',authMiddleware, regulatorRoute);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`App is running at ${process.env.SERVER_PORT}`)
});
