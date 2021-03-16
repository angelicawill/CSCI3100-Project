import React, { useState } from 'react';
import './Form.css';
import FormSignUp from './FormSignUp';
import FormSuccess from './FormSuccess';
import image from './study.png'

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          {/* <img className='form-img' src={image} alt='study' /> */}
        </div>
        {!isSubmitted ? (
          <FormSignUp submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;