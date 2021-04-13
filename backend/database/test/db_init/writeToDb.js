const mongoose = require("mongoose");
const config = require("../config.json")
const dbUri = config.dburiLocal
const dbHandler  =require("./dbHandler")
const USERCOUNT = 30

const start = async ()=>{

  await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
  await dbHandler.initDB(USERCOUNT)
  dbHandler.initFakeStudentData(USERCOUNT)
  dbHandler.initFakeTutorData(USERCOUNT)
}


start()