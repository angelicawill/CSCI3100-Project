const globalObject: any = global;
import * as Types from "../../test/tsconfig/custom";
let { users, chats, cases }: {
  users: Types.Users;
  chats: Types.Chats;
  cases: Types.Cases;
} = globalObject.dixontest;

export default (req, res) => {
  let returnObject: {
    case: Types.Case;
    userRoleMatch: boolean;
    success: boolean;
    serverError: boolean;
  } = {
    case: null,
    userRoleMatch: false,
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
      /***********   Check have access right   ***********/
      if (user.role === "admin") {
        returnObject.userRoleMatch = true;
      }

      if (!returnObject.userRoleMatch) {
        return;
      } else {
        let newCase: Types.Case = {
          caseid: Date.now(),
          studentids: [1],
          invitingStudentid: [],
          tutorid: 2,
          createAt: Date.now(),
          isClosed: false,
        };

        cases.push(newCase);

        returnObject.case = newCase;
        returnObject.success = true;
      }
    })();

    if (!haveAccessRight) {
      // returnObject = {
      //     ...returnObject,
      //     caseExist: false
      // }
      status = 403;
    } else if (!dataSyntaxValid) {
      status = 400;
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
