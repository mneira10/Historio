import React from "react";
import "./resources/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom/es/";
import Login from "./main/login";
import { Main } from "./main/main";
import Redirect from "react-router-dom/es/Redirect";
import { Cookies, withCookies } from "react-cookie";
import { instanceOf } from "prop-types";

export const backurl = "http://neo4jbig8575.cloudapp.net:8080";

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      logged: this.props.cookies.get( "historio-session" ),
    };

    this.approvedLogin = this.approvedLogin.bind( this );
    this.signout = this.signout.bind( this );
  }

  approvedLogin() {
    this.setState( { logged: true } );
  }

  signout() {
    this.setState( { logged: false } );
  }

  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <Switch>
            <Route exact path="/login"
              render={() => this.state.logged ?
                <Redirect to="/"/> :
                <Login onLoginSuccess={this.approvedLogin}/>}/>
            <Route path="/"
              render={( props ) => this.state.logged ?
                <Main {...props} signout={this.signout}/> :
                <Redirect to="/login"/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  cookies: instanceOf( Cookies ).isRequired
};

export default withCookies( App );
