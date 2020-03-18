const express = require('express');
const productRoutes=express.Router();

let Product = require('./product.model');

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

module.exports=productRoutes;