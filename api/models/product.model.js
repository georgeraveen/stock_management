const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Product= new Schema({
    productName:{
        type:String
    },
    batches:[{    
            batchNo:{
                type:String
            },
            expDate:{
                type:String
            },
            wholePrice:{
                type:String
            },
            retailPrice:{
                type:String
            }
    }]
},
{
    collection:'products'
}
)



module.exports=mongoose.model('Product',Product);