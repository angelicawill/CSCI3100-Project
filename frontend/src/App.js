import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/pages/LandingPage/LandingPage';
import Login from './components/pages/LogIn/LogIn';
import FindTutorPage from "./components/pages/FindTutorPage/FindTutorPage";
import Chatroom from './components/pages/Chatroom/Chatroom';
import Register from './components/pages/Register/Register';
import TutorProfilePage from "./components/pages/TutorProfilePage/TutorProfilePage";
import SubjectSelecton from './components/pages/FindTutorPage/components/Subject';
import SearchResult from "./components/pages/SearchResultPage/SearchResult";
import UserInfo from './components/pages/UserInfo/UserInfo';
import RegisterSuccess from './components/pages/Register/RegisterSuccess';


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
      <Route path='/' exact component={LandingPage} />    
      <Route path='/register' exact component={Register} />    
      <Route path='/login' exact component={Login} />   
      <Route path='/find-tutor' exact component={FindTutorPage} />    
      <Route path='/chat' exact component={Chatroom} />
          <Route path='/tutor-profile' exact component={TutorProfilePage} />
          <Route path='/subject' exact component={SubjectSelecton} />
          <Route path='/result' exact component={SearchResult} />
          <Route path='/registersuccess' exact component={RegisterSuccess} />
          <Route path='/user-information' exact component={UserInfo} />
      </Switch>      
    </Router>
  );
}

export default App;
