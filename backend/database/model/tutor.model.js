const mongoose = require("mongoose")

const tutorSchema = mongoose.Schema({
  tutorid:Number, // act as foreign key, should be able to refer back to the user's collection
  subjectsTeach: [String],
  freeTime: [Mixed],
  preferredLocation: [String],
  isGroupTeachingAllowed: Boolean,
  isMultiCaseAllowed: Boolean,

  cases: [Number]
})

module.exports = mongoose.model("Student",tutorSchema)