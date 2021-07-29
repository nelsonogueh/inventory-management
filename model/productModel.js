const mongoose = require('./db/database')

const productSchema = mongoose.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    os: { type: String, required: true },
    price: { type: Number,  required: true },
    no_remaining: { type: String, required: true },
    imageURL: { type: String, required: true },
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
}, {versionKey: false});

const Product = mongoose.model('Products', productSchema)
module.exports = Product