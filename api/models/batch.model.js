const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Batches= new Schema({
      
            batchNo:{
                type:String
            },
            expDate:{
                type:String
            },
            wholePrice:{
                type:Number
            },
            retailPrice:{
                type:Number
            }
   
},
{
    collection:'batches'
}
)



module.exports=mongoose.model('Product',Product);