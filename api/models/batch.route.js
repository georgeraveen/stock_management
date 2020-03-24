const express = require('express');
const batchRoutes=express.Router();

let Product = require('./product.model')

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
        {"productName":req.params.name},
        {$pull:{"batches":{"batchNo":req.params.Bid}}},
        
        function(err,batch){
            if(err){
                console.log('asd');
                return res.send(err);
            }
            return res.json(batch);
        });
    
});

module.exports=batchRoutes;