import React from 'react';
import TeachingModeSelect from './components/Teachingmodeselect';
import TimeSelect from './components/Timeselect';
import Subject from './components/Subject';
import Grade from './components/Grade';
import Cost from './components/Costperhour';
import './FindTutorPage.css';
import { Link } from 'react-router-dom';
import { Button } from "../../Button";



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
            <div
                className={searchingForm.lightBg ? 'home' : 'home darkBg'}
            >
                <div className='container'>
                    <div className='col'>
                        <h1 className={searchingForm.lightText ? 'heading' : 'heading dark'}>
                            {searchingForm.headline}
                        </h1>
                        <div className="search-box">
                            <h2 className={searchingForm.lightText ? 'sub-heading subject' : 'sub-heading dark subject'}>
                                {searchingForm.subject}
                            </h2>
                            <><Subject /></>
                            <h2 className={searchingForm.lightText ? 'sub-heading avaliable-time' : 'sub-heading dark avaliable-time'}>
                                {searchingForm.time}
                            </h2>
                            <><TimeSelect /></>
                            <h2 className={searchingForm.lightText ? 'sub-heading teaching-mode' : 'sub-heading dark teaching-mode'}>
                                {searchingForm.mode}
                            </h2>
                            <><TeachingModeSelect /></>
                            <h2 className={searchingForm.lightText ? 'sub-heading grade' : 'sub-heading dark grade'}>
                                {searchingForm.grade}
                            </h2>
                            <><Grade /></>
                            <h2 className={searchingForm.lightText ? 'sub-heading cost-per-hour' : 'sub-heading dark cost-per-hour'}>
                                {searchingForm.cost}
                            </h2>
                            <><Cost /></>
                            <div className="button-wrapper">
                                <Link to='/find-tutor-result'>
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