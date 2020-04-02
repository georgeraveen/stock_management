const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CartProduct= new Schema({
    
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
    collection:'GRNcart'
}
)



module.exports=mongoose.model('CartProduct',CartProduct);