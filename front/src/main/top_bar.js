import React from "react";
import PropTypes, { instanceOf }  from "prop-types";
import { Cookies, withCookies } from "react-cookie";

class Banner extends React.Component {

  constructor( props ) {
    super( props );
    this.userOptHandler = this.userOptHandler.bind( this );
    this.userOpt = React.createRef();
    this.signOut = this.signOut.bind(this);
    console.log(props);
  }

  userOptHandler() {
    this.userOpt.current.classList.toggle( "show" );
  }

  static onBlur() {
    console.log( 123 );
  }

  signOut() {
    this.props.cookies.remove( "historio-session" );
    this.props.signout();
  }

  render() {
    return (
      <div id="banner">
        <span>Narrar.io</span>
        <div id="user">
          <div className="banner-menu-dropdown">
            <button onClick={this.userOptHandler}><i className="fas fa-user"/></button>
            <div className="banner-dropdown" ref={this.userOpt} onBlur={Banner.onBlur}>
              <button>Account</button>
              <button>Settings</button>
              <button onClick={this.signOut}>Log out</button>
            </div>
          </div>
          <div className="banner-menu-dropdown">
            <button><i className="fas fa-bars"/></button>
          </div>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  cookies: instanceOf( Cookies ).isRequired,
  history: PropTypes.any,
  signout: PropTypes.func.isRequired
};

export default withCookies( Banner );
