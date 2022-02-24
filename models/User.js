const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username     : {type: String, required: true, minlength: [3, 'Username must be at leat 3 characters long']},
    password     : {type: String, required: true, minlength: [4, 'Username must be at leat 4 characters long']},
    address      : {type: String, required: true, minlength: [20, 'Address must be at leat 20 characters long']},
    publications : [{type: mongoose.Types.ObjectId, ref: 'Publication'}]
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