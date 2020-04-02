const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let GRNrecord= new Schema({
    remarks:{
        type:String
    },
    items:[{
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
    }]
    

},
{
    collection:'GRNrecords'
}
)
GRNrecord.set('timestamps', true);


module.exports=mongoose.model('GRNrecord',GRNrecord);