import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './infobox.css';
import teacherpic from '../images/Jessica-Ting.png';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import mathImgNotSelected from "../../FindTutorPage/images/Math-not-selected.png";

const teacherinfo = {
    name: "Jessica Ting",
    address: "Tai Po, New Territories",
    introduction: "I’m currently working as a kindergarten teacher " +
        "at one of the schools in Hong Kong. I have been a part-time mathematics " +
        "and biology tutor for 7 years, so I’m very patient with small kids. " +
        "Message me for more information. Thank you :)"
};

function InfoBox() {

    return (
        <>
        <div className="introduction-box">
            <img src={teacherpic} alt="Teacher-pic" className="img"/>
            <h1 className="teacher-name">
                {teacherinfo.name}
            </h1>
            <h2 className="teacher-address">
                {teacherinfo.address}
            </h2>
            <Divider className="divider" />

                <h2 className="introduction-title">
                    INTRO
                </h2>
                <h2 className="introduction">
                    {teacherinfo.introduction}
                </h2>

            </div>


        </>
    );
}

export default InfoBox;