const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter course name.'],
    },
    courseType: {
        type: String,
        required: [true, 'Please enter course type.'],
    },
    universities: [{ //array because a course can be added to multiple Universities
        type: Schema.Types.ObjectId,
        ref: 'University',
        required: true,
    }]
});

module.exports = mongoose.model('Course', courseSchema); //allow mongoose to use the model in mongo database