import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

export default class Profile extends Component {

  constructor () {
    super()
    this.state = {
      //username: 'lala@gmail.com',
      username: 'testassessmenttest.2@gmail.com',
      password: 'asdASD123!@#'
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleUsername (event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit (event) {
    this.props.auth.loginWithCO(this.state.username, this.state.password)
  }

  render() {

    return (
      <div className='form'>
        <h2> Login </h2>
          <form onSubmit={this.handleSubmit}>
            <FormControl className='formControl'
              id='username'
              label='Username'
              value={this.state.username}
              onChange={this.handleUsername}
              margin='normal'
            />
            <FormControl className='formControl'
              id='password'
              label='Password'
              type='password'
              value={this.state.password}
              onChange={this.handlePassword}
              margin='normal'
            />
          </form>
          <Button type='submit' value='Submit' className='formControl'
            onClick={(event) => { this.handleSubmit(event) }}> Login
          </Button>
        </div>

    );
  }
}
