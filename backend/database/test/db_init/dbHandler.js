const mongoose = require("mongoose");
const config = require("../config.json")
const dbUri = config.dburiLocal

const userFunction = require("../../user")
const studentFunction = require("../../student")
const tutorFunction = require("../../tutor")
const fakeData = require("../test_data/fakeuser_new.json")
const fakeStudent = require("../test_data/fakeStudent.json")
const fakeTutor = require("../test_data/fakeTutor.json")

//models
const User = require("../../model/user.model")
const Tutor = require("../../model/tutor.model")
const Student = require("../../model/student.model")



const initDB = async (addUserCount) => {
 
    const fakeUsers = fakeData.table.slice(0,addUserCount) 
    for (let oneuser of fakeUsers){
      await userFunction.addUser(oneuser)
    }

    console.log("inserted init data")
}

const initFakeStudentData = (addUserCount)=>{
  const fakeUsers = fakeData.table.slice(0,addUserCount) 
  fakeStudent.table.forEach((student)=>{
    //insert to db
    const toInsert = {grade:student.grade,
                      subjectsNeedHelp:student.subjects,
                      freeTime:student.time,
                      preferredFee:student.fee,
                      preferredTeachingMode:student.preferredTeachingMode}

    if(student.studentid <= addUserCount){
      studentFunction.setStudentData(student.studentid,toInsert)
    }
    
    }

   
  )
}
const initFakeTutorData = (addUserCount)=>{
  const fakeUsers = fakeData.table.slice(0,addUserCount) 
  fakeTutor.table.forEach((tutor)=>{
    const toInsert = {subjectsTeach:tutor.subjects,
                      freeTime:tutor.time,
                      isGroupTeachingAllowed:tutor.isGroupTeachingAllowed,
                      isMultiCaseAllowed:tutor.isMultiCaseAllowed

    }
    if(tutor.tutorid <= addUserCount){
      tutorFunction.setTutorData(tutor.tutorid,toInsert)
    }
    

  })
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

//use this one instead
const deleteAllDoc = async ()=>{
  await User.collection.deleteMany({});
  await Student.collection.deleteMany({});
  await Tutor.collection.deleteMany({});
}


//internal use only
const start = async () => {
  await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
  initDB(30)
}

const startMultipleRequestToTutor = (sid,tids)=>{
  Promise.all(tids.map((tid)=>{studentFunction.requestTutor(sid,tid,true)}))
  .then(()=>{return true})
  .catch(()=>{return false})
}

module.exports = {
  initDB:initDB,
  dropAll:dropAll,
  deleteAllDoc:deleteAllDoc,
  initFakeStudentData:initFakeStudentData,
  initFakeTutorData:initFakeTutorData,
  startMultipleRequestToTutor:startMultipleRequestToTutor
}