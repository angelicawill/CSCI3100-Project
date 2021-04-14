const u = require("underscore")
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

/**
 * 
 * @param {[Object]} arr 
 * @param {String} key valids keys are: subjectCount, time, isGroupTeachingAllowed,isMultiCaseAllowed
 * @param {Boolean} isAscending arrange in ascending order if true
 * @returns 
 */
const sortedByObjKey = (arr,key,isAscending) => {
  //hardcode, all things are not sorted
  let newArr
  if (key !== "preferredFee"){
    newArr = u.sortBy(arr,key)
  }
  else{
    //take the upper bound of preferred fee to sort
    arr.map((ele)=>{
      ele["preferredFee"] = ele["preferredFee"][1]
    })
    newArr = u.sortBy(arr,key)
  }
  if(! isAscending){
    newArr.reverse()
  }
  //console.log(newArr)
  return newArr
}

module.exports = {getAvailableHours,sortedByObjKey}