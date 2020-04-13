const express = require('express');
const stockMovementRoute=express.Router();

let stockRecord = require('../models/stockMovement.model');


//add product to grn cart
stockMovementRoute.route('/newRecord').post(function(req,res){
    let newRecord = new stockRecord(req.body);
    newRecord.save()
        .then(newAddRecord=>{
            res.json(newAddRecord);
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});

module.exports=stockMovementRoute;