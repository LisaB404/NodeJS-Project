const mongoose = require('mongoose');
const { Schema } = mongoose;

const universitySchema = new Schema({
        name: {
            type: String,
            required: [true, 'Please enter university name.'],
        },
        courses: [{
            type: Schema.Types.ObjectId,
            ref: 'Course',
        }],
});

module.exports = mongoose.model('University', universitySchema); //allow mongoose to use it model in mongo database