/*
as stated in the initial report, not all fields are required, except the studentid
*/

const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
  studentid:Number, // act as foreign key, should be able to refer back to the user's collection
  grade:Number, //primary1 -> 1, secondary6 -> 12, year4 -> 16
  subjectsNeedHelp: [String],
  freeTime: [Mixed], //e.g. set to monday 10am - 3:30pm , this will be store as {1,[10,15.5]}
  preferredFee: [Number], //should be a range of value
  preferredTeachingMode: [String], //should be either 'single', 'multi', or both

  cases: [Number]  //case id that the student involved, there will be case id stored if the case is in process
})

module.exports = mongoose.model("Student",studentSchema)