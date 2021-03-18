/*
functions that handle all search in the database will be put here
may be seperated in the future, depends on the role
*/
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction")
// related to user's account 

/**
 * 
 * @param {Object} content {realname:String,username:String,password:String,phonenumber:Number,email:String,role:String}
 * @returns {Boolean} True if successful registration
 */
const addUser = async (content) => {
  //called after user registration
  const newUser = new User(content)
  try{
    await newUser.save()
    return true
  }
  catch (err) {
    //if any error, return false
    console.error(err)
    return false
  }
  
}

/**
 * return student/tutor's id
 * @param {string} username 
 * @return {Number} user's id
 */
const getUserid = async (username) => {
  const {userid} = await User.findOne({username:username}).exec()
  return userid
}

/**
 * return student/tutor's information
 * @param {Number} username 
 * @returns {Object} user information
 */
const getUserInfo = async (username) => {
  //if it's student, return the corrsponding student's document
  //otherwise return teacher
  const {userid,role} =  await User.findOne({username:username}).exec()
  if(role == "student"){
    return await Student.findOne({studentid:userid})

  }
  else if (role == "tutor"){
    return await Tutor.findOne({studentid:userid})
  }
}

/**
 * allow a student/tutor to change some of the field, like the email address, password
 * all the changes should be within the user collections
 * @param {Number} userid  
 * @param {Object} changedContent the fields going to change, group as object
 * @returns {Boolean} True is success change, False with not
 */
const changeUserInfo = (userid,changedContent) => {
  //should check field exist, now assumed all fields exists
  try{
    await User.findOneAndUpdate({userid:userid},
      {$set:{changedContent}})
    return true
  }
  catch(err){
    console.error(err)
    return false
  }
  
}



// related to student
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
const reviewTutor = (studentid, tutorid, rating) => {
  //update the tutor's rating
  try{
    await Tutor.findOneAndUpdate({tutorid:tutorid},
      {$inc:{totalTutorScore:rating,numberCaseFinished:1},$divide:{tutorRating: ['$totalTutorScore' / '$numberCaseFinished']}}).exec()
  }
  catch (err){
    console.error(err)
    return false
  }

}

//related to tutor
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
const finishCase = (tutorid, caseid) => {
  try{
    await Case.findOneAndUpdate({caseid:caseid},{isClosed:true})
    return true
  }
  catch (err){
    console.error(err)
    return false
  }
}















