import React from "react";
import PropTypes from "prop-types";

export class StoryFilter extends React.Component {

  constructor( props ) {
    super( props );
    this.entries = {
      tags: [],
      name: "",
      author: "",
      text: ""
    };

    this.containsTag = this.containsTag.bind( this );
    this.containsAuthor = this.containsAuthor.bind( this );
    this.containsText = this.containsText.bind( this );
    this.containsName = this.containsName.bind( this );

    this.filters = [
      // this.containsTag,
      // this.containsAuthor,
      // this.containsText,
      // this.containsName
    ];

    this.search = this.search.bind(this);
    this.search=this.search.bind(this);
  }

  search(){
    this.props.setFilters(this.filters);
  }

  containsTag( item ) {
    // return item.tags.some( ( i ) => {
    //   return this.entries.tags.some( ( t ) => t === i.name );
    // } );

    let b = item.tags.map( ( i ) => i.name.includes( this.entries.tags ) );
    return b.some( ( i ) => i );
  }

  containsAuthor( item ) {
    return item.author.username.includes( this.entries.author );
  }

  containsText( item ) {
    return item.story.text.includes( this.entries.text );
  }

  containsName( item ) {
    return item.story.title.includes( this.entries.name );
  }

  change( i ) {
    let tt = () => true;
    switch ( i ) {
    case 0:
      return ( e ) => {
        this.entries.tags = e.target.value;
        if ( this.entries.tags !== "" ) {
          this.filters.push(this.containsTag);
        }
        else {
          this.filters.splice(this.filters.indexOf(this.containsTag, 1));
        }
      };
    case 1:
      return ( e ) => {
        this.entries.name = e.target.value;
        if ( this.entries.name !== "" ) {
          this.filters.push(this.containsName);
        }
        else {
          this.filters.splice(this.filters.indexOf(this.containsName, 1));
        }
      };
    case 2:
      return ( e ) => {
        this.entries.text = e.target.value;
        if ( this.entries.text !== "" ) {
          this.filters.push(this.containsText());
        }
        else {
          this.filters.remove(this.containsText());
        }
      };
    // case 3:
    //   return ( e ) => {
    //     this.entries.name = e.target.value;
    //     if ( this.entries.name !== "" ) {
    //       this.filters.push(this.containsName());
    //     }
    //     else {
    //       this.filters.splice(this.filters.indexOf(this.containsName, 1));
    //     }
    //   };
    }
  }

  render() {
    return (
      <div id="stories-sidebar">
        <div id="sidebar-filter-container">
          <div className="filter-card">
            <h3>Tags</h3>
            <input onChange={this.change( 0 )}/>
          </div>
          <div className="filter-card">
            <h3>Name</h3>
            <input onChange={this.change( 1 )}/>
          </div>
          <div className="filter-card">
            <h3>Content</h3>
            <input onChange={this.change( 2 )}/>
          </div>
          <div className="filter-card">
            <h3>Author</h3>
            <input onChange={this.change( 3 )}/>
          </div>
          <button onClick={this.search}>Search</button>
          <div style={{ textAlign: "center" }}>
            <button onClick={this.props.redirigirCrearHistoria}>Create brand new story!</button>
          </div>
        </div>
      </div>
    );
  }
}


StoryFilter.propTypes = {
  redirigirCrearHistoria: PropTypes.func,
  setFilters: PropTypes.func.isRequired
};
