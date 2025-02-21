const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: String},
    img: {type: String},
    c_id: {type: String},
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
