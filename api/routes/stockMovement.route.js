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
//view movement all
stockMovementRoute.route('/viewMoveAll').get(function(req,res){
    stockRecord.find(function(err,history){
        if(err){
            console.log(err);
        }
        else{
            res.json({'history':history});
        }
    });
});
// //view movement date filter //not using now (not working)
// stockMovementRoute.route('/viewMove/:id/:start/:end').get(function(req,res){
//     stockRecord.filter(
//         {"batchID":req.params.id,'recordDate':{$gte:new Date(req.params.start).toISOString(),$lt:new Date(req.params.end).toISOString()}},
//         function(err,history){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.json(history);
//         }
//     });
// });
module.exports=stockMovementRoute;