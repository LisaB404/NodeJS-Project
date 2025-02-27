const express = require('express');
const mongoose = require('mongoose');

const Course = require('./models/course.model');

require('dotenv').config();

const MONGO_KEY = process.env.MONGO_KEY;
const MONGO_USERNAME = process.env.MONGO_USERNAME;

const app = express();
app.use(express.json()); //allow to use json

const courses = require('./courses');

app.get('/courses', (req, res)=>{
    res.send('Node API server update');
    //res.json(courses);
});

app.post('/courses', async (req, res)=>{
    try {
        const Course = await Course.create(req.body);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_KEY}@educationdb0.qcvtu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=EducationDB0`)
.then(()=>{
    console.log('Connected to database.');
    app.listen(3000, ()=>{
        console.log('Listening to port 3000.');
    });
})
.catch(()=>{
    console.log('Connection failed.');
})