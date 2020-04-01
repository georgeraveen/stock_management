const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let RTNCartProduct= new Schema({
    
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
    collection:'RTNcart'
}
)



module.exports=mongoose.model('RTNCartProduct',RTNCartProduct);