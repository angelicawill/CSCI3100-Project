const globalObject: any = global;
let { users, chats, cases } = globalObject.dixontest;
import * as Types from "../../testChatroom/tsconfig/custom";

export default (req, res) => {
  let returnObject = {
    studentidListValid: false,
    caseidValid: false,
    caseExist: false,
    studentExist: false,
    studentsInCase: false,
    userRoleMatch: false,
    userInCase: false,
    case: null,
    success: false,
    serverError: true,
  };
  let status = 500;

  let { studentidList, caseid }: {studentidList: number[], caseid: number} = req.body;
  let user = req.user;

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
        if (
          Array.isArray(studentidList) && studentidList.every((id) =>
            typeof id === "number" && Number.isInteger(id)
          )
        ) {
          returnObject.studentidListValid = true;
        }

        if (typeof caseid === "number" && Number.isInteger(caseid)) {
          returnObject.caseidValid = true;
        }
      }

      if (!returnObject.studentidListValid || !returnObject.caseidValid) {
        return;
      } else {
        dataSyntaxValid = true;
        /***********   Check data exist   ***********/
        // Find case
        casee = cases.find((c) => c.caseid === caseid);

        if (casee) {
          returnObject.caseExist = true;
        }

        // Find students
        let checkStudentsExist = new Array(studentidList.length).fill(false);
        let checkStudentsInCase = new Array(studentidList.length).fill(0);
        studentidList.forEach((id, i) => {
          console.log(users);
          if (
            users.find((user) => user.userid === id && user.role === "student")
          ) {
            checkStudentsExist[i] = true;
          }

          casee?.studentids.find(
            ((invitingStudentId) => {
              if (invitingStudentId == id) {
                checkStudentsInCase[i] = true;
              }
            }),
          );
        });

        if (checkStudentsExist.every(((e) => e))) {
          returnObject.studentExist = true;
        }
        if (checkStudentsInCase.every(((e) => e))) {
          returnObject.studentsInCase = true;
        }
      }

      if (
        !returnObject.studentExist || !returnObject.caseExist ||
        !returnObject.studentsInCase
      ) {
        return;
      } else {
        dataExist = true;
        /***********   Check have access right   ***********/
        // check user's role is tutor
        if (user.role === "tutor") {
          returnObject.userRoleMatch = true;
        }

        // check user is in the case
        casee = cases.find((c) => c.caseid === caseid);
        if (casee?.tutorid === user.userid) {
          returnObject.userInCase = true;
        }
      }

      if (!returnObject.userRoleMatch || !returnObject.userInCase) {
        return;
      } else {
        haveAccessRight = true;
        /***********   Invite student to case   ***********/
        studentidList.forEach((id) => {
          let index: number = casee.studentids.findIndex((invitingId) =>
            invitingId == id
          );

          casee.studentids.splice(index, 1);
        });

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
