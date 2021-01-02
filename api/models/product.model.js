const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Product = new Schema({
    productName: {
        type: String
    },
    stockMaintain: {
        type: Number
    },
    batches: [{
        batchNo: {
            type: String
        },
        expDate: {
            type: Date
        },
        wholePrice: {
            type: Number
        },
        retailPrice: {
            type: Number
        },
        currentStock: {
            type: Number
        }
    }]
},
    {
        collection: 'products'
    }
)



module.exports = mongoose.model('Product', Product);