/*
The collection of functions allows a student to get access to various resource in the database
You should ensure all input parameters are correct in format and content

functions
getStudentData() return the document with a given student ID
setStudentData()
findTutors()   return a list of tutors according to stuendts's preference
requestTutor() to start/ cancel a request to a tutor
reviewTutor()  upon finished a case, student can review the tutor by give him score
*/
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction")
const tutorFunction = require("./tutor")
const { getTutorData } = require("./tutor")

/**
 * return the document
 * @param {Number} studentid 
 * @returns {Object} object represent a student
 */
const getStudentData = async (studentid) => {
  return await Student.findOne({studentid:studentid}).exec()
}

/**
 * The accepting data inputs are:  grade,subjectsNeedHelp,freeTime,preferredFee,preferredTeachingMode
 * @param {Number} studentid 
 * @param {Object} datas 
 * @returns {Boolean} status of update
 */
const setStudentData = async(studentid,datas) => {
  //only valid key allowed
  const setOfKey = ["grade","subjectsNeedHelp","freeTime","preferredFee","preferredTeachingMode"]
  for (idx in Object.keys(datas)){
    if (! setOfKey.includes(Object.keys(datas)[idx])){
      throw new Error("it contains fields can't be alter")
    }
  }
  const res = await Student.findOneAndUpdate({studentid:studentid},{$set:datas})
  if (res != null){
    return true
  }
  return false
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
 * @returns {Boolean} indicate success request or not, error with inexist student/tutor
 */
const requestTutor = async(studentid, tutorid, isAddedTo) => {
  //the 3rd parameter determine is it the request to tutor, or cancel a request to tutor
  // should make the operations atomic to avoid error
  try{
    //first check the student or tutor exist or not
    if (await getStudentData(studentid) === null || await getTutorData(tutorid) === null){
      throw new Error("no valid user found")
    }
    let resStudent
    let resTutor
    //if student and tutor both exist, check they are in the array or not
    if (isAddedTo){
      //this will return none if the input array is exactly equal
       resStudent = await Student.findOneAndUpdate({studentid:studentid,tutorRequest:{"$ne":tutorid}},
        {$push:{tutorRequest:tutorid}}).exec()
       resTutor = await Tutor.findOneAndUpdate({tutorid:tutorid,receivedStudentRequest:{"$ne":studentid}},
        {$push:{receivedStudentRequest:studentid}}).exec()

        /* the above operation will not add duplicate in any case
        if(resStudent === null || resTutor === null){
          //student or tutor is already in the list, you can't add it
          //pop out if necessary
          await Student.findOneAndUpdate({studentid:studentid},{$pull:{tutorRequest:tutorid}}).exec()
          await Tutor.findOneAndUpdate({tutorid:tutorid},{$pull:{receivedStudentRequest:studentid}}).exec()
          return false
      }
      */
      if(resStudent === null || resTutor === null){
        return false
      }

    }
    else{
      //cancel a request

      //null response if the student/tutor not appear in the array
      resStudent = await Student.findOneAndUpdate({studentid:studentid,tutorRequest:{"$elemMatch":{"$eq":tutorid}}},
        {$pull:{tutorRequest:tutorid}}).exec()
      if(!resStudent){ //short circult and stop the next operation
        return false
      }
       resTutor = await Tutor.findOneAndUpdate({tutorid:tutorid,receivedStudentRequest:{"$elemMatch":{"$eq":studentid}}},
        {$pull:{receivedStudentRequest:studentid}}).exec()
      if(!resTutor){
        //push back again to the student db
        await Student.findOneAndUpdate({studentid:studentid},{$push:{tutorRequest:tutorid}}).exec()
      }
    }
    return true
  }
  catch (err){
    //error if there's no student or tutor
    throw(err)
  }
}

/**
 * This function correspond to the action 'rate a tutor',
 * it will calculate the new average score
 * @param {Number} studentid 
 * @param {Number} tutorid 
 * @param {Number} rating 
 * @returns {Boolean} indicate success or not
 */
const reviewTutor = async (tutorid, rating) => {
  //update the tutor's rating
  try{
    //it should check whether the case is finish or not
    await Tutor.findOneAndUpdate({tutorid:tutorid},
      {$inc:{totalTutorScore:rating,numberCaseFinished:1},$divide:{tutorRating: ['$totalTutorScore' / '$numberCaseFinished']}}).exec()
  }
  catch (err){
    //console.error(err)
    return false
  }

}

//for internal test only
const dropDB = async () => {
  await Student.collection.drop()
}

module.exports = {
  getStudentData:getStudentData,
  setStudentData:setStudentData,
  findTutors:findTutors,
  requestTutor:requestTutor,
  reviewTutor:reviewTutor,
  dropDB:dropDB
}