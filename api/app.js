let express = require('express');
let bodyParser = require('body-parser');

require('dotenv').config()
let app = express();


app.listen(process.env.SERVER_PORT, () => {
    console.log(`App is running at ${process.env.SERVER_PORT}`)
});