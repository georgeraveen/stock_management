const express = require('express');
const GRNproductRoutes=express.Router();

let CartProduct = require('../models/GRNcart.model');
let GRNrecord = require('../models/GRNrecord.model');

//add product to grn cart
GRNproductRoutes.route('/addProductGRN').post(function(req,res){
    let addProduct = new CartProduct(req.body);
    addProduct.save()
        .then(addProduct=>{
            CartProduct.find(function(err,products){
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

GRNproductRoutes.route('/viewCart').get(function(req,res){
    CartProduct.find(function(err,products){
        if(err){
            console.log(err);
        }
        else{
            res.json(products);
        }
    });
});
//delete grn item
GRNproductRoutes.route('/deleteGRNitem/:id').delete(function(req,res){
    CartProduct.findOneAndDelete({"_id":req.params.id}, function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            CartProduct.find(function(err,products){
                if(err){
                    console.log(err);
                }
                else{
                    res.json(products);
                }
            });
        }
    })
  })
  //submit grn cart
GRNproductRoutes.route('/submitGRN').post(function(req,res){
    let addGRN = new GRNrecord(req.body);
    addGRN.save()
        .then(addGRN=>{
            res.status(200).json({'record':addGRN});
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});
//delete GRN cart after submit
GRNproductRoutes.route('/deleteGRNcart').delete(function(req,res){
    CartProduct.remove({},function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            CartProduct.find(function(err,products){
                if(err){
                    console.log(err);
                }
                else{
                    res.json(products);
                }
            });
        }
    })
  })

  //view grn history
  GRNproductRoutes.route('/viewGRN').get(function(req,res){
    GRNrecord.find(function(err,records){
        if(err){
            console.log(err);
        }
        else{
            res.json(records);
        }
    }).sort('-_id');
});
module.exports=GRNproductRoutes;