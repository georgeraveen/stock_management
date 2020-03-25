const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let GRNcart= new Schema({
    cartName:{
        type:String
    },
    dateTime:{
        type:Date
    },
    productList:[{
            productID:{
                type:String
            },
            productName:{
                type:String
            },
            batchID:{
                type:String
            },
            batchNo:{
                type:String
            },
            stock:{
                type:Number
            },
            quantity:{
                type:Number
            }
    }]
},
{
    collection:'GRNcart'
}
)



module.exports=mongoose.model('GRNcart',GRNcart);