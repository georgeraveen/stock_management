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
                type:Number
            },
            retailPrice:{
                type:Number
            },
            currentStock:{
                type:Number
            }
    }]
},
{
    collection:'products'
}
)



module.exports=mongoose.model('Product',Product);