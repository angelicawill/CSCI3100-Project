/*
The collection of functions allows a student to get access to various resource in the database
You should ensure all input parameters are correct in format and content

functions
getStudentData() return the document with a given student ID
findTutors()   return a list of tutors according to stuendts's preference
requestTutor() to start/ cancel a request to a tutor
reviewTutor()  upon finished a case, student can review the tutor by give him score
*/
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction")

/**
 * return the document
 * @param {*} studentid 
 */
const getStudentData = async (studentid) => {
  return await Student.findOne({studentid:studentid}).exec()
}

/** 
 * correspond to action 'search for tutor' and 'recommend tutor'
 * return list of tutors with his/her personal info
 * @param {Number} studentid 
 * @returns {[Object]} tutors with information, sort by rating
 */
 const findTutors = async (studentid) => {
  //assume that the tutor return depends on 2 criteria: subject and time
  // the recommended tutor can also use this function, the recommendation system works only if the student fill in additional info
  const {subjectsNeedHelp:studentSubject,timeslot:studentTimeSlot} = await Student.findOne({studentid:studentid}).exec()
  //first find tutor match the subject
  const matchedTutors = await Tutor.find({subjectsTeach:{$all:studentSubject}}).exec()
  //then find tutor match the timeslot
  matchedTutors.filter((ele)=>{getAvailableHours(studentTimeSlot,ele.freeTime) > 0})
  //sort according to rating, return all result
  return sortedByObjKey(matchedTutors,"tutorRating",False)
}
/**
 * This function correspond to the action 'request a tutor',
 * it will add/remove the student id in 'receivedStudentRequest' field of a tutor document
 * @param {Number} studentid 
 * @param {Number} tutorid 
 * @param {Boolean} isAddedTo True: add a request, False: cancel a request
 * @returns {Boolean} indicate success request or not
 */
const requestTutor = async(studentid, tutorid, isAddedTo) => {
  //the 3rd parameter determine is it the request to tutor, or cancel a request to tutor
  try{
    if (isAddedTo){
      await Student.findOneAndUpdate({studentid:studentid},{$push:{tutorRequest:tutorid}}).exec()
      await Tutor.findOneAndUpdate({tutorid:tutorid},{$push:{receivedStudentRequest:studentid}}).exec()
    }
    else{
      await Student.findOneAndUpdate({studentid:studentid},{$pull:{tutorRequest:tutorid}}).exec()
      await Tutor.findOneAndUpdate({tutorid:tutorid},{$pull:{receivedStudentRequest:studentid}}).exec()
    }
    return true
  }
  catch (err){
    console.error(err)
    return false
  }

  
  //update the 'receiveStudentRequest' field, by add/remove the corresponding studentid
}

/**
 * This function correspond to the action 'rate a tutor',
 * it will calculate the new average score
 * @param {Number} studentid 
 * @param {Number} tutorid 
 * @param {Number} rating 
 * @returns {Boolean} indicate success or not
 */
const reviewTutor = async (studentid, tutorid, rating) => {
  //update the tutor's rating
  try{
    //it should check whether the case is finish or not
    await Tutor.findOneAndUpdate({tutorid:tutorid},
      {$inc:{totalTutorScore:rating,numberCaseFinished:1},$divide:{tutorRating: ['$totalTutorScore' / '$numberCaseFinished']}}).exec()
  }
  catch (err){
    console.error(err)
    return false
  }

}

const dropDB = async () => {
  await Student.collection.drop()
}

module.exports = {
  getStudentData:getStudentData,
  findTutors:findTutors,
  requestTutor:requestTutor,
  reviewTutor:reviewTutor,
  dropDB:dropDB
}