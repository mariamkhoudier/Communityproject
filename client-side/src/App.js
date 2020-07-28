import React from 'react';

import ProjectSubmition from "./Components/ProjectSubmition";
import MainPage from "./Components/MainPage";
import Confirmation from "./Components/Confirmation";
import ProcessProject from "./Components/ProcessProject";
import ViewEligibleProjects from "./Components/ViewEligibleProjects";
import './main.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

export default function App() {
 
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/addProject/Confirmation/:id">
            <Confirmation/>
          </Route>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route path="/addProject">
            <ProjectSubmition/>
          </Route>
          <Route path="/reviewProjects">
            <ProcessProject/>
          </Route>
          <Route path="/viewProjects/:canvote">
            <ViewEligibleProjects/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


