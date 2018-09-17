import React from "react";
import PropTypes from "prop-types";
import "./resources/styles/main.css";
import "./resources/styles/main-banner.css";
import { Route, Switch } from "react-router-dom/es/";
import { Stories } from "../story/story";
import Banner from "./top_bar";

export class Main extends React.Component {
  redirectTo( path ) {
    return () => this.props.history.push( path );
  }

  render() {
    let to_render = (
      <div id="main">
        <Banner {...this.props}/>
        <Switch>
          <Route exact path="/" render={() =>
            <div id="container">
              <div id="stories" className="main-side" onClick={this.redirectTo( "/stories" )}>
                <div/>
                <h1>Stories</h1>
              </div>
              <div id="authors" className="main-side" onClick={this.redirectTo( "/authors" )}>
                <div/>
                <h1>Authors</h1>
              </div>
            </div>
          }/>
          <Route path="/stories" render={( props ) => <Stories {...props}/>}/>
        </Switch>
      </div>
    );

    return (to_render);
  }
}

Main.propTypes = {
  history: PropTypes.any,
  signout: PropTypes.func.isRequired
};
