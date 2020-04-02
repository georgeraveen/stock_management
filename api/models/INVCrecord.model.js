const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let INVCrecord= new Schema({
    remarks:{
        type:String
    },
    discount:{
        type:Number
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
        quantity:{
            type:Number
        }
    }]
    

},
{
    collection:'INVCrecords'
}
)
INVCrecord.set('timestamps', true);


module.exports=mongoose.model('INVCrecord',INVCrecord);