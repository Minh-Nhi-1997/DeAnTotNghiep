const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    table_name: {type: String},
    capacity: { type: Number},
    notes: {type: String}
});

const Table = mongoose.model('table', tableSchema);

module.exports = Table;