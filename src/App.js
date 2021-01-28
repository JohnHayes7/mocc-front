import React from "react";
import './App.css';
import LandingPage from './components/LandingPage'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import QaParent from './components/qa/Qa_parent'
import QaProjectOverview from './components/qa/QaProjectOverview'
import TrackingParent from './components/tracking/TrackingParent'
import LoggedIn from './components/tracking/LoggedIn'
import Premiers from './components/premiers/Premiers'
import Login from './components/Login/Login'
import LoginCallback from './components/Login/LoginCallback'
import TrackingProjectOverview from './components/tracking/TrackingProjectOverview'



function App() {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <Route exact path="/" component = {LandingPage} />
        <Route exact path="/ms" component = {LoggedIn} />
        <Route path ="/qa" component = {QaParent} />
        <Route path ="/premiers" component = {Premiers} />
        <Route path='/tracking' component = { TrackingParent } />
        <Route path='/tracking/:projectName' component = {TrackingProjectOverview} />
        <Route exact path ="/qa/:projectName" component = {QaProjectOverview}/>
      </div>
    </Router>
  );
}

export default App;
