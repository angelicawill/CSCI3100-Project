let { users, chats, cases } = global.dixontest;

module.exports = (req, res) => {
    let returnObject = {
        studentidListValid: false,
        caseidValid: false,
        studentExist: false,
        caseExist: false,
        userRoleMatch: false,
        userInCase: false,
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
                // Find students
                let checkStudentsExist = true;
                studentidList.forEach(id => {
                    console.log(users);
                    if (!users.find(user => user.userid === id && user.role === 'student')) {
                        checkStudentsExist = false;
                    }
                })
                if (checkStudentsExist) {
                    returnObject.studentExist = true;
                }
    
                // Find case
                if (cases.find(c => c.caseid === caseid)) {
                    returnObject.caseExist = true;
                }
            }



            if (!returnObject.studentExist || !returnObject.caseExist) {
                return;
            } else {
                dataExist = true;
                /***********   Check have access right   ***********/
                // check user's role is tutor
                if (user.role === "tutor") {
                    returnObject.userRoleMatch = true;
                }
    
                // check user is in the case
                casee = cases.find(c => c.caseid === caseid);
                if (casee?.tutorid === user.userid) {
                    returnObject.userInCase = true;
                }
            }



            if (!returnObject.userRoleMatch || !returnObject.userInCase) {
                return;
            } else {
                haveAccessRight = true;
                /***********   Invite student to case   ***********/
                studentidList.forEach(id => {
                    casee.invitingStudentid.push(id);
    
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