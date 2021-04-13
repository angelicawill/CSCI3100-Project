//this define a case, which 
const mongoose = require("mongoose")


const caseSchema = mongoose.Schema({
  caseid : Number,
  studentid : {type:[Number],default:[]}, //to handle 1 tutor to many student
  tutorid: Number,
  createAt: {type:Date, default:new Date()},
  isClosed: {type:Boolean, default:false},
  finishRequestStartAt: Date //finish request can only start by tutor, set isClosed be true after 3 days
})

module.exports = mongoose.model("Case",caseSchema)