import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/pages/LandingPage/LandingPage';
import Login from './components/pages/LogIn/LogIn';
import FindTutorPage from "./components/pages/FindTutorPage/FindTutorPage";
import Chatroom from './components/pages/Chatroom/Chatroom';

import Register from './components/pages/Register/Register';

import SubjectSelecton from './components/pages/FindTutorPage/components/Subject';
import { Subject } from '@material-ui/icons';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
      <Route path='/' exact component={LandingPage} />    
      <Route path='/register' exact component={Register} />    
      <Route path='/login' exact component={Login} />   
      <Route path='/find-tutor' exact component={FindTutorPage} />    
      <Route path='/chat' exact component={Chatroom} /> 

      <Route path='/subject' exact component={SubjectSelecton} />
      </Switch>      
    </Router>
  );
}

export default App;
