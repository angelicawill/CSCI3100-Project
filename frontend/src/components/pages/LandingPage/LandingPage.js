import React from 'react';
import './LandingPage.css';
import { Button } from './../../Button.css';
import { Link } from 'react-router-dom';
import {ReactComponent as Image} from './image-landing-page.svg'



function LandingPage() {
  return (
    <>
      <div
        className='lightBg'
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                
                <h1 className={'heading dark'}>
                  'Find the perfect'
                </h1>
                <h1 className={'heading dark'}>
                  'tutor for you'
                </h1>
                <p
                  className={'home__hero-subtitle dark'}
                >
                  'We will help you connect and arrange meetings with the best tutors in Hong Kong to learn a variety of different subjects and skills. '
                </p>
                <Link to='/sign-up'>
                  <Button buttonSize='btn--medium' buttonColor='green'>
                  'Get Started'
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <Image alt= 'Teacher' className='home__hero-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;