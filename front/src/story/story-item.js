import React from "react";
import PropTypes from "prop-types";
import axio from "axios";
import { backurl } from "../App";
import { Route, Switch } from "react-router-dom/es/";

export class StoryItem extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      story: undefined
    };
  }

  componentDidMount() {
    axio.get( backurl + "/story/" + this.props.match.params[ "id" ] )
      .then( ( response ) => {
        console.log( response );
      } );
  }

  render() {
    console.log(JSON.stringify(this.props.match ));
    return (
      <Switch>
        <Route path="/" render={()=>{
          return (
            <div id="story-item">
              <h1>Hola</h1>
            </div>
          );
        }}/>
      </Switch>
    );
  }
}

StoryItem.propTypes = {
  story: PropTypes.object.isRequired,
  match: PropTypes.any
};
