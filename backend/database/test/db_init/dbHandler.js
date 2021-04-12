const mongoose = require("mongoose");
const config = require("../config.json")
const dbUri = config.dburiLocal
const userFunction = require("../../user")
const studentFunction = require("../../student")
const tutorFunction = require("../../tutor")
const fakeData = require("../test_data/fakeuser_new.json")


//models
const User = require("../../model/user.model")
const Tutor = require("../../model/tutor.model")
const Student = require("../../model/student.model")

const initDB = async (addUserCount) => {
    // there's error when inserting the first user, explicitly add one instead
    const firstUser = {
      "realname": "K Hans",
      "username": "K137",
      "password": "abcdE12345",
      "phonenumber": 83134320,
      "email": "K304@gmail.com",
      "role": "tutor"
    }
    await userFunction.addUser(firstUser)

    const fakeUsers = fakeData.table.slice(0,addUserCount) 
    for (let oneuser of fakeUsers){
      await userFunction.addUser(oneuser)
    }


}

/**
 * should not use as it will cause test fail
 */
const dropAll = async ()=>{
  console.log("dropping all collections")
  try{
    await userFunction.dropDB()
    await studentFunction.dropDB()
    await tutorFunction.dropDB()
  }
  catch(err){
    console.error(err)
  }
}

const deleteAllDoc = async ()=>{
  await User.collection.deleteMany({});
  await Student.collection.deleteMany({});
  await Tutor.collection.deleteMany({});
}

module.exports = {initDB:initDB,dropAll:dropAll,deleteAllDoc:deleteAllDoc}