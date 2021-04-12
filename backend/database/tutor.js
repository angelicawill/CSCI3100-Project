/*
The collection of functions allows a tutor to get access to various resource in the database
You should ensure all input parameters are correct in format and content

functions
getTutorData() return the document with a given tutor ID
findStudents(tutorid) return a list of students according to tutor's preference
requestStudent()      to start/ cancel a request to a student
startCase()           start an empty case
inviteToCase()        invite student(s) to a case
finishCase()          set the status of case (isClosed) to true
*/
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction")

const getTutorData = async (tutorid) => {
  return await Tutor.findOne({tutorid:tutorid}).exec()
}

/**
 * This function correspond to 'search for a student'
 * @param {Number} tutorid 
 * @returns {Object} student with informations
 * @returns{[Object]} list of student with informations, sort by hourly rate
 */
 const findStudents = async (tutorid) => {
  //find a student that match subject and time
  const {subjectsTeach:tutorSubject,freeTime:tutorTimeSlot} = await Tutor.findOne({tutorid:tutorid}).exec()
  //find student match subject
  const matchedStudent = await Student.find({subjectsNeedHelp:{$all:tutorSubject}}).exec()
  //find student match timeslot
  matchedStudent.filter((ele)=>{getAvailableHours(tutorTimeSlot,ele.freeTime) > 0})
  //sort return list of student by descending order of hourly rate
  return sortedByObjKey(matchedStudent,"tutorRating",False)
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
    if (isAddedTo){
      await Promise.all([
        Student.findOneAndUpdate({studentid:studentid},{$push:{receivedTutorRequest:tutorid}}),
        Tutor.findOneAndUpdate({tutorid:tutorid},{$push:{studentRequest:studentid}})
      ])
    }
    else{
      await Promise.all([
        Student.findOneAndUpdate({studentid:studentid},{$pull:{receivedTutorRequest:tutorid}}),
        Tutor.findOneAndUpdate({tutorid:tutorid},{$pull:{studentRequest:studentid}})
      ])
    }
    return true
  }
  catch(err){
    console.error(err)
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

const dropDB = async () => {
  await Tutor.collection.drop()
}

module.exports = {
  getTutorData:getTutorData,
  requestStudent:requestStudent,
  startCase:startCase,
  inviteToCase:inviteToCase,
  finishCase:finishCase,
  dropDB:dropDB
}