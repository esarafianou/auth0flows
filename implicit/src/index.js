import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Callback from './Callback';
import LoginCO from './LoginCO';
import Profile from './Profile';
import Auth from './Auth';
import registerServiceWorker from './registerServiceWorker';
import history from './history'
import { Route, Switch, Router } from 'react-router-dom';

const auth = new Auth();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' render={(props) => <App auth={auth} {...props} />} />
      <Route path="/callback" render={(props) => <Callback auth={auth} {...props} /> }/>
      <Route path="/profile" render={(props) => <Profile auth={auth} {...props} /> }/>
      <Route path="/loginCO" render={(props) => <LoginCO auth={auth} {...props} /> }/>
    </Switch>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
