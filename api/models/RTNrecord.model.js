const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let RTNrecord= new Schema({
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
        quantity:{
            type:Number
        }
    }]
    

},
{
    collection:'RTNrecords'
}
)
RTNrecord.set('timestamps', true);


module.exports=mongoose.model('RTNrecord',RTNrecord);