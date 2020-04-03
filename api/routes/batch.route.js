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
                return res.json({'status':false});
            }
            return res.json({'status':true});
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

//get by id--------------no need
// batchRoutes.route('/viewID/:id/:bid').get(function(req,res){
//     Product.findOne({"_id":req.params.id,"batches._id":req.params.bid},function(err,prs){
//         if(err){
//             console.log('bye');
//             console.log(err);
//         }
//         else{
//             // console.log(batches);

//             res.json(prs);
//         }
//     });
// });

// GRN stock
batchRoutes.route('/GRNstock/:id/:bid').post(function(req,res){
    Product.findOneAndUpdate(
        // {"_id":req.params.id},
        {"_id":req.params.id,"batches._id":req.params.bid},
        {$set:{"batches.$.currentStock":req.body.quantity}},     
        function(err,qty){
            if(err){
                return res.send(err);
            }
            return res.json(qty);
        });
});
// RTN stock
batchRoutes.route('/RTNstock/:id/:bid').post(function(req,res){
    Product.findOneAndUpdate(
        // {"_id":req.params.id},
        {"_id":req.params.id,"batches._id":req.params.bid},
        {$set:{"batches.$.currentStock":req.body.quantity}},     
        function(err,qty){
            if(err){
                return res.send(err);
            }
            return res.json(qty);
        });
});
// invoice stock
batchRoutes.route('/INVCstock/:id/:bid').post(function(req,res){
    Product.findOneAndUpdate(
        // {"_id":req.params.id},
        {"_id":req.params.id,"batches._id":req.params.bid},
        {$set:{"batches.$.currentStock":req.body.quantity}},     
        function(err,qty){
            if(err){
                return res.send(err);
            }
            return res.json(qty);
        });
});
// cust rtn stock
batchRoutes.route('/CustRTNstock/:id/:bid').post(function(req,res){
    Product.findOneAndUpdate(
        {"_id":req.params.id,"batches._id":req.params.bid},
        {$set:{"batches.$.currentStock":req.body.quantity}},     
        function(err,qty){
            if(err){
                return res.send(err);
            }
            return res.json(qty);
        });
});
module.exports=batchRoutes;