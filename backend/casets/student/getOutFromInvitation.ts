const globalObject: any = global;
let { users, chats, cases } = globalObject.dixontest;
import * as Types from "../../test/tsconfig/custom";

export default (req, res) => {
    let returnObject = {
        studentidListValid: false,
        caseidValid: false,
        caseExist: false,
        studentExist: false,
        studentsInCaseInvitation: false,
        userRoleMatch: false,
        userInCaseInvitation: false,
        case: null,
        success: false,
        serverError: true
    }
    let status = 500;

    let { studentidList, caseid } = req.body;
    let user = req.user;

    try {
        let dataSyntaxValid = false;
        let haveAccessRight = false;
        let dataExist = false;
        (() => {
            let casee;
            
            if (!user) {
                return;
            } else {
                /***********   Check syntax valid   ***********/
                if (Array.isArray(studentidList) && studentidList.every((id) => typeof id === 'number' && Number.isInteger(id))) {
                    returnObject.studentidListValid = true;
                }
    
                if (typeof caseid === 'number' && Number.isInteger(caseid)) {
                    returnObject.caseidValid = true;
                }
            }



            if (!returnObject.studentidListValid || !returnObject.caseidValid) {
                return;
            } else {
                dataSyntaxValid = true;
                /***********   Check data exist   ***********/
                // Find case
                casee = cases.find(c => c.caseid === caseid);

                if (casee) {
                    returnObject.caseExist = true;
                }

                // Find students
                let checkStudentsExist = new Array(studentidList.length).fill(false);
                studentidList.forEach((id, i) => {
                    console.log(users);
                    if (users.find(user => user.userid === id && user.role === 'student')) {
                        checkStudentsExist[i] = true;
                    }
                })
                
                
                if (checkStudentsExist.every((e => e))) {
                    returnObject.studentExist = true;
                }
            }



            if (!returnObject.studentExist || !returnObject.caseExist || !returnObject.studentsInCaseInvitation) {
                return;
            } else {
                dataExist = true;
                /***********   Check have access right   ***********/
                // check user's role is tutor
                if (user.role === "student") {
                    returnObject.userRoleMatch = true;
                }


                // check user is in the case invitation
                casee?.invitingStudentid.find(((invitingStudentId) => {
                    if (invitingStudentId == user.userid) {
                        returnObject.userInCaseInvitation = true;
                    }
                }))
            }



            if (!returnObject.userRoleMatch || !returnObject.userInCaseInvitation) {
                return;
            } else {
                haveAccessRight = true;
                /***********   Invite student to case   ***********/
                studentidList.forEach(id => {
                    let index: number = casee.invitingStudentid.findIndex((invitingId) => invitingId == id);

                    casee.invitingStudentid.splice(index, 1);
                })
    
                // change in student database too
    
                returnObject.case = casee;
                returnObject.success = true;
            }
        })()

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
}
