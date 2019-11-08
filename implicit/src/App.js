import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
      { this.props.auth.isAuthenticated() ?
        <div>
          <div> You are logged in! </div>
          <Button onClick={ () => this.props.auth.logout() }> Logout </Button>
          <Button onClick={ () => this.props.auth.changePassword() }> Change Password </Button>
          <Button onClick={ () => this.props.auth.renewToken() }> Renew Token </Button>
          <Link to='/profile'> My Profile </Link>
        </div>
      :
        <div>
          <div> You have to log in! </div>
          <Button onClick={ () => this.props.auth.login() }> Login with implicit grant </Button>
          <Link to='/loginCO'> Login with cross authentication </Link>
        </div>
      }
      </div>
    );
  }
}
