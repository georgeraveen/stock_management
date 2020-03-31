const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let GRNrecord= new Schema({
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
    collection:'GRNrecords'
}
)
GRNrecord.set('timestamps', true);


module.exports=mongoose.model('GRNrecord',GRNrecord);