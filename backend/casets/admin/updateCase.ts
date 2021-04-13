const globalObject: any = global;
import * as Types from "../../testChatroom/tsconfig/custom";
let { users, chats, cases }: {
  users: Types.Users;
  chats: Types.Chats;
  cases: Types.Cases;
} = globalObject.dixontest;

export default (req, res) => {
  let returnObject: {
    caseidValid: boolean;
    dataValid: boolean;
    caseExist: boolean;
    userRoleMatch: boolean;
    case: Types.Case;
    success: boolean;
    serverError: boolean;
  } = {
    caseidValid: false,
    dataValid: false,
    caseExist: false,
    userRoleMatch: false,
    case: null,
    success: false,
    serverError: true,
  };
  let status = 500;

  let {
    caseid,
    studentids,
    invitingStudentid,
    tutorid,
    createAt,
    isClosed,
  }: {
    caseid: Number;
    studentids?: Number[];
    invitingStudentid?: Number[];
    tutorid?: Number;
    createAt?: Number;
    isClosed?: Boolean;
  } = req.body;
  let user: Types.User = req.user;

  try {
    let dataSyntaxValid = false;
    let dataExist = false;
    let haveAccessRight = false;

    (() => {
      let casee: Types.Case;
      /***********   Check have access right   ***********/
      // if (user.role === "admin") {
      //   returnObject.userRoleMatch = true;
      // }

      if (!returnObject.userRoleMatch) {
        return;
      } else {
        returnObject.userRoleMatch = true;
        /***********   Check syntax valid   ***********/
        let checkstudentids: Boolean = false;
        let checkinvitingStudentid: Boolean = false;
        let checktutorid: Boolean = false;
        let checkcreateAt: Boolean = false;
        let checkisClosed: Boolean = false;

        if (typeof caseid === "number" && Number.isInteger(caseid)) {
          returnObject.caseidValid = true;
        }

        if (studentids) {
          if (
            Array.isArray(studentids) && studentids.length &&
            studentids.every((id) =>
              typeof id === "number" && Number.isInteger(id)
            )
          ) {
            checkstudentids = true;
          }
        } else {
          checkstudentids = true;
        }
        if (invitingStudentid) {
          if (
            Array.isArray(invitingStudentid) && invitingStudentid.length &&
            invitingStudentid.every((id) =>
              typeof id === "number" && Number.isInteger(id)
            )
          ) {
            checkinvitingStudentid = true;
          }
        } else {
          checkinvitingStudentid = true;
        }
        if (tutorid) {
          if (
            typeof tutorid === "number" && Number.isInteger(tutorid)
          ) {
            checktutorid = true;
          }
        } else {
          checktutorid = true;
        }
        if (createAt) {
          if (
            typeof createAt === "number" && Number.isInteger(createAt)
          ) {
            checkcreateAt = true;
          }
        } else {
          checkcreateAt = true;
        }
        if (isClosed) {
          if (
            typeof isClosed === "boolean"
          ) {
            checkisClosed = true;
          }
        } else {
          checkisClosed = true;
        }

        if (
          checkstudentids && checkinvitingStudentid && checktutorid &&
          checkcreateAt && checkisClosed
        ) {
          returnObject.dataValid = true;
        }
      }

      if (!returnObject.caseidValid || !returnObject.dataValid) {
        return;
      } else {
        dataSyntaxValid = true;
        /***********   Check data exist   ***********/

        // Find case
        casee = cases.find((casee) => casee.caseid === caseid);

        if (casee) {
          returnObject.caseExist = true;
        }
      }

      if (!returnObject.caseExist) {
        return;
      } else {
        dataExist = true;

        casee = {
          caseid: caseid ? caseid : casee.caseid,
          studentids: studentids ? studentids : casee.studentids,
          invitingStudentid: invitingStudentid
            ? invitingStudentid
            : casee.invitingStudentid,
          tutorid: tutorid ? tutorid : casee.tutorid,
          createAt: createAt ? createAt : casee.createAt,
          isClosed: isClosed ? isClosed : casee.isClosed,
        };

        returnObject.case = casee;
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
