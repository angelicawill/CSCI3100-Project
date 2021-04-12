const mongoose = require("mongoose");
const assert = require('chai').assert
const config = require("./config.json")
const dbUri = config.dburiLocal
const user = require("../user")
const student = require("../student")
const tutor = require("../tutor")
const fakeData = require("./test_data/fakeuser_new.json")
const {initDB,dropAll, deleteAllDoc} = require("./db_init/dbHandler")


describe ("testing addUser()",()=>{
  before("connnect to db",async ()=>{
    //connect to mongodb
    await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
    console.log("connected to db")


  })

  beforeEach("insert new set of test data",async ()=>{
      //insert document here
      await initDB(30)
    })




  afterEach("remove all documents",async ()=>{
    await deleteAllDoc()
    })

  after(async ()=>{
    /*
    await user.dropDB()
    await student.dropDB()
    await tutor.dropDB()
    */
    mongoose.disconnect()
  })



  describe("test add duplicate user", ()=>{
    const sameUserName = {
      "realname": "Kurt Caiden",
      "username": "Kurt75157",
      "password": "abcdE12345",
      "phonenumber": 53041112531,
      "email": "Kurt30211129@gmail.com",
      "role": "tutor"
  }
    const samePhone = {
      "realname": "Kurt Caiden",
      "username": "Ku111rt75157",
      "password": "abcdE12345",
      "phonenumber": 53042531,
      "email": "Kur222t30229@gmail.com",
      "role": "tutor"
  }

    const sameEmail = {
      "realname": "Kurt Caiden",
      "username": "Kurtdfds75157",
      "password": "abcdE12345",
      "phonenumber": 530454342531,
      "email": "Kurt30229@gmail.com",
      "role": "tutor"
  }
    const allDifferent =  {
      "realname": "Kurt Caiden",
      "username": "Kurtdfds75157",
      "password": "abcdE12345",
      "phonenumber": 530454342531,
      "email": "Kurt302dsffsd29@gmail.com",
      "role": "tutor"
  }
    it("should not add with same username",async ()=>{
      const a = await user.addUser(sameUserName)
      assert.equal(a,false)
    })
    it("should not add with same phone",async ()=>{
      const a = await user.addUser(samePhone)
      assert.equal(a,false)
    })
    it("should not add with same email",async ()=>{
      const a = await user.addUser(sameEmail)
      assert.equal(a,false)
    })
    it("should add with all field all different",async()=>{
      assert.equal(await user.addUser(allDifferent),true)
    })

  })


})
