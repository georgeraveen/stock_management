const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let INVCCartProduct= new Schema({
    
    productID:{
        type:String
    },
    batchID:{
        type:String
    },
    preStock:{
        type:Number
    },
    quantity:{
        type:Number
    }

},
{
    collection:'INVCcart'
}
)



module.exports=mongoose.model('INVCCartProduct',INVCCartProduct);