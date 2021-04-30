/*
The collection of functions allows a student to get access to various resource in the database
You should ensure all input parameters are correct in format and content

functions:
getStudentData() return the document with a given student ID, not used the function in this file, instead should call that one in
                  userGetter.js to avoid circular dependency
setStudentData() set the status of a student's availabilty and other infos.
findTutors()   return a list of tutors according to stuendts's preference
requestTutor() to start/ cancel a request to a tutor
reviewTutor()  upon finished a case, student can review the tutor by give him score
*/
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const {getAvailableHours,sortedByObjKey} = require("./helperFunction");
const { getTutorData } = require("./userGetter")

/**
 * return the document that list a student's locations, subject etc...
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

/**
 * Update a students's availability with exist students id and datas
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
 * @param {sortedBy}  keys valid keys are: subjectCount, time, isGroupTeachingAllowed,isMultiCaseAllowed
 * @returns {[Object]} tutors with information, sort by rating
 */
 const findTutors = async (studentid,sortedBy) => {
  //assume that the tutor return depends on 2 criteria: subject and time
  // the recommended tutor can also use this function, the recommendation system works only if the student fill in additional info

  //should use aggregation pipeline with set intersection, also counting number of subject match
  const student = await getStudentData(studentid)
  const subj = student["subjectsNeedHelp"]
  const freeTime = student["freeTime"]
  
  const matched = await Tutor.aggregate([
    //returns all tutors such that a tutor can help the student with >= 1 subject
    {"$match":{
      "$expr":{
        //finds all tutor with at least 1 match subject
        "$gt":[{"$size":{"$setIntersection":[subj,"$subjectsTeach"]}},0
        ]
      }
    }},
    {"$project":{
      //mostly identcial to the tutor schema
      "_id":0,
      "tutorid":1,
      "freeTime":1,
      "preferredLocation":1,
      "isGroupTeachingAllowed":1,
      "isMultiCaseAllowed":1,
      "tutorRating":1,
      //set the return common subject and count it
      "subjects":{"$setIntersection":[subj,"$subjectsTeach"]},
      "subjectCount":{"$size":{"$setIntersection":[subj,"$subjectsTeach"]}}
    }} 
  ])
  //right now still keep tutor with no time match
  matched.filter((tutor)=>{getAvailableHours(freeTime,tutor.freeTime)>0})
  
  return sortedByObjKey(matched,sortedBy,true)
}

/**
 * This function correspond to the action 'request a tutor',
 * it will add/remove the student id in 'receivedStudentRequest' field of a tutor document
 * @param {Number} studentid 
 * @param {Number} tutorid 
 * @param {Boolean} isAddedTo True: add a request, False: cancel a request
 * @returns {Boolean} indicate success request or not, false with inexist student/tutor
 */
const requestTutor = async(studentid, tutorid, isAddedTo) => {
  //the 3rd parameter determine is it the request to tutor, or cancel a request to tutor
  // should make the operations atomic to avoid error
  try{
    //first check the student or tutor exist or not
    await getStudentData(studentid)
    await getTutorData(tutorid)

    let resStudent
    let resTutor
    //if student and tutor both exist, check they are in the array or not
    if (isAddedTo){
      //this will return none if the input array is exactly equal
       resStudent = await Student.findOneAndUpdate({studentid:studentid,tutorRequest:{"$ne":tutorid}},
        {$push:{tutorRequest:tutorid}}).exec()
       resTutor = await Tutor.findOneAndUpdate({tutorid:tutorid,receivedStudentRequest:{"$ne":studentid}},
        {$push:{receivedStudentRequest:studentid}}).exec()
      
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
        return false
      }
    }
    return true
  }
  catch (err){
    //error if there's no student or tutor
    return false
  }
}

/**
 * This function correspond to the action 'rate a tutor',
 * it will calculate the new average score
 * @param {Number} tutorid 
 * @param {Number} rating real number between 0-5
 * @returns {Boolean} indicate success or not
 */
const reviewTutor = async (tutorid, rating) => {
  //update the tutor's rating
  try{
    const x = await getTutorData(tutorid)
    if(rating < 0 || rating > 5){
      return false}
    //it should check whether the case is finish or not
 
    
    const y = await Tutor.findOneAndUpdate({tutorid:tutorid},
      [{"$set":{
        totalTutorScore:{"$add":["$totalTutorScore",rating]},
        numberCaseFinished:{"$add":["$numberCaseFinished",1]}
      }},
      {"$set":{tutorRating: {"$divide":["$totalTutorScore","$numberCaseFinished"]}}}
    
    ]
      ).exec()
    return true
  }

  catch (err){
    return false
  }

}

//for internal test only
const dropDB = async () => {
  await Student.collection.drop()
}

module.exports = {
  //getStudentData:getStudentData,
  setStudentData:setStudentData,
  findTutors:findTutors,
  requestTutor:requestTutor,
  reviewTutor:reviewTutor,
  dropDB:dropDB
}