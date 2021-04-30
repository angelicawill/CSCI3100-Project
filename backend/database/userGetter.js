/**
 * The collection of functions is originally belongs in tutor.js and student.js respectively
 * To avoid circular dependency, they are moved to here
 * 
 * getTutorData() return the document with a given tutor ID
 * getStudentData() return the document with a given student ID
 */
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

/**
 * return the document that list a tutor's locations, subject etc...
 * @param {Number} tutor 
 * @returns {Object} object represent a tutor
 */
const getTutorData = async (tutorid) => {
  const x = await Tutor.findOne({tutorid:tutorid}).exec()
  if(x == null){
    throw new Error("Tutor doesn't exist")
  }
  return x
}
/**
 * return the document that list a tutor's locations, subject etc...
 * @param {Number} studentid 
 * @returns {Object} object represent a student
 */
const getStudentData = async (studentid) => {
  const x = await Student.findOne({studentid:studentid}).exec()
  if(x == null){
    throw new Error("Student doesn't exist")
  }
  return x
}

module.exports = {
  getTutorData:getTutorData,
  getStudentData:getStudentData
}