const globalObject: any = global;
let { users, chats, cases } = globalObject.dixontest;
import * as Types from "../../test/tsconfig/custom";

export default (req, res) => {
  let returnObject: {
    case: Types.Case,
    caseidValid: boolean,
    caseExist: boolean,
    userRoleMatch: boolean,
    userInCase: boolean,
    success: boolean,
    serverError: boolean,
  } = {
    case: null,
    caseidValid: false,
    caseExist: false,
    userRoleMatch: false,
    userInCase: false,
    success: false,
    serverError: true,
  };
  let status = 500;

  let { caseid }: { caseid: number } = req.body;
  let user: Types.User = req.user;

  try {
    let dataSyntaxValid = false;
    let dataExist = false;
    let haveAccessRight = false;

    (() => {
      let casee: Types.Case;
      if (!user) {
        return;
      } else {
        /***********   Check syntax valid   ***********/
        if (typeof caseid === "number" && Number.isInteger(caseid)) {
          returnObject.caseidValid = true;
        }
      }

      if (!returnObject.caseidValid) {
        return;
      } else {
        dataSyntaxValid = true;
        /***********   Check data exist   ***********/

        // Find case
        casee = cases.find((casee) => casee.caseid === caseid);
        if (cases) {
          returnObject.caseExist = true;
        }
      }

      if (!returnObject.caseExist) {
        return;
      } else {
        dataExist = true;
        /***********   Check have access right   ***********/

        // check user's role is tutor
        if (user.role === "tutor") {
          returnObject.userRoleMatch = true;
        }

        // check user is in the case
        if (casee.tutorid === user.userid) {
          returnObject.userInCase = true;
        }
      }

      if (!returnObject.userInCase || !returnObject.userRoleMatch) {
        return;
      } else {
        haveAccessRight = true;
        /***********   Invite student to case   ***********/

        returnObject.case = casee;

        // change in student and tutor database too

        returnObject.success = true;
      }
    })();

    if (!dataSyntaxValid) {
      status = 400;
    } else if (!haveAccessRight) {
      // returnObject = {
      //     ...returnObject,
      //     caseExist: false
      // }
      status = 403;
    } else if (!dataExist) {
      status = 404;
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
