const express = require('express');
const mongoose = require('mongoose');

const Course = require('./models/courseModel');
const University = require('./models/universityModel');

const courseRoutes = require('./routes/courseRoutes');
const typologyRoutes = require('./routes/typologyRoutes');

require('dotenv').config();

const MONGO_KEY = process.env.MONGO_KEY;
const MONGO_USERNAME = process.env.MONGO_USERNAME;

const app = express();
//Middleware
app.use(express.json()); //allow to use json

//Routes
app.use('/api/courses', courseRoutes);
app.use('/api/typologies', typologyRoutes);




//API that allows to see all the universities
app.get('/api/university', async (req, res)=>{
    try {
        const universities = await University.find({});
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//API that allows to create a new univerity
app.post('/api/university', async (req, res)=>{
    try {
        const university = await University.create(req.body);
        res.status(201).json(university);
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
    console.log('Connection failed:', error);
})