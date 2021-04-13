const getAvailableHours = (studentTimeSlot,tutorTimeSlot) => {
  //find overlapping free hours between 2 timeslot
  //example studentTimeSlot = [[12,18],[20,22]]
  //        tutortimeslot   = [[8,20]]
  //answer                  = 8 (1200-1859, 2000-2059)
  let studentptr = studentTimeSlot[0][0]
  let tutorptr = tutorTimeSlot[0][0]

  //hardcode, all things are not calculated
  return 1
}

const sortedByObjKey = (arr,key,isAscending) => {
  //hardcode, all things are not sorted
  return arr
}

module.exports = {getAvailableHours,sortedByObjKey}