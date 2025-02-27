const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter course name.'],
        },
        courseType: {
            type: String,
            required: [true, 'Please enter course type.'],
        },
        univeristies: {
            type: String, //to change type: Schema.Types.ObjectId
            required: true,
        }
    }
);

const Course = mongoose.model('Course', CourseSchema); //allow mongoose to use it model in mongo database

module.exports = Course;