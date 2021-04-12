
const mongoose = require("mongoose");
const user = require("../../user")
const fakeData = require("../test_data/fakeuser_new.json")

//helper for insert to the DB
const insertFakeTestDatas2 = async (addUserCount) => {
  // there's error when inserting the first user, explicitly add one instead
  const firstUser = {
    "realname": "K Hans",
    "username": "K137",
    "password": "abcdE12345",
    "phonenumber": 83134320,
    "email": "K304@gmail.com",
    "role": "tutor"
  }
  await user.addUser(firstUser)
  const roleAssign = (oneuser) => {
    const randomRole = Math.random() * 100
    if (randomRole > 65){
      //the role is tutor
      oneuser["role"] = "tutor".toLowerCase()
    }
    else{
      oneuser["role"] = "student".toLowerCase()
    }
  }
  const fakeUsers = fakeData.table.slice(0,addUserCount)

  for (let oneuser of fakeUsers){
    await user.addUser(oneuser)
  }

}


//start mongoose connection
mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("connected to db")
}).catch((error) => console.log(`${error} did not connect`));



const testForAddUser = async (addUserCount = undefined,dropAfterTest = false) => {
  
  const insertFakeTestDatas = async (addUserCount) => {
    // there's error when inserting the first user
    const firstUser = {
      "realname": "K Hans",
      "username": "K137",
      "password": "abcdE12345",
      "phonenumber": 83134320,
      "email": "K304@gmail.com",
      "role": "tutor"
    }
    await user.addUser(firstUser)
    const roleAssign = (oneuser) => {
      const randomRole = Math.random() * 100
      if (randomRole > 65){
        //the role is tutor
        oneuser["role"] = "tutor".toLowerCase()
      }
      else{
        oneuser["role"] = "student".toLowerCase()
      }
    }
    const fakeUsers = fakeData.table.slice(0,addUserCount)
  
    for (let oneuser of fakeUsers){
      await user.addUser(oneuser)
    }
  
  }

  const addDuplicateUser = async () => {
    const sameUserName = {
      "realname": "Matthew Charlton",
      "username": "Matthew321",
      "password": "abcdE12345",
      "phonenumber": 592828,
      "email": "Matthsdfdsfsew389@gmail.com",
      "role": "student"
  }
    const samePhone = {
      "realname": "Matthew Charlton",
      "username": "Mattfdsfsdhew321",
      "password": "abcdE12345",
      "phonenumber": 57692828,
      "email": "Mattfsdfdsfhew389@gmail.com",
      "role": "student"
  }

    const sameEmail = {
      "realname": "Matthew Charlton",
      "username": "Matthfdsfsdew321",
      "password": "abcdE12345",
      "phonenumber": 57212692828,
      "email": "Matthew389@gmail.com",
      "role": "student"
  }
    console.assert(await user.addUser(sameUserName) === false) //should be false
    console.assert(await user.addUser(samePhone) === false) //should be false
    console.assert(await user.addUser(sameEmail) === false) //should be false
  }

  //drop before test
  //await user.dropDB()
  await insertFakeTestDatas(addUserCount)
  await addDuplicateUser()
  if(dropAfterTest){
    await user.dropDB().then(()=>{mongoose.disconnect()})
  }
}
 
const testGetUser = async()=>{
  const testGetUserid = async () => {
    //user in the db
      const un1 = "Quentin828" //id = 4
      const email1 = "Quentin716@gmail.com"
      const phone1 = 60540927
      console.assert(await user.getUserid({username:un1}) === 4)
      console.assert(await user.getUserid({email:email1}) === 4)
      console.assert(await user.getUserid({phonenumber:phone1}) === 4)

      const un2 = "Lionel110" //id = 9
      const email2 = "Lionel179@gmail.com"
      const phone2 = 51638186
      
      console.assert(await user.getUserid({username:un2}) === 9)
      console.assert(await user.getUserid({email:email2}) === 4)
      console.assert(await user.getUserid({phonenumber:phone2}) === 4)
      
    //user not in db
    const notExistUn = "LionelMessi1"
  }

  const testGetUserInfo = async () => {

  } 
  
  await testGetUserid()
}


//insertFakeTestDatas2(30)
//testForAddUser(30)
testGetUser()
//user.dropDB().then(()=>{mongoose.disconnect()})



