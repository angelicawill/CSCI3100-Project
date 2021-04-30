/*
The collection of functions allows a tutor to get access to various resource in the database
You should ensure all input parameters are correct in format and content

functions: you should looked into the functions definition and the docstring to see what are the parameters
getTutorData() return the document with a given tutor ID, moved to userGetter.js
setTutorData() set the status of a tutor availabilty
findStudents() return a list of students according to tutor's preference
requestStudent()      to start/ cancel a request to a student
startCase()           start an empty case
inviteToCase()        invite student(s) to a case
finishCase()          set the status of case (isClosed) to true
*/
const u = require("underscore")

const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction")
const {getStudentData,getTutorData} = require("./userGetter")


/**
 * Update a tutor's availability with exist tutor id and datas
 * @param {Number} tutorid 
 * @param {Object} datas 
 * @returns 
 */
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
const requestStudent = async (tutorid, studentid, isAddedTo) => {
  try{
    await getStudentData(studentid)
    await getTutorData(tutorid)

    if (isAddedTo){
      resTutor = await Tutor.findOneAndUpdate({tutorid:tutorid,studentRequest:{"$ne":studentid}},
        {$push:{studentRequest:studentid}}).exec()
      resStudent = await Student.findOneAndUpdate({studentid:studentid,receivedTutorRequest:{"$ne":tutorid}},
        {$push:{receivedTutorRequest:tutorid}}).exec()

      if(resStudent === null || resTutor === null){
        return false
      }
    }
    else{
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
 * @returns {Number} caseid, or 0 with isMultiCaseAllowed is False
 */
const startCase = async (tutorid) => {
  // add a document in Case schema, with the tutorid
  const count = await Case.countDocuments()
  const newCase = new Case({caseid:count+1,tutorid:tutorid})
  const tutorInCharge = await getTutorData(tutorid)
  if(tutorInCharge["isMultiCaseAllowed"] || (!tutorInCharge["isMultiCaseAllowed"] && tutorInCharge["cases"].length === 0)){
    await Promise.all([newCase.save(),
      Tutor.findOneAndUpdate({tutorid:tutorid},{$push:{cases:count+1}}).exec()])
    return count+1
  }
  else{

    return 0
  }

    

  
}
/**
 * This function can invite student(s) to a case
 * @param {Number} studentList 
 * @param {Number} tutorid 
 * @param {Number} caseid 
 * @returns {Boolean} success invite or not
 */
const inviteToCase = async (studentList, tutorid,caseid) => {
  //add student list to Case's 'studentid' field

  const prev = (await Case.findOne({caseid:caseid}))["studentid"]
  const x = await Case.findOneAndUpdate({caseid:caseid,studentid:{"$ne":studentList},tutorid:tutorid},
  [
    {"$set":{studentid:
      {"$setUnion":[{"$setDifference":[studentList,"$studentid"]},"$studentid"]}
      //{"$setDifference":[studentList,"$studentid"]}
    }}
    
  ]
  ).exec()
  const after = (await Case.findOne({caseid:caseid}))["studentid"]

  if(x == null){
    return false
  }
  if (u.isEqual(prev,after)){
    return false
  }
  return true


  
}
/**
 * To finish a case by specific tutor, given the case is not yet finish
 * @param {Nubmer} tutorid 
 * @param {Number} caseid 
 * @returns {Boolean} success finish case or not
 */
const finishCase = async (tutorid, caseid) => {
  const x = await Case.findOneAndUpdate({caseid:caseid,isClosed:false,tutorid:tutorid},{isClosed:true})
  if(x == null){
    return false
  }
  return true

}


//important: should not use
// for internal test only

const dropDB = async () => {
  await Tutor.collection.drop()
}

module.exports = {
  //getTutorData:getTutorData,
  setTutorData:setTutorData,
  findStudents:findStudents,
  requestStudent:requestStudent,
  startCase:startCase,
  inviteToCase:inviteToCase,
  finishCase:finishCase,
  dropDB:dropDB
}