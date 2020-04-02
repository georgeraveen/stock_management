const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');
const config = require('./DB.js');
const productRoute= require('./routes/product.route');
const batchRoute= require('./routes/batch.route');
const GRNRoute = require('./routes/GRN.route');
const RTNRoute = require('./routes/RTN.route');
const INVCRoute = require('./routes/invoice.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{useNewUrlParser:true}).then(
    ()=>{console.log('Database is connected')},
    err => {console.log('cannot connect to database '+err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/newProduct',productRoute);
app.use('/Batch',batchRoute);
app.use('/viewProduct',productRoute);
app.use('/addGRN',GRNRoute);
app.use('/viewGRN',GRNRoute);
app.use('/addRTN',RTNRoute);
app.use('/viewRTN',RTNRoute);
app.use('/addINVC',INVCRoute);
app.use('/viewINVC',INVCRoute);

app.listen(PORT,function(){
    console.log('Server is running on port: ',PORT);
});