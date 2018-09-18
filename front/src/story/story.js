import React from "react";
import Proptypes from "prop-types";
import "../main/resources/styles/main.css";
import "./resources/styles/story.css";
import "./resources/styles/filter.css";
import axios from "axios";
import { backurl } from "../App";
import { StoryFilter } from "./story-filter";
import { Route, Switch } from "react-router-dom/es/";
import StoryItem from "./story-item";

export class Story extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { expanded: false };
    this.clickHandler = this.clickHandler.bind( this );
  }

  clickHandler( id ) {
    return () => this.props.history.push( "/stories/" + id.story.id );
  }

  render() {
    return (
      <div className="story-item-container in-bottom">
        <div className="story-item" onClick={this.clickHandler( this.props.item )}>
          <div>
            <div>
              <h3 className="story-title">{this.props.item.story.title}</h3>
              <div>
                {this.props.item.tags.map( ( tag, index ) => {
                  return (
                    <span key={"tag_" + index} className="story-tag">{tag.name}</span>
                  );
                } )}
              </div>
            </div>
            <div className="story-sneek-peek">
              <div>
                <span>{!this.state.expanded && this.props.item.story.text.substring( 0, 100 ) + "..."}</span>
              </div>
              <div className="story-item-text-shadow"/>
            </div>
          </div>
          <div className="author-container">
            <h5>{this.props.item.author.username}</h5>
            <div/>
          </div>
        </div>
        {/*Delete unused code*/}       
      </div>
    );
  }
}

Story.propTypes = {
  item: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
};

class StoriesList extends React.Component {

  constructor( props ) {
    super( props );
    const tt = () => true;
    this.state = {
      loading: true,
      filters: [ tt, tt, tt, tt, tt ]
    };
    this.stories = [];
    this.refContainer = React.createRef();
    this.filter = this.filter.bind( this );
    this.addFilter= this.addFilter.bind(this);
    this.setFilters = this.setFilters.bind(this);
  }

  componentDidMount() {
    let parseData = ( response ) => {
      this.stories = response[ "results" ][ 0 ][ "data" ].map( ( item ) => {
        return {
          story: { ...item[ "row" ][ 0 ], id: item[ "row" ][ 3 ] },
          author: item[ "row" ][ 1 ],
          tags: item[ "row" ][ 2 ]
        };
      } );
    };

    axios.get( backurl + "/story" )
      .then( ( response ) => {
        parseData( response.data );
        this.setState( { loading: false } );

        (function animation( self ) {
          function doTimeOut( items, delay ) {
            if ( items.length === 0 ) {
              return;
            }
            setTimeout( () => {
              items.shift().classList.remove( "in-bottom" );
              doTimeOut( items, 100 );
            }, delay );
          }

          let itemList = Array.from( self.refContainer.current
            .getElementsByClassName( "story-item-container" ) );
          doTimeOut( itemList, 0 );
          setTimeout( () => self.refContainer.current && self.refContainer.current.classList.remove( "overflow-hidden" ), 1500 );
        })( this );
      } );
  }

  addFilter(i, filter){
    let temp = this.state.filters;
    temp[ i ] = filter;
    this.setState( { filters: temp } );
  }

  setFilters(filters){
    this.setState( { filters: filters } );
  }

  filter( item ) {
    return this.state.filters.every( ( f ) => {
      let f1 = f( item );
      console.log(f1);
      return f1;
    } );
  }

  render() {
    let to_render = (
      <div id="stories-container">
        <div className="img-stories"/>
      </div>
    );
    if ( !this.state.loading ) {
      to_render = (
        <div id="full-stories-container">
          <StoryFilter setFilters={this.setFilters} redirigirCrearHistoria={this.props.redirigirCrearHistoria}/>
          <div id="stories-container" className="stories-grid overflow-hidden" ref={this.refContainer}>
            {this.stories.filter( this.filter ).map( ( item, index ) => {
              console.log( item );
              return (
                <Story key={"story_" + index} item={item} {...this.props}/>
              );
            } )}
          </div>
        </div>
      );
    }
    return to_render;
  }
}

StoriesList.propTypes = {
  redirigirCrearHistoria: Proptypes.func
};

export class Stories extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/stories" component={( props ) => <StoriesList {...props}
          redirigirCrearHistoria={this.props.redirigirCrearHistoria}/>}/>
        <Route exact path="/stories/:id" component={( props ) => <StoryItem {...props}/>}/>
      </Switch>
    );
  }
}

Stories.propTypes = {
  history: Proptypes.object.isRequired,
  redirigirCrearHistoria: Proptypes.func
};
