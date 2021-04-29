const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")


const getTutorData = async (tutorid) => {
  const x = await Tutor.findOne({tutorid:tutorid}).exec()
  if(x == null){
    throw new Error("Tutor doesn't exist")
  }
  return x
}

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