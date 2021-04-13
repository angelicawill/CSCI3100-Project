const globalObject: any = global;
let { users, chats, cases } = globalObject.dixontest;
import * as Types from "../../testChatroom/tsconfig/custom";

export default (req, res) => {
  let returnObject = {
    caseidValid: false,
    caseExist: false,
    userRoleMatch: false,
    userInCase: false,
    case: null,
    success: false,
    serverError: true,
  };
  let status = 500;

  let { caseid }: { caseid: number } = req.body;
  let user: Types.User = req.user;

  try {
    let dataSyntaxValid = false;
    let haveAccessRight = false;
    let dataExist = false;
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
        casee = cases.find((c) => c.caseid === caseid);

        if (casee) {
          returnObject.caseExist = true;
        }
      }

      if (!returnObject.caseExist) {
        return;
      } else {
        dataExist = true;
        /***********   Check have access right   ***********/
        // check user's role is tutor
        if (user.role === "student") {
          returnObject.userRoleMatch = true;
        }

        // check user is in the case invitation
        casee?.studentids.find(
          ((invitingStudentId) => {
            if (invitingStudentId == user.userid) {
              returnObject.userInCase = true;
            }
          }),
        );
      }

      if (!returnObject.userRoleMatch || !returnObject.userInCase) {
        return;
      } else {
        haveAccessRight = true;
        /***********   remove from case studentids   ***********/
          let index: number = casee.studentids.findIndex((invitingId) =>
            invitingId == user.userid
          );

          casee.studentids.splice(index, 1);

        // change in student database too

        returnObject.case = casee;
        returnObject.success = true;
      }
    })();

    if (!dataSyntaxValid) {
      status = 400;
    } else if (!haveAccessRight) {
      // returnObject = {
      //     ...returnObject,
      //     studentExist: false,
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
