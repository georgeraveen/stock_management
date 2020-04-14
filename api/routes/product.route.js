const express = require('express');
const productRoutes=express.Router();

let Product = require('../models/product.model');

//store new product
productRoutes.route('/add').post(function(req,res){
    let newProduct = new Product(req.body);
    newProduct.save()
        .then(newProduct=>{
            // res.json(newProduct);
            res.status(200).json({'newProduct':newProduct,
                                    'status':true});
        })
        .catch(err=>{
            res.status(400).json({'product':'product added failed',
            'status':false});
        });
});

//get all products
productRoutes.route('/view').get(function(req,res){
    Product.find(function(err,products){
        if(err){
            console.log(err);
        }
        else{
            res.json(products);
        }
    });
});
//get by id
productRoutes.route('/viewID/:id').get(function(req,res){
    Product.findById({"_id":req.params.id},function(err,products){
        if(err){
            console.log('bye');
            console.log(err);
        }
        else{
            // console.log(products)
            res.json(products);
        }
    });
});
//edit product name
productRoutes.route('/editName/:id/:newName').post(function(req,res){
    Product.findOneAndUpdate(
        {"_id":req.params.id},
        {$set:{"productName":req.params.newName}},     
        function(err,p){
            console.log('hi');
            if(err){
                return res.send(err);
            }
            else{
                Product.find(function(errr,products){
                    if(errr){
                        console.log(errr);
                    }
                    else{
                        res.json(products);
                    }
                });
            }
        });
});

//delete product
productRoutes.route('/delete/:id').delete(function(req,res){
    Product.findOneAndDelete({"_id":req.params.id}, function(error,products){
        if(error){
            console.log(error);
        }
        else{
            res.json(products);
        }
    })
  })

module.exports=productRoutes;