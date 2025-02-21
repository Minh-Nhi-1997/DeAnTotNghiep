const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {type: String},
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
