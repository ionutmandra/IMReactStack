import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
  handleUserChange(e) {
    this.setState({ user: e.target.value });
  }
  handlePwdChange(e) {
    this.setState({ password: e.target.value });
  }
  doLogin() {
    this.props.doLogin(this.state.user, this.state.password);
  }

  //lifecycle events
  render() {
    return (
      <div className={'loginCtainer'}>
        <input type={'text'} placeholder={'user'} onChange={this.handleUserChange}/>
        <br/>
        <input type={'text'} placeholder={'password'} onChange={this.handlePwdChange}/>
        <br/>
        <input type={'button'} value={'Login'} onClick={this.doLogin}/>
        <br/> {this.props.authState.isAuthenticated
          ? <Link to={"/adminHome"}>{'adminHome'}</Link>
          : null}
      </div>
    );
  }
}

export default Login;
