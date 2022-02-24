const mongoose = require('mongoose');

const imagePattern  = /^https?:\/\//;

const userSchema = new mongoose.Schema({
    title: {type: String, required: true},
    paintingTechnique: {type: String, required: true},
    image    : {type: String, validate: {
        validator(value){
            return imagePattern.test(value);
        },
        message: 'Invalid image url'
    }},
    certificate: {type: String, enum: ['Yes', 'No'], required: true},
    author: {type: mongoose.Types.ObjectId, ref: 'User'},
    shared: []
});



const Publication = mongoose.model('Publication', userSchema);

module.exports = Publication;