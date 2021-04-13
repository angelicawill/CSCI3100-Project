import React from 'react';
import './SearchResult.css';
import Infobox1 from './components/JessicaTing/infobox';
import RatingBox1 from './components/JessicaTing/ratingbox';
import Infobox2 from './components/JohnLam/infobox';
import RatingBox2 from './components/JohnLam/ratingbox';



const searchingForm = {
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
};

function SearchResult() {


    return (
        <>
            <div
                className={searchingForm.lightBg ? 'home' : 'home darkBg'}
            >
                <h1 className="result-heading">
                    Here is your result...
                </h1>
                <div className="teacher-profile">
                    <div className="teacher-rating-display-box-wrapper">
                        <div className="teacher-intro-box-wrapper">
                            <div className="teacher-intro-box">
                                <><Infobox1 /></>
                            </div></div>
                        <div className="teacher-rating-display-box">
                            <><RatingBox1 /></>
                        </div>
                    </div>
                </div>
                <div className="teacher-profile">
                    <div className="teacher-rating-display-box-wrapper">
                        <div className="teacher-intro-box-wrapper">
                            <div className="teacher-intro-box">
                                <><Infobox2 /></>
                            </div></div>
                        <div className="teacher-rating-display-box">
                            <><RatingBox2 /></>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default SearchResult;