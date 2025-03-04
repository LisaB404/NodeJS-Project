# NodeJS Project

## Description
NodeJS Education project for the Start2Impact University Master's in Full Stack Development.
The aim of the project is to create API JSON RESTful to manage courses.

## Installation
To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nodejs-project
2. Install the dependencies:
`npm install`
Create a .env file based on the .env.example file and configure your environment variables.
3. Start the application:
`npm start`
## API Endpoints
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
