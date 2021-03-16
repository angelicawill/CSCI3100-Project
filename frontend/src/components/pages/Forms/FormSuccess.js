import React from 'react';
import './Form.css';

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>We sent you an email!</h1>
      <h1 className='form-success'>Please verify your identity to continue</h1>
      <img className='form-img-2' src='success.svg' alt='success-image' />
    </div>
  );
};

export default FormSuccess;