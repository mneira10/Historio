import React from "react";
import "./resources/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom/es/";
import Login from "./main/login";
import { Main } from "./main/main";
import Redirect from "react-router-dom/es/Redirect";

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      logged: false,
    };

    this.approvedLogin = this.approvedLogin.bind( this );
  }

  approvedLogin() {
    this.setState( { logged: true } );
  }

  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <Switch>
            <Route exact path="/login"
              render={() => this.state.logged ?
                <Redirect to="/main"/> :
                <Login onLoginSuccess={this.approvedLogin}/>}/>
            <Route path="/"
              render={( props ) => this.state.logged ?
                <Main {...props}/> :
                <Redirect to="/login"/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
