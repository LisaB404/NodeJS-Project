# NodeJS Project

## Description
NodeJS Education project for the Start2Impact University Master's in Full Stack Development.
The aim of the project is to create API JSON RESTful to manage courses.

## Installation
To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/LisaB404/NodeJS-Project
   cd nodejs-project
2. Navigate to the project directory and install the dependencies:
`npm install`
3. Database configuration:
- Create a MongoDB account
- Create a .env file based on the .env.example file and configure your environment variables.
4. Start the application:
`npm start`
5. The server will be running by default at `http://localhost:3000` but yuo can specify a different port in the env.example
## API Endpoints
Below you can find the API endopoints available in the project.
### Courses
- GET /: Retrieve all courses.
- GET /name/:name: Retrieve a course by its name.
- POST /: Add a new course.
- PUT /:id: Update an existing course by ID.
- DELETE /:id: Delete a course by ID.
### Universities
- GET /: Retrieve all universities.
- POST /: Add a new university.
- PUT /:id: Update an existing university by ID.
- DELETE /:id: Delete a university by ID.
### Typologies
- GET /: Retrieve all typologies.
- GET /:typology: Retrieve all courses of a certain typology.
- POST /: Add a new typology.
- PUT /:id: Update an existing typology by ID.
- DELETE /:id: Delete a typology by ID.
## 📸 Preview
Here is a testing example made with Postman:
![Screenshot 2025-03-04 175850](https://github.com/user-attachments/assets/f322cbd9-2d03-4c4d-8026-6e76d1ac0193)
