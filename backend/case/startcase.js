let { users, chats, cases } = global.dixontest;

module.exports = (req, res) => {
    let returnObject = {
        userRoleMatch: false,
        case: null,
        success: false,
        serverError: true
    }
    let status = 500;

    let user = req.user;

    try {
        let haveAccessRight = false;
        (() => {
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
                let newCase = {
                    caseid: Date.now(),
                    studentid: [],
                    invitingStudentid:[],
                    tutorid: user.userid,
                    createAt: Date.now(),
                    isClosed: false
                }
    
                cases.push(newCase);
    
                // change in tutor database too
    
                returnObject.case = newCase;
                returnObject.success = true;
            }
        })()


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
}