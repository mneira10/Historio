import React, { Component } from 'react';
import './autors.css';

let comingFeatureStyle = {'color': "white",
                          'textAlign': 'center',
                        'fontSize':"500%"};


export class Authors extends Component {

  render() {
    return (
      {/* Dont use style here, import css sheet */}      
      <div id="autor-div">
        <h1 style={comingFeatureStyle}>Feature coming soon!</h1>
      </div>
    )
  }
}
