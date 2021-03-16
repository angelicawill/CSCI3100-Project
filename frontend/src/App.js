import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/pages/LandingPage/LandingPage';
import Form from './components/pages/Forms/Form';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
      <Route path='/' exact component={LandingPage} />    
      <Route path='/sign-up' exact component={Form} />       
      </Switch>      
    </Router>
  );
}

export default App;
