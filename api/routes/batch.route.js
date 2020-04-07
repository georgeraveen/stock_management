const express = require('express');
const batchRoutes=express.Router();

let Product = require('../models/product.model')

//store new batch
batchRoutes.route('/add/:id').post(function(req,res){
    Product.findOneAndUpdate(
        {"_id":req.params.id},
        {$push:{"batches":req.body}},
        
        function(err,batch){
            if(err){
                return res.json({'status':false});
            }
            Product.find(function(err,products){
                if(err){
                    console.log(err);
                }
                else{
                    res.json(products);
                }
            });
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
            else{
                Product.find(function(err,products){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json(products);
                    }
                });
            }
        });
    
});
//edit batch details
batchRoutes.route('/editBatch/:id/:bid').post(function(req,res){
    console.log('dsd');
    Product.findOneAndUpdate(
        {"_id":req.params.id,"batches._id":req.params.bid},
        {$set:{"batches.$.batchNo":req.body.newbatchNo,
                "batches.$.expDate":req.body.newexpDate,
                "batches.$.wholePrice":req.body.newwholePrice,
                "batches.$.retailPrice":req.body.newretailPrice}},     
        function(err,qty){
            if(err){
                return res.send(err);
            }
            else{
                Product.find(function(err,products){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json(products);
                    }
                });
            }
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