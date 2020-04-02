const express = require('express');
const RTNproductRoutes=express.Router();

let RTNCartProduct = require('../models/RTNcart.model');
let RTNrecord = require('../models/RTNrecord.model');

//add product to RTN cart
RTNproductRoutes.route('/addProductRTN').post(function(req,res){
    let addProduct = new RTNCartProduct(req.body);
    addProduct.save()
        .then(addProduct=>{
            res.status(200).json({'product':'product added succes'});
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});

RTNproductRoutes.route('/viewCart').get(function(req,res){
    RTNCartProduct.find(function(err,products){
        if(err){
            console.log(err);
        }
        else{
            res.json(products);
        }
    });
});
//delete RTN item
RTNproductRoutes.route('/deleteRTNitem/:id').delete(function(req,res){
    RTNCartProduct.findOneAndDelete({"_id":req.params.id}, function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            res.json(item);
        }
    })
  })
  //submit RTN cart
RTNproductRoutes.route('/submitRTN').post(function(req,res){
    let addRTN = new RTNrecord(req.body);
    addRTN.save()
        .then(addRTN=>{
            res.status(200).json({'product':'product added succes'});
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});
//delete RTN cart after submit
RTNproductRoutes.route('/deleteRTNcart').delete(function(req,res){
    RTNCartProduct.remove({},function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            res.json(item);
        }
    })
  })

  //view RTN history
  RTNproductRoutes.route('/viewRTN').get(function(req,res){
    RTNrecord.find(function(err,records){
        if(err){
            console.log(err);
        }
        else{
            res.json(records);
        }
    }).sort('-_id');
});
module.exports=RTNproductRoutes;