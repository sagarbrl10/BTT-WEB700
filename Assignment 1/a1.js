/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Sagar Baral Student ID: 137598231 Date: May 15, 2024*
********************************************************************************/ 

console.log("Hello World");
const studentName = "Sagar Baral";
const studentEmail = "sbaral10@myseneca.ca";
const serverVerbs = ["GET", "GET", "GET", "POST", "GET", "POST"];
const serverPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout"];
const serverResponses = [
  "Welcome to WEB700 Assignment 1",
  "This assignment was prepared by " + studentName,
  studentName + ": " + studentEmail,
  "User Logged In",
  "Main Panel",
  "Logout Complete"];

  function httpRequest(httpVerb, path) {
    for (let i = 0; i < serverPaths.length; i++) {
      if (serverVerbs[i] === httpVerb && serverPaths[i] === path) {
        return `200: ${serverResponses[i]}`;
      }
    }
    return `404: Unable to process ${httpVerb} request for ${path}`;
  }
console.log(httpRequest("GET", "/"));
console.log(httpRequest("GET", "/about"));
console.log(httpRequest("GET", "/contact"));
console.log(httpRequest("POST", "/login"));
console.log(httpRequest("GET", "/panel")); 
console.log(httpRequest("POST", "/logout"));
console.log(httpRequest("PUT", "/")); 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function automateTests() {
    const testVerbs = ["GET", "POST"];
    const testPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout", "/randomPath1", "/randomPath2"];
    function randomRequest() {
      const randVerb = testVerbs[getRandomInt(testVerbs.length - 1)];
      const randPath = testPaths[getRandomInt(testPaths.length - 1)];
      console.log(httpRequest(randVerb, randPath));
    }
    setInterval(randomRequest, 1000);
}
automateTests();