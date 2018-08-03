import React from 'react';
import ReactDOM from 'react-dom';
import Proptypes from 'prop-types';
import '../main/resources/styles/main.css';
import './resources/styles/story.css';
import axios from 'axios';

export class Story extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { expanded: false };
        this.clickHandler = this.clickHandler.bind( this );
    }

    clickHandler() {
        this.setState( { expanded: !this.state.expanded } );
    }

    render() {
        return (
            <div className="story-item-container in-bottom">
                <div className="story-item" onClick={this.clickHandler}>
                    <div>
                        <div>
                            <h3 className="story-title">{this.props.item.story.title}</h3>
                            <div>
                                {this.props.item.tags.map( ( tag, index ) => {
                                    return (
                                        <span key={'tag_' + index} className="story-tag">{tag}</span>
                                    );
                                } )}
                            </div>
                        </div>
                        <div className="story-sneek-peek">
                            <div>
                                <span>{!this.state.expanded && this.props.item.story.text.substring( 0, 100 ) + '...'}</span>
                            </div>
                            <div className="story-item-text-shadow"/>
                        </div>
                    </div>
                    <div className="author-container">
                        <h5>{this.props.item.author.username}</h5>
                        <div/>
                    </div>
                </div>
                <div className={'story-item-extend ' + (this.state.expanded ? 'expanded' : '')}>
                    {this.state.expanded && <p>{this.props.item.story.text}</p>}
                </div>
            </div>
        );
    }
}

Story.propTypes = {
    item: Proptypes.object.isRequired
};

const backurl = 'http://neo4jbig8575.cloudapp.net:8080/story';

export class Stories extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: true
        };
        this.stories = [];
        this.refContainer = React.createRef();
    }

    componentDidMount() {

        let parseData = ( response ) => {
            this.stories = response[ 'results' ][ 0 ][ 'data' ].map( ( item ) => {
                return {
                    story: item[ 'row' ][ 0 ],
                    author: item[ 'row' ][ 1 ],
                    tags: item[ 'row' ][ 2 ]
                };
            } );
        };

        axios.get( backurl )
             .then( ( response ) => {
                 parseData( response.data );
                 this.setState( { loading: false } );

                 (function animation( self ) {
                     function doTimeOut( items, delay ) {
                         if ( items.length === 0 ) {
                             return;
                         }
                         setTimeout( () => {
                             items.shift().classList.remove( 'in-bottom' );
                             doTimeOut( items, 100 );
                         }, delay );
                     }

                     let itemList = Array.from( ReactDOM.findDOMNode( self.refContainer.current )
                                                        .getElementsByClassName( 'story-item-container' ) );
                     doTimeOut( itemList, 0 );
                     setTimeout( () => self.refContainer.current.classList.remove( 'overflow-hidden' ), 1500 );
                 })( this );
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
                    <div id="stories-sidebar">
                        <div>
                            <input/>
                        </div>
                    </div>
                    <div id="stories-container" className="stories-grid overflow-hidden" ref={this.refContainer}>
                        {this.stories.map( ( item, index ) => {
                            return (
                                <Story key={'story_' + index} item={item}/>
                            );
                        } )}
                    </div>
                </div>
            );
        }
        return (to_render);
    }
}
