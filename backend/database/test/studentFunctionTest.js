//handling db connections
const config = require("./config.json")
const mongoose = require("mongoose");
const {initDB,dropAll, deleteAllDoc} = require("./db_init/dbHandler");
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

describe("Testing student db CRUD",()=>{
  before("connnect to db and add test data ",async ()=>{
    //connect to mongodb
    await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
  
    
  })
  after("remove all documents",async ()=>{
    await deleteAllDoc()
    mongoose.disconnect()
  })

  beforeEach("insert new set of test data",async ()=>{
    //insert document here
    await initDB(30)
  })

  afterEach("remove all documents",async ()=>{
  await deleteAllDoc()
  })

  describe("test setStudentData() function",async()=>{
    it ("should successfully insert 1 type of info",async()=>{})
    it ("should successfully insert multiple types of info",async()=>{})
    it ("should successfully alter existing info",async()=>{})
    it ("should successfully alter existing info",async()=>{})
  })
  

})