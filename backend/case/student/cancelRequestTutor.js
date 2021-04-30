const { requestTutor, getStudentData } = require("../../database/student");

module.exports = async (req, res) => {
    let returnObject = {
        userRoleMatch: false,
        student: null,
        success: false,
        serverError: true,
    };
    let status = 500;
    let user = req.user;
    let { tutorid } = req.body;

    try {
        /***********   Check have access right   ***********/
        if (user.role !== "student") {
            status = 403;
            return
        }
        returnObject.userRoleMatch = true;
        returnObject.student = await getStudentData(user.userid);

        /***********   check input syntax valid   ***********/
        if (typeof tutorid != "number") {
            status = 400;
            return;
        }

        /***********   check tutor in tutorRequest   ***********/
        if (!returnObject.student.tutorRequest.find(id => id == tutorid)) {
            status = 404;
            return;
        }


        /***********   request student   ***********/
        if (!await requestTutor(user.userid, tutorid, false)) return;

        returnObject.success = true;

        /***********   return cases informations   ***********/
        returnObject.student = await getStudentData(user.userid);

        if (!returnObject.student) return;

        status = 200;
        returnObject.serverError = false;
    } catch (e) {
        console.log(e);
    } finally {
        res.status(status).send(returnObject);
    }
};
