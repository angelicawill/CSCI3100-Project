import React from 'react';
import './TutorProfilePage.css';
import Infobox from './components/infobox';
import TeachingDeatils from './components/teachingdetails';
import Review from './components/reviewbox';
import Contact from './components/contactbox';
import RatingBox from './components/ratingbox';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";



const searchingForm = {
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
};

const useStyles = makeStyles(() => ({
    label: {
        fontSize: "larger",
        width: '4vw',
        color: "#FFCE0A"
    },
    root: {
        width: '24vw'
    },
}));

function FindTutorPage() {

    const classes = useStyles();

    return (
        <>
            <div
                className={searchingForm.lightBg ? 'home' : 'home darkBg'}
            >
                <div className="back-to-result-wrapper">
                    <Link to='/result'>
                        <p className="back-to-result">
                            &#60;&#60; Back to result...
                        </p>
                    </Link>
                </div>
                <div className="intro-box-wrapper">
                    <div className="intro-box">
                        <><Infobox /></>
                    </div></div>
                <div className="rating-display-box-wrapper">
                    <div className="rating-display-box">
                        <><RatingBox /></>
                    </div>
                </div>
                <div className="teaching-details-wrapper">
                    <div className="teaching-details">
                        <><TeachingDeatils /></>
                    </div>
                </div>
                <div className="rating-box-wrapper">
                    <div className="rating-box">
                        <div className="rating-box-info">
                            <h2 className="review-title">
                                Write a review
                            </h2>
                            <div className="rating-control" >
                                <Rating classes={{
                                    label: classes.label,
                                }} name="half-rating" defaultValue={2.5} precision={0.5} size="large" />
                            </div>
                            <div className="review-input-box">
                                <div className="classes.root">
                                    <TextField
                                        id="outlined-required"
                                        label="Finish a case with tutor to leave a review"
                                        variant="outlined"
                                        classes={{
                                            root: classes.root,
                                        }}
                                    /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="review-box-wrapper">
                    <div className="review-box">
                        <><Review /></>
                    </div>
                </div>
                <div className="contact-box-wrapper">
                    <div className="contact-box">
                        <><Contact /></>
                    </div>
                </div>
            </div>
        </>
    );
}


export default FindTutorPage;