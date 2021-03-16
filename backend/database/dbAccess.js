/*
functions that handle all search in the database will be put here
may be seperated in the future, depends on the role
*/

// related to user's account setting

const addUser = () => {

}

const changeUserInfo = () => {

}



// related to student
const findTutors = (studentid) => {
  //assume that the tutor return depends on 2 criteria: subject and time
  // the recommended tutor can also use this function, the recommendation system works only if the student fill in additional info

  //first find tutor match the subject

  //then find tutor match the timeslot

  //sort according to rating, return all result
}

const requestTutor = (studentid, tutorid, isAddedTo) => {
  //the 3rd parameter determine is it the request to tutor, or cancel a request to tutor

  //update the 'receiveStudentRequest' field, by add/remove the corresponding studentid
}

const reviewTutor = (studentid, tutorid, rating) => {
  //update the tutor's rating

}

//related to tutor

const findStudents = (tutorid) => {
  //find a student that match subject and time

  //find student match subject

  //find student match timeslot

  //sort return list of student by descending order of hourly rate
}

const requestStudent = (studentid, tutorid, isAddedTo) => {

}

const startCase = (tutorid) => {
  // add a document in Case schema, with the tutorid

  // add the case id to document in Tutor collection
}

const inviteToCase = (studentList, tutorid,caseid) => {
  //add student list to Case's 'studentid' field
}

const finishCase = (tutorid, caseid) => {
  
}









//related to case





