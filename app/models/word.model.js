const mongoose = require('mongoose');
                                                // model for word collection
const wordschema =  mongoose.Schema(
    {
        email: {type: String, required: false},
        url: {type: String, required: true},
        wno: {type: String, required: true }
    });
    module.exports = mongoose.model('word',wordschema);