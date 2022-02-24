const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale   : 'en',
        strength : 2
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;