let jwt = require('jsonwebtoken');

require('dotenv').config()
module.exports = (req, res, next) => {
    let token = req.header('token');
    try {
        let verify = jwt.verify(token, process.env.JSON_SECRET);
        let decode = jwt.decode(token);
        req.id = decode.email;
        console.log(req.id);
        next();
    }  catch(e) {
        res.json({err : e}).status(500).end();
    }
}