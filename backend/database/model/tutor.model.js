/*

updated:
Time is calculated by weekofday * 24 + hour, for sunday: weekofday = 0                                   sun10-3    sun4-8    wed12-8
freeTime:  set to sunday 10am - 3:59pm and 4pm to 8:59pm and wednesday 12pm - 8:50pm, this will be store as [[10,15],[16,20], [84,92]]
*/

const mongoose = require("mongoose")

const tutorSchema = mongoose.Schema({
  tutorid:{type:Number,unique:true}, // act as foreign key, should be able to refer back to the user's collection
  subjectsTeach: [String],
  freeTime: [Number],
  preferredLocation: [String],
  isGroupTeachingAllowed: Boolean,
  isMultiCaseAllowed: Boolean,
  totalTutorScore: {type:Number, default:0},  // the sum of score of all the rating
  numberCaseFinished: {type:Number, default:0},
  tutorRating: {type:Number, default:0}, // calculate by totalTutorScore / numberCaseFinished
  studentRequest: [Number],
  receivedStudentRequest: [Number], 
  cases: [Number]  //size should be restrited to 1 is isMultiCaseAllowed is False
})

module.exports = mongoose.model("Tutor",tutorSchema)