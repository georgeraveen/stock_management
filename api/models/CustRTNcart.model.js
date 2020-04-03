const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CustRTNCartProduct= new Schema({
    
    productID:{
        type:String
    },
    batchID:{
        type:String
    },
    preStock:{
        type:Number
    },
    FreeQuantity:{
        type:Number
    },
    quantity:{
        type:Number
    }

},
{
    collection:'CustRTNcart'
}
)



module.exports=mongoose.model('CustRTNCartProduct',CustRTNCartProduct);