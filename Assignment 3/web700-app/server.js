/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name:Sagar Baral              Student ID:137598231           Date:7/7/2024
*
*  Online (vercel) Link: https://vercel.com/sagar-barals-projects/btt-web-700
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
const collegeData = require("./modules/collegeData");

// Middleware to handle URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the "public" folder
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

// Route to display the "Add Student" form
app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addStudents.html"));
});

app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course).then(data => {
            res.json(data);
        }).catch(err => {
            res.json({ message: "no results" });
        });
    } else {
        collegeData.getAllStudents().then(data => {
            res.json(data);
        }).catch(err => {
            res.json({ message: "no results" });
        });
    }
});

app.get("/tas", (req, res) => {
    collegeData.getTAs().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: "no results" });
    });
});

app.get("/courses", (req, res) => {
    collegeData.getCourses().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: "no results" });
    });
});

app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num).then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: "no results" });
    });
});

// Route to handle form submission for adding a new student
app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body).then(() => {
        res.redirect('/students');
    }).catch(err => {
        res.status(500).send('Unable to add student');
    });
});

// Handle 404 - Page Not Found
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize the data and start the server
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("server listening on port: " + HTTP_PORT);
    });
}).catch(err => {
    console.log("unable to start server: " + err);
});
