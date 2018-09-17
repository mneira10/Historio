import React from "react";
import "./resources/styles/login.css";
import PropTypes, { instanceOf } from "prop-types";
import axio from "axios";
import sha1 from "sha1";
import { Cookies, withCookies } from "react-cookie";

class Login extends React.Component {
  constructor( props ) {
    super( props );
    this.login = this.login.bind( this );
    this.signup = this.signup.bind( this );
    this.doError = this.doError.bind( this );
    this.username = "";
    this.password = "";
    this.state = { error: undefined };
    this.errorComp = React.createRef();

    this.timeout = NaN;
  }

  login() {
    switch ( Login.validateFields( this.username, this.password ) ) {
    case 0:
      this.setState( { error: "Username invalid" } );
      this.doError();
      break;
    case 1:
      this.setState( { error: "Password invalid" } );
      this.doError();
      break;
    default: {
      this.setState( { error: undefined } );
      const pass = sha1( this.password );
      axio.post( "", {
        username: this.username,
        pass: pass
      } ).then( () => {
        this.props.cookies.set( "historio-session", pass );
        this.props.onLoginSuccess();
      } );
      this.props.onLoginSuccess();

      break;
    }
    }
  }

  signup() {
    switch ( Login.validateFields( this.username, this.password, false ) ) {
    case 0:
      this.setState( { error: "Username invalid" } );
      this.doError();
      break;
    case 1:
      this.setState( { error: "Password invalid" } );
      this.doError();
      break;
    case 2:
      this.setState( { error: "Check password requirements" } );
      this.doError();
      break;
    default:
      axio.post( "", {
        username: this.username,
        pass: sha1( this.password )
      } ).then( ( ) => {
        this.setState( { error: undefined } );
        this.props.onLoginSuccess();
      } );
      this.props.onLoginSuccess();
      break;
    }
  }

  doError() {
    if ( this.timeout ) {
      clearInterval( this.timeout );
    }

    this.timeout = setTimeout( () => {
      this.errorComp.current.classList.remove( "show" );
      setTimeout( () => this.setState( { error: undefined } ), 500 );
    }, 2000 );
  }

  static enterPress( e, cbk ) {
    if ( e.key === "Enter" ) {
      cbk();
    }
  }

  static validateFields( user, pass, skip_pass = true ) {
    let check = [
      user,
      pass,
      skip_pass || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}/g.test( pass )
    ];
    let filterElement = check.map( ( e, i ) => [ e, i ] ).filter( ( i ) => !i[ 0 ] )[ 0 ];
    return filterElement ? filterElement[ 1 ] : -1;
  }

  render() {
    return (
      <div id="welcome-container">
        <h1>Narrar.io</h1>
        <div id="login-container">
          <div className="form-container">
            <h2>Username</h2>
            <input onChange={( e ) => this.username = e.target.value}
              onKeyUp={( e ) => Login.enterPress( e, this.login )}/>
          </div>
          <div className="form-container">
            <h2>Password</h2>
            <input onChange={( e ) => this.password = e.target.value}
              onKeyUp={( e ) => Login.enterPress( e, this.login )} type="password"/>
          </div>
          <div id="button-container">
            <button id="login" onClick={this.login}>Login</button>
            <button id="signup" onClick={this.signup}>Sign Up</button>
          </div>
          <div id="login-error" className={this.state.error ? "show" : ""} ref={this.errorComp}>
            <span>{this.state.error}</span>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  cookies: instanceOf( Cookies ).isRequired
};

export default withCookies( Login );
