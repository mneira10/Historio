import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import axio from "axios";
import { backurl } from "../App";
import { Route, Switch } from "react-router-dom/es/";
import "./resources/styles/story-item.css";
import { dateToString } from "../util";
import { Cookies, withCookies } from "react-cookie";

class StoryItem extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { story: undefined, edit: false };
    this.editMode = this.editMode.bind( this );
    this.storyEdit = {
      title: "",
      text1: "",
      text2: "",
      tags: ""
    };
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    axio.get( backurl + "/story/" + this.props.match.params[ "id" ] )
      .then( ( response ) => {
        let item = response.data[ "results" ][ 0 ][ "data" ];
        item = item[ 0 ];
        this.setState( {
          story: {
            story: { ...item[ "row" ][ 0 ], id: item[ "row" ][ 3 ] },
            author: item[ "row" ][ 1 ],
            tags: item[ "row" ][ 2 ]
          }
        } );
      } );
  }

  goTo( path ) {
    this.props.history.push( path );
  }

  editMode() {
    this.setState( { edit: !this.state.edit } );
  }

  create() {
    axio.post( backurl + "/story", {
      padre: this.state.story.story.id,
      story: {
        title: this.storyEdit.title,
        text: this.storyEdit.text1 + "\n" + this.state.story.story.text + "\n" + this.storyEdit.text2,
        date: dateToString( new Date( Date.now() ) ),
        modifiability: 2
      },
      author: {
        username: this.props.cookies.get( "historio-session-owner" ).username
      },
      tags: this.state.story.tags.map((i)=>i.name)
        .concat( this.storyEdit.tags.trim().split( " " ).map( ( item ) => `#${item}` ) )
    } ).then( () => {

    } );
  }

  render() {
    function range( end ) {
      return new Array( end ).fill( undefined );
    }

    let toRender = (
      <h3>Loading</h3>
    );
    if ( this.state.story ) {
      toRender = (
        <div id="story-item">
          <button id="stories-back" onClick={() => this.goTo( "/stories" )}><i className="fas fa-chevron-left"/>
          </button>
          {this.state.edit ? <div id="title">
            <input placeholder={this.state.story.story.title} onChange={(e)=>this.storyEdit.title=e.target.value}/>
          </div> : <h1 id="title">{this.state.story.story.title}</h1>}
          <hr/>
          <div id="story-item-content">
            <div>
              {this.state.edit &&
              <textarea className="story-text-container"
                onChange={( e ) => this.storyEdit.text1 = e.target.value}
                placeholder={"Place your text here"}/>}
              <div className="story-text-container">
                <span>{this.state.story.story.text}</span>
              </div>
              {this.state.edit &&
              <textarea className="story-text-container"
                onChange={( e ) => this.storyEdit.text2 = e.target.value}
                placeholder={"Place your text here"}/>}
            </div>
            <div id="story-item-author">
              <div id="story-item-author-img"/>
              <h4>{this.state.story.author.username}</h4>
              <div>
                {this.state.story.tags.map( ( item, index ) =>
                  <span key={"tag_" + index} className="badge">{item.name}</span> )}
                {this.state.edit && <textarea className="tags story-text-container"
                  onChange={( e ) => this.storyEdit.tags = e.target.value}
                  placeholder="Add new tags here"/>}
              </div>
              <div>
                <h3>Rating</h3>
                <div id="story-rating">
                  {range( 5 ).map( ( e, i ) => <i key={"star_" + i}
                    className={"fas fa-star " + (i <= this.state.story.story[ "rating" ] - 1 ? "star-on" : "star-off")}/> )}
                </div>
              </div>
              <div id="continue-story-continaer">
                <h3>Do you want to continue this incredible story?</h3>
                {!this.state.edit ?
                  (<button id="continue-story-btn" onClick={this.editMode}>
                    <i className="fas fa-user-edit"/>
                  </button>) :
                  (<button id="continue-story-btn" onClick={this.create}>
                    <i className="far fa-save"/>
                  </button>)
                }
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Switch>
        <Route path="/" render={() => toRender}/>
      </Switch>
    );
  }
}

StoryItem.propTypes = {
  match: PropTypes.any,
  cookies: instanceOf( Cookies ).isRequired,
  history: PropTypes.object.isRequired,
};

export default withCookies( StoryItem );
