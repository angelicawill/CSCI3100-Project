import React from 'react';
import './Form.css';
import imagesuccess from './success.png'

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <img className='form-img-2' src={imagesuccess} alt='success-image' />
      <h1 className='form-success'>Registration Completed!</h1>
      <p><center>Please verify your identity</center></p>
      <p><center>by replying to the email we sent</center></p>
      
    </div>
  );
};

export default FormSuccess;