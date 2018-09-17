import React from "react";
import PropTypes from "prop-types";
import "./resources/styles/main.css";
import "./resources/styles/main-banner.css";
import { Route, Switch } from "react-router-dom/es/";
import { Stories } from "../story/story";

export class Main extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      option: 0
    };
    this.optionClickHandler = this.optionClickHandler.bind( this );
  }

  optionClickHandler( opt ) {
    return () => {
      this.setState( { option: opt } );
    };
  }

  redirectTo( path ) {
    return () => this.props.history.push( path );
  }

  render() {
    let to_render = (
      <div id="main">
        <div id="banner">
          <span>Narrar.io</span>
          <div id="user">
            <button><i className="fas fa-user"/></button>
            <button><i className="fas fa-bars"/></button>
          </div>
        </div>
        <Switch>
          <Route path="/main" render={() =>
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
          <Route path="/stories" component={Stories}/>
        </Switch>
      </div>
    );

    if ( this.state.option === 1 ) {
      to_render = <Stories/>;
    }

    return (to_render);
  }
}

Main.propTypes = {
  history: PropTypes.any
};
