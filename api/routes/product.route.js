const express = require('express');
const productRoutes=express.Router();

let Product = require('../models/product.model');

//store new product
productRoutes.route('/add').post(function(req,res){
    let newProduct = new Product(req.body);
    newProduct.save()
        .then(newProduct=>{
            res.status(200).json({'product':'product added succes'});
        })
        .catch(err=>{
            res.status(400).send("unable to save database");
        });
});

//get products
productRoutes.route('/view').get(function(req,res){
    Product.find(function(err,products){
        if(err){
            console.log('bye');
            console.log(err);
        }
        else{
            res.json(products);
        }
    });
});

//delete product
productRoutes.route('/delete/:id').delete(function(req,res){
    Product.findByIdAndRemove(req.params.id, function(error,products){
        if(error){
            console.log('bye');
            console.log(error);
        }
        else{
            res.json(products);
        }
    })
  })

module.exports=productRoutes;