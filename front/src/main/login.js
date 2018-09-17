import React from "react";
import "./resources/styles/login.css";
import PropTypes, { instanceOf } from "prop-types";
import axio from "axios";
import sha1 from "sha1";
import { Cookies, withCookies } from "react-cookie";
import { backurl } from "../App";
import { dateToString } from "../util";

const path = "/user";

class Login extends React.Component {
  constructor( props ) {
    super( props );
    this.login = this.login.bind( this );
    this.signup = this.signup.bind( this );
    this.doError = this.doError.bind( this );

    this.user = {
      username: "",
      pass: "",
      birth: new Date(),
      about_writing: ""
    };

    this.state = { error: undefined };
    this.errorComp = React.createRef();
    this.loginSignContainer = React.createRef();
    this.signContainer = React.createRef();
    this.onSignUp = false;

    this.timeout = NaN;
  }

  login() {
    switch ( Login.validateFields( this.user.username, this.user.pass ) ) {
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
      const pass = sha1( this.user.pass );
      axio.post( backurl + path + "/authenticate", {
        username: this.user.username,
        pass: pass
      } ).then( ( response ) => {
        let rta = response.data[ "results" ][ 0 ][ "data" ][ 0 ][ "row" ][ 0 ];
        rta["pass"] = pass;
        this.saveSession( rta );
        this.props.onLoginSuccess();
      } ).catch( (e)=>{
        console.error(e);
        this.setState( { error: "User or pass invalid" } );
        this.doError();
      });
      break;
    }
    }
  }

  signup() {
    switch ( Login.validateFields( this.user.username, this.user.pass, false ) ) {
    case 0:
      this.setState( { error: "Username invalid" } );
      this.doError();
      break;
    case 1:
      this.setState( { error: "Password invalid" } );
      this.doError();
      break;
    case 2:
      this.setState( { error: "Check pass requirements" } );
      this.doError();
      break;
    default:
      if ( !this.onSignUp ) {
        this.loginSignContainer.current.classList.toggle( "show-signup" );
        this.signContainer.current.classList.toggle( "hidden" );
        this.onSignUp = true;
      }
      else {
        let data = {
          username: this.user.username,
          pass: sha1( this.user.pass ),
          about_writing: this.user.about_writing,
          birth: dateToString( new Date( this.user.birth ) ),
          image: undefined
        };

        axio.post( backurl + path, data )
          .then( () => {
            this.setState( { error: undefined } );
            this.saveSession( data );
            this.props.onLoginSuccess();
          } );
      }
      break;
    }
  }

  saveSession( user ) {
    let now = Date.now();
    this.props.cookies.set( "historio-session-owner", JSON.stringify( user ), { expires: new Date( now + (1000 * 60 * 60 * 24 * 5) ) } );
    this.props.cookies.set( "historio-session", user.pass, { expires: new Date( now + (1000 * 60 * 60 * 24 * 5) ) } );
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
          <div id="login-signup-container" ref={this.loginSignContainer}>
            <div>
              <div className="form-container">
                <h2>Username</h2>
                <input onChange={( e ) => this.user.username = e.target.value}
                  onKeyUp={( e ) => Login.enterPress( e, this.login )}/>
              </div>
              <div className="form-container">
                <h2>Password</h2>
                <input onChange={( e ) => this.user.pass = e.target.value}
                  onKeyUp={( e ) => Login.enterPress( e, this.login )} type="password"/>
              </div>
            </div>
            <div id="signContainer" ref={this.signContainer} className="hidden">
              <div className="form-container">
                <span>Birthday</span>
                <input type="date" onChange={( e ) => this.user.birth = e.target.value}/>
              </div>
              <div>
                <h2>About</h2>
                <textarea onChange={( e ) => this.user.about_writing = e.target.value}/>
              </div>
            </div>
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
