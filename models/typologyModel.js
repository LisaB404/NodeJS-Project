const mongoose = require('mongoose');
const { Schema } = mongoose;

const typologySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter course type.'],
    }
});


module.exports = mongoose.model('Typology', typologySchema);