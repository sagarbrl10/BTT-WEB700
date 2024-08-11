const Sequelize = require('sequelize');

// Create a new instance of Sequelize, connecting to the 'SenecaDB' PostgreSQL database
var sequelize = new Sequelize('SenecaDB', 'SenecaDB_owner', '0aFtpK6wnBkD', {
    host: 'ep-royal-sound-a5634rrr.us-east-2.aws.neon.tech', // Database host
    dialect: 'postgres', // Use PostgreSQL as the database dialect
    port: 5432, // Port for PostgreSQL
    dialectOptions: {
        ssl: { rejectUnauthorized: false } // Enable SSL connection to the database
    },
    query: { raw: true } // Return raw results for queries
});

// Define the Student model with its schema
const Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER, // Data type for studentNum
        primaryKey: true, // studentNum is the primary key
        autoIncrement: true // Automatically increment studentNum
    },
    firstName: Sequelize.STRING, // Data type for firstName
    lastName: Sequelize.STRING, // Data type for lastName
    email: Sequelize.STRING, // Data type for email
    addressStreet: Sequelize.STRING, // Data type for addressStreet
    addressCity: Sequelize.STRING, // Data type for addressCity
    addressProvince: Sequelize.STRING, // Data type for addressProvince
    TA: Sequelize.BOOLEAN, // Data type for TA (Teaching Assistant) status
    status: Sequelize.STRING // Data type for student status (e.g., active, graduated)
});

// Define the Course model with its schema
const Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER, // Data type for courseId
        primaryKey: true, // courseId is the primary key
        autoIncrement: true // Automatically increment courseId
    },
    courseCode: Sequelize.STRING, // Data type for courseCode
    courseDescription: Sequelize.STRING // Data type for courseDescription
});

// Function to retrieve all courses from the database
module.exports.getCourses = function () {
    return new Promise((resolve, reject) => {
        Course.findAll() // Retrieve all courses
            .then(data => resolve(data)) // Resolve with the retrieved data
            .catch(err => reject("no results returned")); // Reject if an error occurs
    });
};

// Define the relationship between Course and Student models
Course.hasMany(Student, { foreignKey: 'course' }); // A course can have many students, with 'course' as the foreign key in the Student table

// Initialize the database by syncing the models
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync() // Sync the models with the database
            .then(() => resolve()) // Resolve if the sync is successful
            .catch(() => reject("unable to sync the database")); // Reject if an error occurs
    });
};

// Function to retrieve all students from the database
module.exports.getAllStudents = function () {
    return new Promise(function (resolve, reject) {
        Student.findAll() // Retrieve all students
            .then(data => resolve(data)) // Resolve with the retrieved data
            .catch(() => reject("no results returned")); // Reject if an error occurs
    });
};

// Function to retrieve students by course ID
module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            where: { course: course } // Filter students by course ID
        })
            .then(data => resolve(data)) // Resolve with the retrieved data
            .catch(() => reject("no results returned")); // Reject if an error occurs
    });
};

// Function to retrieve a student by their student number
module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            where: { studentNum: num } // Filter student by student number
        })
            .then(data => resolve(data[0])) // Resolve with the first result (since studentNum is unique)
            .catch(() => reject("no results returned")); // Reject if an error occurs
    });
};

// Function to retrieve a course by its ID
module.exports.getCourseById = function (id) {
    return new Promise(function (resolve, reject) {
        Course.findAll({
            where: { courseId: id } // Filter course by course ID
        })
            .then(data => resolve(data[0])) // Resolve with the first result (since courseId is unique)
            .catch(() => reject("no results returned")); // Reject if an error occurs
    });
};

// Function to add a new student to the database
module.exports.addStudent = function (studentData) {
    studentData.TA = (studentData.TA) ? true : false; // Ensure TA is a boolean value
    for (let prop in studentData) {
        if (studentData[prop] === "") studentData[prop] = null; // Convert empty strings to null
    }

    return new Promise(function (resolve, reject) {
        Student.create(studentData) // Create a new student with the provided data
            .then(() => resolve()) // Resolve if creation is successful
            .catch(() => reject("unable to create student")); // Reject if an error occurs
    });
};

// Function to update an existing student's details
module.exports.updateStudent = function (studentData) {
    studentData.TA = !!studentData.TA; // Ensure TA is a boolean value
    for (let prop in studentData) {
        if (studentData[prop] === "") studentData[prop] = null; // Convert empty strings to null
    }

    return new Promise((resolve, reject) => {
        Student.update(studentData, {
            where: { studentNum: studentData.studentNum } // Update student where studentNum matches
        })
            .then(() => resolve()) // Resolve if update is successful
            .catch((error) => {
                console.error("Update error:", error); // Log the error for debugging
                reject("Unable to update student");
            });
    });
};

// Function to add a new course to the database
module.exports.addCourse = function (courseData) {
    for (let prop in courseData) {
        if (courseData[prop] === "") courseData[prop] = null; // Convert empty strings to null
    }

    return new Promise(function (resolve, reject) {
        Course.create(courseData) // Create a new course with the provided data
            .then(() => resolve()) // Resolve if creation is successful
            .catch(() => reject("unable to create course")); // Reject if an error occurs
    });
};

// Function to update an existing course's details
module.exports.updateCourse = function (courseData) {
    for (let prop in courseData) {
        if (courseData[prop] === "") courseData[prop] = null; // Convert empty strings to null
    }

    return new Promise(function (resolve, reject) {
        Course.update(courseData, {
            where: { courseId: courseData.courseId } // Update course where courseId matches
        })
            .then(() => resolve()) // Resolve if update is successful
            .catch(() => reject("unable to update course")); // Reject if an error occurs
    });
};

// Function to delete a course by its ID
module.exports.deleteCourseById = function (id) {
    return new Promise(function (resolve, reject) {
        Course.destroy({
            where: { courseId: id } // Delete course where courseId matches
        })
            .then(() => resolve()) // Resolve if deletion is successful
            .catch(() => reject("unable to delete course")); // Reject if an error occurs
    });
};

// Function to delete a student by their student number
module.exports.deleteStudentByNum = function (studentNum) {
    return new Promise(function (resolve, reject) {
        Student.destroy({
            where: { studentNum: studentNum } // Delete student where studentNum matches
        })
            .then(() => resolve()) // Resolve if deletion is successful
            .catch(() => reject("unable to delete student")); // Reject if an error occurs
    });
};