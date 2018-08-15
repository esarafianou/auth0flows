import React, { Component } from 'react';
import './App.css';

export default class Callback extends Component {

  componentDidMount() {
    this.props.auth.handleAuthentication()
  }

  render() {
    return(
      <div className="App">
          Loading...
      </div>
    );
  }
}
