const fs = require('fs');
const path = require('path');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../data/students.json'), 'utf8', (err, data) => {
      if (err) {
        reject('Unable to read students.json');
        return;
      }
      let students = JSON.parse(data);
      fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf8', (err, data) => {
        if (err) {
          reject('Unable to read courses.json');
          return;
        }
        let courses = JSON.parse(data);
        dataCollection = new Data(students, courses);
        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject('Data collection not initialized');
      return;
    }
    if (dataCollection.students.length === 0) {
      reject('No results returned');
      return;
    }
    resolve(dataCollection.students);
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject('Data collection not initialized');
      return;
    }
    let tas = dataCollection.students.filter(student => student.TA);
    if (tas.length === 0) {
      reject('No results returned');
      return;
    }
    resolve(tas);
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject('Data collection not initialized');
      return;
    }
    if (dataCollection.courses.length === 0) {
      reject('No results returned');
      return;
    }
    resolve(dataCollection.courses);
  });
}

module.exports = { initialize, getAllStudents, getTAs, getCourses };