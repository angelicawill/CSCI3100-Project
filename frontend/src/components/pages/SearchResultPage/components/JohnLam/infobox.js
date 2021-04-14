import React from 'react';
import '../infobox.css';
import teacherpic from '../../images/JohnLam.png';
import Divider from '@material-ui/core/Divider';

const teacherinfo = {
    name: "John Lam",
    address: "Sha Tin, New Territoriess",
    introduction: "Hi! I hold a bachelors degree in Mathematics from The " +
        "Chinese University at Hong Kong. I have 5 years of experience " +
        "teaching primary and junior secondary children. " +
        "Feel free to message me if you have any questions!"
};

function InfoBox() {

    return (
        <>
        <div className="teacher-introduction-box">
            <img src={teacherpic} alt="Teacher-pic" className="img"/>
            <h1 className="teacher-name">
                {teacherinfo.name}
            </h1>
            <h2 className="teacher-address">
                {teacherinfo.address}
            </h2>
            <Divider className="divider" />
                <h2 className="teacher-introduction-title">
                    INTRO
                </h2>
                <h2 className="teacher-introduction">
                    {teacherinfo.introduction}
                </h2>
            </div>
        </>
    );
}

export default InfoBox;