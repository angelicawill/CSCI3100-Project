import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/pages/LandingPage/LandingPage';
import SignUpForm from './components/pages/SignUpForm/Form';
import LoginForm from './components/pages/LoginForm/Form';
import Header from './components/Header/Header';


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
      <Route path='/' exact component={LandingPage} />    
      <Route path='/sign-up' exact component={SignUpForm} />    
      <Route path='/login' exact component={LoginForm} /> 
      <Route path='/header' exact component={Header} />  

      </Switch>      
    </Router>
  );
}

export default App;
