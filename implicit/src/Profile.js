import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import history from './history'

export default class Profile extends Component {
  constructor() {
    super()
    this.state = {profile: ''}
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated()) {
      history.replace('/')
    }

    const { userProfile, getProfile } = this.props.auth
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile })
      })
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state

    return (
      <div className="App">
        <Link to='/'> Home </Link>
        <div> nickname: {profile.nickname} </div>
        <div> name: {profile.name} </div>
        <img src={profile.picture} />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}
