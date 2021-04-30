import React from 'react';
import TeachingModeSelect from './components/Teachingmodeselect';
import TimeSelect from './components/Timeselect';
import Subject from './components/Subject';
import Grade from './components/Grade';
import Navbar from '../../Navbar/Navbar'

import './FindTutorPage.css';
import { Link } from 'react-router-dom';
import { Button } from "../../Button";

// this displays the find tutor page

const searchingForm = {
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    headline: `Who are you looking for?`,
    subject: 'Subject',
    time: 'Avaliable Time',
    mode: 'Teaching Mode',
    grade: 'Grade',
    cost: 'Cost/hour (HKD)',
    alt: 'Teacher'
};


function FindTutorPage() {

    return (
        <>
        <Navbar />
            <div
                className={searchingForm.lightBg ? 'home' : 'home darkBg'}
            >
                <div className='container'>
                    <div className='col'>
                        <h1 className={searchingForm.lightText ? 'heading' : 'heading dark'}>
                            {searchingForm.headline}
                        </h1>
                        <div className="search-box">
                            <div className="subject-box">
                                <h2 className="subject-text">
                                    {searchingForm.subject}
                                </h2>
                            </div>
                            <><Subject /></>
                            <div className="time-box">
                                <h2 className="subject-text">
                                    {searchingForm.time}
                                </h2>
                                <h2 className="subject-text">
                                    {searchingForm.grade}
                                </h2>
                            </div>
                            <><TimeSelect /></>
                            <div className="mode-box">
                                <h2 className="avaliable-time-text">
                                    {searchingForm.mode}
                                </h2>
                                <h2 className="avaliable-time-text">
                                    {searchingForm.cost}
                                </h2>
                            </div>
                            <><TeachingModeSelect /></>
                            <div className="find-tutor-button-wrapper">
                                <Link to='/result'>
                                    <Button buttonSize='btn--medium' buttonColor='blue'>
                                        Find Tutor
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className='col'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default FindTutorPage;