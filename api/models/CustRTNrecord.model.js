const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CustRTNrecord= new Schema({
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
    collection:'CustRTNrecords'
}
)
CustRTNrecord.set('timestamps', true);


module.exports=mongoose.model('CustRTNrecord',CustRTNrecord);