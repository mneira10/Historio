import React from "react";

export class StoryFilter extends React.Component {
  render() {
    return (
      <div id="stories-sidebar">
        <input/>
        <div id="sidebar-filter-container">
          <div>
            <h3>Tags</h3>
            <input/>
          </div>
          <div>
            <h3>Name</h3>
            <input/>
          </div>
          <div>
            <h3>Author</h3>
            <input/>
          </div>
        </div>
      </div>
    );
  }
}
