/*
The collection of functions allows a tutor to get access to various resource in the database
You should ensure all input parameters are correct in format and content

functions
getTutorData() return the document with a given tutor ID
setTutorData()
findStudents(tutorid) return a list of students according to tutor's preference
requestStudent()      to start/ cancel a request to a student
startCase()           start an empty case
inviteToCase()        invite student(s) to a case
finishCase()          set the status of case (isClosed) to true
getReceivedRequest()  return the array of request
*/
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction")

const getTutorData = async (tutorid) => {
  return await Tutor.findOne({tutorid:tutorid}).exec()
}

const setTutorData = async (tutorid,datas) => {
  const setOfKey = ["subjectsTeach","freeTime","preferredLocation","isGroupTeachingAllowed","isMultiCaseAllowed"]
  for (idx in Object.keys(datas)){
    if (! setOfKey.includes(Object.keys(datas)[idx])){
      throw new Error("it contains fields can't be alter")
    }
  }
  const res = await Tutor.findOneAndUpdate({tutorid:tutorid},{$set:datas})
  if (res != null){
    return true
  }
  return false
}
/**
 * This function correspond to 'search for a student'
 * @param {Number} tutorid 
 * @param {String} sorted by a valid string: preferredFee,preferredTeachingMode, subjectCount
 * @returns {Object} student with informations
 * @returns{[Object]} list of student with informations, sort by hourly rate
 */
 const findStudents = async (tutorid,sortedBy) => {
  //find a student that match subject and time
  const tutor = await getTutorData(tutorid)
  const subj = tutor["subjectsTeach"]
  const freeTime = tutor["freeTime"]
  const matched = await Student.aggregate([
    //return all students such that a tutor can help with him with at least one subject
    {"$match":{
      "$expr":{
        "$gt":[{"$size":{"$setIntersection":[subj,"$subjectsNeedHelp"]}},0
        ]
      }
    }},
    {"$project":{
      "_id":0,
      "grade":1,
      "studentid":1,
      "freeTime":1,
      "preferredFee":1,
      "preferredTeachingMode":1,
      "subjects":{"$setIntersection":[subj,"$subjectsNeedHelp"]},
      "subjectCount":{"$size":{"$setIntersection":[subj,"$subjectsNeedHelp"]}}
    }}
  ])
  //right now still keep tutor with no time match
  matched.filter((tutor)=>{getAvailableHours(freeTime,tutor.freeTime)>0})

  return sortedByObjKey(matched,sortedBy,true)
}
/**
 * 
 * @param {Number} studentid 
 * @param {Number} tutorid 
 * @param {Boolean} isAddedTo True: make a reuqest, False: cancel a request
 * @returns {Boolean} success request or not
 */
const requestStudent = async (studentid, tutorid, isAddedTo) => {
  try{
    if (await getStudentData(studentid) === null || await getTutorData(tutorid) === null){
      throw new Error("no valid user found")
    }

    if (isAddedTo){
      /*
      await Promise.all([
        Student.findOneAndUpdate({studentid:studentid},{$push:{receivedTutorRequest:tutorid}}),
        Tutor.findOneAndUpdate({tutorid:tutorid},{$push:{studentRequest:studentid}})
      ])
      */
      resTutor = await Tutor.findOneAndUpdate({tutorid:tutorid,studentRequest:{"$ne":studentid}},
        {$push:{studentRequest:studentid}}).exec()
      resStudent = await Student.findOneAndUpdate({studentid:studentid,receivedTutorRequest:{"$ne":tutorid}},
        {$push:{receivedTutorRequest:tutorid}}).exec()

      if(resStudent === null || resTutor === null){
        return false
      }
    }
    else{
      /*
      await Promise.all([
        Student.findOneAndUpdate({studentid:studentid},{$pull:{receivedTutorRequest:tutorid}}),
        Tutor.findOneAndUpdate({tutorid:tutorid},{$pull:{studentRequest:studentid}})
      ])
      */
      resTutor = await Tutor.findOneAndUpdate({tutorid:tutorid,studentRequest:{"$elemMatch":{"$eq":studentid}}},
      {$pull:{studentRequest:studentid}}).exec()
      if(!resTutor){ //short circult and stop the next operation
        return false
      }
      resStudent = await Student.findOneAndUpdate({studentid:studentid,receivedTutorRequest:{"$elemMatch":{"$eq":tutorid}}},
      {$pull:{receivedTutorRequest:tutorid}}).exec()
    if(!resTutor){
      //push back again to the tutorid db
      await Tutor.findOneAndUpdate({tutorid:tutorid},{$push:{studentRequest:studentid}}).exec()
      return false
    }
    }
    return true
  }
  catch(err){
    return false
  }
}

/**
 * Corresponded to 'start a case', it will add a 'case' document with only tutor(s)
 * @param {[Number]} tutorid 
 */
const startCase = async (tutorid) => {
  // add a document in Case schema, with the tutorid
  const count = await Case.countDocuments()
  const newCase = new Case({caseid:count+1,tutorid:tutorid})
  try{
    await Promise.all([newCase.save(),
      Tutor.findOneAndUpdate({tutorid:tutorid},{$push:{cases:count+1}}).exec()])
    return true
    
  }
  catch (err) {
    //if any error, return false
    console.error(err)
    return false
  }
  
}
/**
 * 
 * @param {Number} studentList 
 * @param {Number} tutorid 
 * @param {Number} caseid 
 * @returns {Boolean} success invite or not
 */
const inviteToCase = async (studentList, tutorid,caseid) => {
  //add student list to Case's 'studentid' field
  try{
    await Case.findOneAndUpdate({caseid:caseid},{tutorid:tutorid,$push:{studentid:studentList}})
    return true
  }
  catch (err){
    console.error(err)
    return false
  }
  //failure on invitation: user already in a case, not found user...
}
/**
 * 
 * @param {Nubmer} tutorid 
 * @param {Number} caseid 
 * @returns {Boolean} success finish case or not
 */
const finishCase = async (tutorid, caseid) => {
  try{
    await Case.findOneAndUpdate({caseid:caseid},{isClosed:true})
    return true
  }
  catch (err){
    console.error(err)
    return false
  }
}

const getReceivedRequest = async(tutorid) => {
  
}

const dropDB = async () => {
  await Tutor.collection.drop()
}

module.exports = {
  getTutorData:getTutorData,
  setTutorData:setTutorData,
  requestStudent:requestStudent,
  startCase:startCase,
  inviteToCase:inviteToCase,
  finishCase:finishCase,
  dropDB:dropDB,
  getReceivedRequest:getReceivedRequest
}