const express = require('express');
const batchRoutes=express.Router();

let Product = require('../models/product.model')

//store new batch
batchRoutes.route('/add/:name').post(function(req,res){
    Product.findOneAndUpdate(
        {"productName":req.params.name},
        {$push:{"batches":req.body}},
        
        function(err,batch){
            if(err){
                return res.send(err);
            }
            return res.json(batch);
        });
});

//delete batch
batchRoutes.route('/delete/:name/:Bid').post(function(req,res){
    Product.findOneAndUpdate(
        {"_id":req.params.name},
        {$pull:{"batches":{"batchNo":req.params.Bid}}},
        
        function(err,batch){
            if(err){
                console.log('asd');
                return res.send(err);
            }
            return res.json(batch);
        });
    
});

//get by id
batchRoutes.route('/viewID/:id/:bid').get(function(req,res){
    Product.find({"batches":{"_id":req.params.bid}},function(err,batches){
        if(err){
            console.log('bye');
            console.log(err);
        }
        else{
            console.log(batches)
            res.json(batches);
        }
    });
});
module.exports=batchRoutes;