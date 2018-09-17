import React from "react";


export class StoryFilter extends React.Component {

  
  render() {

    return (
      <div id="stories-sidebar">
        <div id="sidebar-filter-container">
          <div className="filter-card">
            <h3>Tags</h3>
            <input/>
          </div>
          <div className="filter-card">
            <h3>Name</h3>
            <input/>
          </div>
          <div className="filter-card">
            <h3>Author</h3>
            <input/>
          </div>
          <div style={{textAlign:'center'}}>
            <button onClick={this.props.redirigirCrearHistoria}>Create brand new story!</button>
          </div>
        </div>
      </div>
      
      
    );
  }
}
