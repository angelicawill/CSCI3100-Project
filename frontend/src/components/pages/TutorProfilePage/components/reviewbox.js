import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './reviewbox.css';
import userpic1 from '../images/Jeremy.png';
import userpic2 from '../images/Teresa.png';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import mathImgNotSelected from "../../FindTutorPage/images/Math-not-selected.png";

const user1info = {
    name: "Jeremy",
    time: "8 hours ago",
    review: "Arrived on time, very nice to my kids."
};

const user2info = {
    name: "Teresa",
    time: "3 days ago",
    review: "Jessica is an amazing teacher. She’s very patient and" +
        "teaches hard concepts clearly. 100% recommend."
};

function InfoBox() {

    return (
        <>
            <div className="review-present-box">
                <h1 className="review-title">
                    Review
                </h1>
                <Divider className="divider-review" />
                <img src={userpic1} alt="user1-pic" className="user-img"/>
                <h2 className="user-name">
                    {user1info.name}
                </h2>
                <h2 className="user-time">
                    {user1info.time}
                </h2>
                <div className="user-review-box">
                    <h2 className="user-review">
                        {user1info.review}
                    </h2>
                </div>
                <Divider className="divider-review" />
                <img src={userpic2} alt="user2-pic" className="user-img"/>
                <h2 className="user-name">
                    {user2info.name}
                </h2>
                <h2 className="user-time">
                    {user2info.time}
                </h2>
                <div className="user-review-box">
                    <h2 className="user-review">
                        {user2info.review}
                    </h2>
                </div>
            </div>


        </>
    );
}

export default InfoBox;