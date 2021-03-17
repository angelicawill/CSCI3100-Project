/*
functions that handle all search in the database will be put here
may be seperated in the future, depends on the role
*/

// related to user's account 

/**
 * 
 * @param {Object} content 
 * @returns {Boolean} True if successful registration
 */
const addUser = (content) => {
  //called after user registration
}

/**
 * return student/tutor's id
 * @param {string} username 
 * @return {Number} user's id
 */
const getUserid = (username) => {
  
}

/**
 * return student/tutor's information
 * @param {Number} username 
 * @returns {Object} user information
 */
const getUserInfo = (username) => {
  //if it's student, return the corrsponding student's document
  //otherwise return teacher
}

/**
 * allow a student/tutor to change some of the field, like the email address, subject...
 * @param {Number} userid  
 * @param {Object} changedContent the fields going to change, group as object
 * @returns {Boolean} True is success change, False with not
 */
const changeUserInfo = (userid,changedContent) => {
  //called after user change the information
}



// related to student
/** 
 * correspond to action 'search for tutor' and 'recommend tutor'
 * return list of tutors with his/her personal info
 * @param {Number} studentid 
 * @returns {[Object]} tutors with information, sort by rating
 */
const findTutors = (studentid) => {
  //assume that the tutor return depends on 2 criteria: subject and time
  // the recommended tutor can also use this function, the recommendation system works only if the student fill in additional info

  //first find tutor match the subject

  //then find tutor match the timeslot

  //sort according to rating, return all result
}
/**
 * This function correspond to the action 'request a tutor',
 * it will add/remove the student id in 'receivedStudentRequest' field of a tutor document
 * @param {Number} studentid 
 * @param {Number} tutorid 
 * @param {Boolean} isAddedTo True: add a request, False: cancel a request
 * @returns {Boolean} indicate success request or not
 */
const requestTutor = (studentid, tutorid, isAddedTo) => {
  //the 3rd parameter determine is it the request to tutor, or cancel a request to tutor

  //update the 'receiveStudentRequest' fi eld, by add/remove the corresponding studentid
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

}

//related to tutor
/**
 * This function correspond to 'search for a student'
 * @param {Number} tutorid 
 * @returns {Object} student with informations
 * @returns{[Object]} list of student with informations, sort by hourly rate
 */
const findStudents = (tutorid) => {
  //find a student that match subject and time

  //find student match subject

  //find student match timeslot

  //sort return list of student by descending order of hourly rate
}
/**
 * 
 * @param {Number} studentid 
 * @param {Number} tutorid 
 * @param {Boolean} isAddedTo True: make a reuqest, False: cancel a request
 * @returns {Boolean} success request or not
 */
const requestStudent = (studentid, tutorid, isAddedTo) => {

}

/**
 * Corresponded to 'start a case', it will add a 'case' document with only tutor(s)
 * @param {[Number]} tutorid 
 */
const startCase = (tutorid) => {
  // add a document in Case schema, with the tutorid

  // add the case id to document in Tutor collection
}
/**
 * 
 * @param {Number} studentList 
 * @param {Number} tutorid 
 * @param {Number} caseid 
 * @returns {Boolean} success invite or not
 */
const inviteToCase = (studentList, tutorid,caseid) => {
  //add student list to Case's 'studentid' field

  //failure on invitation: user already in a case, not found user...
}
/**
 * 
 * @param {Nubmer} tutorid 
 * @param {Number} caseid 
 * @returns {Boolean} success finish case or not
 */
const finishCase = (tutorid, caseid) => {
  
}









//related to case





