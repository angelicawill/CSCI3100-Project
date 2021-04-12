/*
as stated in the initial report, not all fields are required, except the studentid
updated:
Time is calculated by weekofday * 24 + hour, for sunday: weekofday = 0                             sun10-3  sun4-8  wed12-8
freeTime:  set to sunday 10am - 3pm and 4pm to 8pm and wednesday 12pm - 8pm, this will be store as [[10,15],[16,20], [84,92]]
*/

const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
  studentid:{type:Number,unique:true}, // act as foreign key, should be able to refer back to the user's collection
  grade:Number, //primary1 -> 1, secondary6 -> 12, year4 -> 16
  subjectsNeedHelp: [String],
  freeTime: [Number], //e.g. set to monday 10am - 3pm and 4pm to 8pm, this will be store as {1,[[10,15],[16,18]]}
  preferredFee: [Number], //should be a range of value, e.g. [100,150], assume the fee is not depend on subject
  preferredTeachingMode: [String], //should be either 'single', 'multi', or both
  tutorRequest: [Number], //the request tutor's id
  receivedTutorRequest: [Number],
  cases: [Number]  //case id that the student involved, there will be case id stored if the case is in process
})

module.exports = mongoose.model("Student",studentSchema)