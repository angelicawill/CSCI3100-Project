const mongoose = require("mongoose")

const tutorSchema = mongoose.Schema({
  tutorid:Number, // act as foreign key, should be able to refer back to the user's collection
  subjectsTeach: [String],
  freeTime: [Mixed],
  preferredLocation: [String],
  isGroupTeachingAllowed: Boolean,
  isMultiCaseAllowed: Boolean,
  totalTutorScore: Number,  // the sum of score of all the rating
  numberCaseFinished: {type:Number, default:0},
  tutorRating: Number, // calculate by totalTutorScore / numberCaseFinished
  receivedStudentRequest: [Number], 
  cases: [Number]  //size should be restrited to 1 is isMultiCaseAllowed is False
})

module.exports = mongoose.model("Student",tutorSchema)