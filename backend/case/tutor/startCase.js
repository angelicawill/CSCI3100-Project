const { startCase, getTutorData } = require("../../database/tutor");

module.exports = async (req, res) => {
  let returnObject = {
    userRoleMatch: false,
    tutor: null,
    success: false,
    serverError: true,
  };
  let status = 500;

  let user = req.user;

  try {
    /***********   Check have access right   ***********/
    if (user.role !== "tutor") {
      status = 403;
      return
    }

    returnObject.userRoleMatch = true;

    /***********   Start new case   ***********/
    if (!await startCase(user.userid)) return;
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
