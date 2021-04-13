import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './contactbox.css';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import mathImgNotSelected from "../../FindTutorPage/images/Math-not-selected.png";
import {Link} from "react-router-dom";
import {Button} from "../../../Button";

const ContactInfo = {
    title: "Do you want to contact the tutor?",
    address: "Tai Po, New Territories",
    introduction: "You are highly encouraged to message the tutor to discuss and verify the details"
};

function InfoBox() {

    return (
        <>
            <div className="introduction-box">
                <h1 className="teacher-name">
                    {ContactInfo.title}
                </h1>
                <h2 className="introduction">
                    {ContactInfo.introduction}
                </h2>
                <div className="hourly-rate-box">
                    <h2 className="hourly-rate">
                        HOURLY RATE
                    </h2>
                    <br />
                    <h2 className="hourly-wage">
                        HKD $120-150
                    </h2>
                </div>
                <div className="match-button-wrapper">
                    <Link to='/matching'>
                        <Button buttonSize='btn--medium' buttonColor='blue'>
                            Request to Match
                        </Button>
                    </Link>
                </div>
                <div className="message-button-wrapper">
                    <Link to='/chat'>
                        <Button buttonSize='btn--medium' buttonColor='grey'>
                            Message
                        </Button>
                    </Link>
                </div>

            </div>


        </>
    );
}

export default InfoBox;