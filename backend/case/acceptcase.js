let { users, chats, cases } = global.dixontest;

module.exports = (req, res) => {
    let returnObject = {
        caseidValid: false,
        caseExist: false,
        userRoleMatch: false,
        userInCaseInvitation: false,
        case: null,
        success: false,
        serverError: true
    }
    let status = 500;

    let { caseid } = req.body;
    let user = req.user;

    try {
        dataSyntaxValid = false;
        let dataExist = false;
        let haveAccessRight = false;

        (() => {
            if (!user) {
                return;
            } else {
                /***********   Check syntax valid   ***********/

                let dataSyntaxValid = true;
                if (typeof caseid === 'number' && Number.isInteger(caseid)) {
                    returnObject.caseidValid = true;
                }
            }


            if (!returnObject.caseidValid) {
                return;
            } else {
                dataSyntaxValid = true;
                /***********   Check data exist   ***********/
                if (cases.find(casee => casee.caseid === caseid)) {
                    returnObject.caseExist = true;
                }
            }

            if (!returnObject.caseExist) {
                return;
            } else {
                dataExist = true;
                /***********   Check have access right   ***********/

                // check user's role is student
                if (user.role === "student") {
                    returnObject.userRoleMatch = true;
                }

                // check user is in the case
                let casee = cases.find(casee => casee.caseid === caseid);
                if (casee.invitingStudentid.find(id => id === user.userid)) {
                    returnObject.userInCaseInvitation = true;
                }
            }


            if (!returnObject.userRoleMatch || !returnObject.userInCaseInvitation) {
                return;
            } else {
                haveAccessRight = true;
                /***********   Accept case   ***********/
                let casee = cases.find(casee => casee.caseid === caseid);
                let idIndex = casee.invitingStudentid.findIndex((id) => id === user.userid);

                casee.invitingStudentid.splice(idIndex, 1);
                casee.studentid.push(user.userid);

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