import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../ratingbox.css';
import Rating from '@material-ui/lab/Rating';
import {Link} from "react-router-dom";
import {Button} from "../../../../Button";


const teacherinfo = {
    name: "John Lam",
    marks: "4.98/5",
    numofreviews: "(350 reviews)",
    subject1: "Mathematics",
    subject2: "Physics",
    grade1: "Secondary",
    grade2: "Primary"
};

const useStyles = makeStyles(() => ({
    label: {
        fontSize: "larger",
        color: "#FFCE0A"
    },
}));

function InfoBox() {

    const classes = useStyles();

    return (
        <>
            <div className="teacher-rating-box-wrapper">
                <div className="teacher-rating-box">
                    <div className="teacher-mark-wrapper">
                        <h1 className="teacher-mark">
                            4.97/5
                        </h1>
                        <h2 className="num-of-reviews">
                            {teacherinfo.numofreviews}
                        </h2>
                        <div className="star-wrapper">
                            <Rating classes={{
                                label: classes.label,
                            }} name="five-star-rating" value={5}  readOnly />
                        </div>
                    </div>
                    <div className="subject-wrapper">
                        <div className="teacher-rating-title">
                            SUBJECT
                        </div>
                        <div className="teacher-subject math-obj">
                            <div className="inside-word">{teacherinfo.subject1}</div>
                        </div>
                        <div className="teacher-subject bio-obj">
                            <div className="inside-word">{teacherinfo.subject2}</div>
                        </div>
                    </div>
                    <div className="teacher-grade-wrapper">
                        <div className="teacher-rating-title">
                            GRADE
                        </div>
                        <div className="teacher-grade sec">
                            <div className="inside-word">{teacherinfo.grade1}</div>
                        </div>
                        <div className="teacher-grade pri">
                            <div className="inside-word">{teacherinfo.grade2}</div>
                        </div>
                    </div>
                    <div className="more-button-wrapper">
                        <Link to='/tutor-profile'>
                            <Button buttonSize='btn--medium' buttonColor='orange'>
                                Check Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoBox;