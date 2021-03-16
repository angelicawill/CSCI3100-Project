import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormLogin = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>Welcome Back!</h1>
        <h2>
          Please fill in your login details to proceed
        </h2>                  
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>    
        <div className='form-inputs'>
          <label className='form-label'>Phone Number</label>
          <input
            className='form-input'
            type='tel'
            name='phonenumber'
            placeholder='Enter your phone number'
            value={values.phonenumber}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>    
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>        
        <button className='form-input-btn' type='submit'>
          Register
        </button>
        <span className='form-input-login'>
          Already a member?  <a href='./../login'>Login</a>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;