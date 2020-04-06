const express = require('express');
const CustRTNproductRoutes=express.Router();

let CustRTNCartProduct = require('../models/CustRTNcart.model');
let CustRTNrecord = require('../models/CustRTNrecord.model');

//add product to CustRTN cart
CustRTNproductRoutes.route('/addProductCustRTN').post(function(req,res){
    let addProduct = new CustRTNCartProduct(req.body);
    addProduct.save()
        .then(addProduct=>{
            CustRTNCartProduct.find(function(err,products){
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

CustRTNproductRoutes.route('/viewCart').get(function(req,res){
    CustRTNCartProduct.find(function(err,products){
        if(err){
            console.log(err);
        }
        else{
            res.json(products);
        }
    });
});
//delete CustRTN item
CustRTNproductRoutes.route('/deleteCustRTNitem/:id').delete(function(req,res){
    CustRTNCartProduct.findOneAndDelete({"_id":req.params.id}, function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            CustRTNCartProduct.find(function(err,products){
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
  //submit CustRTN cart
CustRTNproductRoutes.route('/submitCustRTN').post(function(req,res){
    let addCustRTN = new CustRTNrecord(req.body);
    addCustRTN.save()
        .then(addCustRTN=>{
            res.status(200).json({'product':'product added succes'});
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});
//delete CustRTN cart after submit
CustRTNproductRoutes.route('/deleteCustRTNcart').delete(function(req,res){
    CustRTNCartProduct.remove({},function(error,item){
        if(error){
            console.log('a');
            console.log(error);
        }
        else{
            CustRTNCartProduct.find(function(err,products){
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

  //view CustRTN history
  CustRTNproductRoutes.route('/viewCustRTN').get(function(req,res){
    CustRTNrecord.find(function(err,records){
        if(err){
            console.log(err);
        }
        else{
            res.json(records);
        }
    }).sort('-_id');
});
module.exports=CustRTNproductRoutes;