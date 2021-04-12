/*
The collection of functions allows a user(no matter the role) to get access/modify to various resource in the database
You should ensure all input parameters are correct in format and content

All the actions(functions) in this module should not depends on the role
e.g. update user name should be perform using funcions within user.js as both teacher/student have same type of personal info
e.g. update student's subject to help should not call this module as this feature is unique to student only

unique identifiers of a user: username, email, email address

functions:
addUser()
getUserid()
getUserInfo()
getUserBasicInfo()
changeUserInfo()
setVerified()

should not use in production:
dropDB()
getDocCount()
*/
const User = require("./model/user.model")
const Case = require("./model/case.model")
const Student = require("./model/student.model")
const Tutor = require("./model/tutor.model")

const studentFunctions = require("./student")
const tutorFunctions = require("./tutor")
const {getAvailableHours,sortedByObjKey} = require("./helperFunction")

/**
 * return the status of successfully add user or not, assume all the field are correct in format/content
 * , but not need to verify existing user or not
 * @param {Object} content {realname:String,username:String,password:String,phonenumber:Number,email:String,role:String}
 * @returns {Boolean} True if successful registration
 */
 const addUser = async (content) => {
  //called after user registration
  
  try{
    //assign an ID to the user
    content["userid"] = await User.countDocuments()
    content["userid"] = content["userid"] + 1
    const newUser = new User(content)
    //check user exist or not by finding the id
    //getUserInfo()
      
    await newUser.save()

    if(content["role"] === "tutor"){
      const newTutor = new Tutor({tutorid:content["userid"]})
      await newTutor.save()
    }
    else if (content["role"] === "student"){
      const newStudent = new Student({studentid:content["userid"]})
      await newStudent.save()
    }
    //console.log(`successfully add user ${content["realname"]}`)
    // add to specific student/tutor collection
    return true
  }
  catch (err) {
    //if any error, return false
    //console.log(`error in adding user ${content["userid"]}`)
    //console.error(err)
    return false
  }
  
}

/**
 * return student/tutor's id
 * @param {object} query, key: unique identifier
 * @return {Promise} resolved: user's id, null if no matched user, or rejected with invalid input
 */
const getUserid = async (query) => {
  try{
    const result = await User.find(query).exec()
    if(result.length > 1){
      throw new Error("more than 1 user found, are you not using unique identfier?")
    }
    return result[0]["userid"]

  }
  catch (err){
    if(err instanceof TypeError){
      //no user found
      return null
    }
    else{
      throw(err)
    }
  }
  
}

/**
 * The basic info including name, address
 * @param {Object} query, key: unique identifier
 */
const getUserBasicInfo = async (query)=>{
  //return await User.findOne(query).exec()
  const uid = await getUserid(query)
  return await User.findOne({userid:uid})
}

/**
 * return student/tutor's information by inputing the user's id/username/email
 * @param {Object}  query, key: unique identifier
 * @returns {Promise} resolve: advanced informations, null if no matched user, or rejected with invalid input
 */
const getUserInfo = async (query) => {
  //if it's student, return the corrsponding student's document
  //otherwise return teacher
  const res = await getUserBasicInfo(query)
  const uid = res["userid"]
  if(res["role"] === "student"){
    return await studentFunctions.getStudentData(uid)

  }
  else if (res["role"] === "tutor"){
    return await tutorFunctions.getTutorData(uid)

  }
}

/**
 * Allow a student/tutor to change some of the field, like the email address, password
 * all the changes should be within the user collections
 * 
 * The function proceed only if the user provided corrected password
 * @param {Number} userid  
 * @param {Object} changedContent the fields going to change, group as object
 * @returns {Boolean} True is success change, False with not
 */
const changeUserInfo = async (userid,changedContent) => {
  //should check field exist, now assumed all fields exists
  try{
    await User.findOneAndUpdate({userid:userid},
      {$set:changedContent})
    return true
  }
  catch(err){
    console.error(err)
    return false
  }
  
}
/**
 * given  a field that can uniquely identfied an user (id,name,email), reutrn the status
 * @param {object} query,  
 * @returns {Boolean} The status of update
 */
const setVerified = async (query) => {
  try{
    await User.findOneAndUpdate(query,{$set:{"isVerified":true}})
  }
  catch(err){
    console.error(err)
    return false
  }
}

//internal testing only

//should not use this function, for internal testing only

const getDocCount = async()=>{
  return await User.countDocuments()
}

const checkUserExist = async()=>{

}
const dropDB = async () => {
  await User.collection.drop()
}

module.exports = {
  addUser:addUser,
  getUserid:getUserid,
  getUserInfo:getUserInfo,
  getUserBasicInfo:getUserBasicInfo,
  changeUserInfo:changeUserInfo,
  setVerified:setVerified,
  dropDB:dropDB,
  getDocCount:getDocCount
}