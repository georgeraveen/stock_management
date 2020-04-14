const express = require('express');
const stockMovementRoute=express.Router();

let stockRecord = require('../models/stockMovement.model');


//create new record
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
//add record
stockMovementRoute.route('/addRecord/:id').post(function(req,res){
    stockRecord.findOneAndUpdate(
        {"batchID":req.params.id},
        {$push:{"movement":req.body}},
        function(err,record){
            if(err){
                console.log(err);
                res.json(err);
            }
            else{
                res.json(record);
            }
        }
    )
})
//view movement
stockMovementRoute.route('/viewMove/:id').get(function(req,res){
    stockRecord.findOne(
        {"batchID":req.params.id},
        function(err,history){
        if(err){
            console.log(err);
        }
        else{
            res.json(history);
        }
    });
});
module.exports=stockMovementRoute;