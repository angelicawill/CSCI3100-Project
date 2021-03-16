import React from 'react';
import HeroSection from '../../HeroSection';
import image from './image-landing-page.png';


const homeObjOne = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  headline: `Find the perfect tutor for you`,
  description:
    'We will help you connect and arrange meetings with the best tutors in Hong Kong to learn a variety of different subjects and skills. ',
  buttonLabel: 'Get Started',
  imgStart: '',
  img: {image},
  alt: 'Teacher'
};


function LandingPage() {
  return (
    <>      
        <HeroSection {...homeObjOne} />  
    </>
  );
}

export default LandingPage;