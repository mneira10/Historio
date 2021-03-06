import React from "react";
import PropTypes from "prop-types";
import "./resources/styles/main.css";
import "./resources/styles/main-banner.css";
import { Route, Switch } from "react-router-dom/es/";
import { Stories } from "../story/story";
import { Authors } from "../authors/authors";
import CreateStory from "../createStory/createStory";
import Banner from "./top_bar";

export class Main extends React.Component {

  redirectTo( path ) {
    return () => this.props.history.push( path );
  }

  redirigirACrearHistoria() {
    this.redirectTo( "/createStory" )();
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
          <Route path="/stories" render={( props ) => <Stories {...props}
            redirigirCrearHistoria={() => this.redirigirACrearHistoria()}/>}/>
          <Route path="/authors" component={Authors}/>
          <Route path="/createStory" component={( props ) => <CreateStory {...props}/>}/>
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
