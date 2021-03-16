//this define a case, which 
const mongoose = require("mongoose")


const caseSchema = mongoose.Schema({
  caseid : Number,
  studentid : [Number],
  tutorid: Number,
  createAt: {type:Date, default:new Date()},
  isClosed: {type:Boolean, default:false}
})

module.exports = mongoose.model("Case",caseSchema)