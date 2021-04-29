/*
The collection of functions allows to retrieve information of a case
You should ensure all input parameters are correct in format and content

*/
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction")
const {getStudentData,getTutorData} = require("./userGetter")

/**
 * find all cases a tutor is handling
 * @param {Number} tutorid 
 */
const getCases = async (tutorid) => {
  await getTutorData(tutorid)
  const cases = await Case.find({tutorid:tutorid}).exec()
  return cases
}


module.exports={
  getCases:getCases
}