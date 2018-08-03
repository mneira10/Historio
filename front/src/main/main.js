import React from 'react';
import './resources/styles/main.css';
import { Stories } from '../story/story';

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

    render() {

        let to_render = (
            <div id="main" className="main-main">
                <div>
                    <div id="stories" className="main-side" onClick={this.optionClickHandler( 1 )}>
                        <div className="img-stories"/>
                        <h1>Stories</h1>
                    </div>
                    <div id="authors" className="main-side" onClick={this.optionClickHandler( 2 )}>
                        <div/>
                        <h1>Authors</h1>
                    </div>
                </div>
                <button id="main-account">
                    <i className="fas fa-user"/>
                </button>
            </div>
        );

        if ( this.state.option === 1 ) {
            to_render = <Stories />;
        }

        return (to_render);
    }
}
