//handling db connections
const config = require("./config.json")
const mongoose = require("mongoose");

const dbUri = config.dburiLocal;
//testing with chai
const chai = require('chai');
chai.use(require('chai-as-promised'));

const assert = require('chai').assert
const expect = require("chai").expect



//function to test
const user = require("../user")
const student = require("../student")
const tutor = require("../tutor")

const fakeData = require("./test_data/fakeuser_new.json")

describe("Testing tutor db CRUD",()=>{

  describe("Test tutorData()",()=>{})
  describe("Test findStudents()",()=>{})
  describe("Test requestStudent()",()=>{
    
    
  })
  describe("Test startCase() ",()=>{})
  describe("Test inviteToCase() ",()=>{})
  describe("Test finishCase()",()=>{})
})