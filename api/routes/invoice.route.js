const express = require('express');
const INVCproductRoutes=express.Router();

let INVCCartProduct = require('../models/INVCcart.model');
let INVCrecord = require('../models/INVCrecord.model');

//add product to INVC cart
INVCproductRoutes.route('/addProductINVC').post(function(req,res){
    let addProduct = new INVCCartProduct(req.body);
    addProduct.save()
        .then(
            addProduct=>{
                INVCCartProduct.find(function(err,products){   ///update cart view
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json(products);
                    }
                });
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});

INVCproductRoutes.route('/viewCart').get(function(req,res){
    INVCCartProduct.find(function(err,products){
        if(err){
            console.log(err);
        }
        else{
            res.json(products);
        }
    });
});
//delete INVC item
INVCproductRoutes.route('/deleteINVCitem/:id').delete(function(req,res){
    INVCCartProduct.findOneAndDelete({"_id":req.params.id}, function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            res.json(item);
        }
    })
  })
  //submit INVC cart
INVCproductRoutes.route('/submitINVC').post(function(req,res){
    let addINVC = new INVCrecord(req.body);
    addINVC.save()
        .then(addINVC=>{
            res.status(200).json({'product':'product added succes'});
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});
//delete INVC cart after submit
INVCproductRoutes.route('/deleteINVCcart').delete(function(req,res){
    INVCCartProduct.remove({},function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            res.json(item);
        }
    })
  })

  //view INVC history
  INVCproductRoutes.route('/viewINVC').get(function(req,res){
    INVCrecord.find(function(err,records){
        if(err){
            console.log(err);
        }
        else{
            res.json(records);
        }
    }).sort('-_id');
});
module.exports=INVCproductRoutes;