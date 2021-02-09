const mongoose = require('mongoose');
                                                        ///// model for users coolection

const signupschema =  mongoose.Schema(
    {
        username: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true }
    });
module.exports = mongoose.model('users',signupschema);