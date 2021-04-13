const { startCase,  } = require("../../database/tutor");
import { getTutorData } from "../../database/tutor";
import * as Types from "../../testChatroom/tsconfig/custom";

export default async (req, res) => {
  let returnObject = {
    userRoleMatch: false,
    cases: null,
    success: false,
    serverError: true,
  };
  let status = 500;

  let user: Types.User = req.user;

  try { 
    let haveAccessRight = false;
    await (async() => {
      if (!user) {
        return;
      } else {
        /***********   Check have access right   ***********/
        // check user's role is tutor
        if (user.role === "tutor") {
          returnObject.userRoleMatch = true;
        }
      }

      if (!returnObject.userRoleMatch) {
        return;
      } else {
        haveAccessRight = true;
        /***********   Start new case   ***********/
        await startCase(user.userid)

        // change in tutor database too

        let tutor: any = await getTutorData(user.userid);
        returnObject.cases = tutor.cases;
        returnObject.success = true;
      }
    })();

    if (!haveAccessRight) {
      status = 403;
    } else if (returnObject.success) {
      status = 200;
    } else {
      status = 500;
    }

    if (status !== 500) {
      returnObject.serverError = false;
    }
  } catch (e) {
    console.log(e);
    status = 500;
    returnObject.serverError = true;
  } finally {
    res.status(status).send(returnObject);
  }
};
