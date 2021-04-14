import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './teachingdetails.css';
import teacherpic from '../images/Jessica-Ting.png';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import mathImgNotSelected from "../../FindTutorPage/images/Math-not-selected.png";

const subject = {
    submath: "Mathematics",
    subbio: "Biology",
    grade1: "Primary",
    grade2: "Secondary",
    mode1: "1-to-1 & Group Teaching",
    mode2: "Online & Offline"
};

function TeachingDetails() {

    return (
        <>
            <div className="teaching-details-container">
                <div className="subject-title">
                    <h2 className="title">
                        SUBJECTS
                    </h2>
                    <div className="sub-math">
                        <div className="text-inside">
                            {subject.submath}
                        </div>
                    </div>
                    <div className="sub-bio">
                        <div className="text-inside">
                            {subject.subbio}
                        </div>
                    </div>
                </div>
                <div className="grades-title">
                    <h2 className="title">
                        GRADES
                    </h2>
                    <div className="grade-pri">
                        <div className="text-inside">
                            {subject.grade1}
                        </div>
                    </div>
                    <div className="grade-sec">
                        <div className="text-inside">
                            {subject.grade2}
                        </div>
                    </div>
                </div>
                <div className="teaching-mode-title">
                    <h2 className="title">
                        TEACHING MODE AVALIABLE
                    </h2>
                    <div className="teach-mode1">
                        <div className="text-inside">
                            {subject.mode1}
                        </div>
                    </div>
                    <div className="teach-mode2">
                        <div className="text-inside">
                            {subject.mode2}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default TeachingDetails;