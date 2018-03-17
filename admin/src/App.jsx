import React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';

import './App.css';

import Workspace from './components/workspace/Workspace';
import DashboardPage from './components/dashboard/DashboardPage';
import UserPage from './components/user/UserPage';
import RolePage from './components/role/RolePage';
import ProjectPage from './components/project/ProjectPage';
import ProjectProgressPage from './components/project_progress/ProjectProgressPage';
import ImagePage from './components/image/ImagePage';
import LoginForm from './components/login/LoginForm';

export default () => {
  let componentToRender = (
    <Router>
      <Workspace>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/users" component={UserPage} />
        <Route exact path="/roles" component={RolePage} />
        <Route exact path="/projects" component={ProjectPage} />
        <Route exact path="/projectprogresses" component={ProjectProgressPage} />
        <Route exact path="/images" component={ImagePage} />
      </Workspace>
    </Router>
  );

  const token = window.sessionStorage.getItem('token');
  if (!token) {
    componentToRender = (
      <LoginForm />
    );
  } else {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return (
    <div className="App">
      {componentToRender}
    </div>
  );
};
