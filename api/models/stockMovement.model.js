const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let stockMovement= new Schema({
    
    productID:{
        type:String
    },
    batchID:{
        type:String
    },
    movement:[{
        recordDate:{
            type:Date
        },
        moveType:{
            type:String
        },
        moveID:{
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
    collection:'stockMovement'
}
)



module.exports=mongoose.model('stockMovement',stockMovement);