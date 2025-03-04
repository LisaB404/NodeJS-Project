const express = require('express');
const mongoose = require('mongoose');
const sanitize = require('express-mongo-sanitize');

const Course = require('./models/courseModel');
const Typology = require('./models/typologyModel');
const University = require('./models/universityModel');

const courseRoutes = require('./routes/courseRoutes');
const typologyRoutes = require('./routes/typologyRoutes');
const universityRoutes = require('./routes/universityRoutes');

require('dotenv').config();

const MONGO_KEY = process.env.MONGO_KEY;
const MONGO_USERNAME = process.env.MONGO_USERNAME;

const app = express();

//Middleware to use json
app.use(express.json());
//Middleware to sanitize the querys
app.use((req, res, next) => {
    sanitize.sanitize(req.body);
    sanitize.sanitize(req.params);
    sanitize.sanitize(req.query);
    next();
});

//Routes
app.use('/api/courses', courseRoutes);
app.use('/api/typologies', typologyRoutes);
app.use('/api/universities', universityRoutes);


mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_KEY}@educationdb0.qcvtu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=EducationDB0`)
.then(()=>{
    console.log('Connected to database.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})
.catch(()=>{
    console.log('Connection failed:', error);
})