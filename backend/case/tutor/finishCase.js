const { finishCase, getTutorData } = require("../../database/tutor");

module.exports = async (req, res) => {
  let returnObject = {
    userRoleMatch: false,
    tutor: null,
    success: false,
    serverError: true,
  };
  let status = 500;

  let { caseid } = req.body;
  let user = req.user;

  try {
    /***********   Check have access right   ***********/
    if (user.role !== "tutor") {
      status = 403;
      return
    }
    returnObject.userRoleMatch = true;
    returnObject.tutor = await getTutorData(user.userid);

    /***********   Check input syntax valid  ***********/
    if (typeof caseid != "number") {
      status = 400;
      return
    }
    

    /***********   Check tutor is in case   ***********/
    let tutor = await getTutorData(user.userid);
    if (!tutor.cases.find(id => id == caseid)) {
      status = 404;
      return
    }


    /***********   finish case   ***********/
    if (!await finishCase(user.userid, caseid)) return;
    returnObject.success = true;

    /***********   return tutor informations   ***********/
    returnObject.tutor = await getTutorData(user.userid);

    if (!returnObject.tutor) return;

    status = 200;
    returnObject.serverError = false;
  } catch (e) {
    console.log(e);
  } finally {
    res.status(status).send(returnObject);
  }
};
