import React, { Component } from "react";
import axio from "axios";
import {backurl} from "../App";
import { dateToString } from "../util";
import { Cookies, withCookies } from "react-cookie";
import { instanceOf } from "prop-types";
import {root} from "../App";
import "../main/resources/styles/main.css";
import "../story/resources/styles/story.css";
import "../story/resources/styles/filter.css";

class CreateStory extends Component {

  constructor( props ) {
    super( props );
    this.create = this.create.bind( this );
    this.story = {
      title: "",
      text: "",
      tags: []
    };
  }

  create() {
    axio.post( backurl + "/story", {
      padre: root,
      story: {
        title: this.story.title,
        text: this.story.text,
        date: dateToString( new Date( Date.now() ) ),
        modifiability: 2
      },
      author: {
        username: this.props.cookies.get( "historio-session-owner" ).username
      },
      tags: this.story.tags.trim().split( " " ).map( ( item ) => `#${item}` )
    } ).then( () => {

    } );
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", height: "100%", paddingTop: "30px", width: "100%" }}>
        <h1 style={{ textAlign: "center", color: "#212121", fontSize: "400%", margin: "0 0" }}>New Story</h1>
        <p style={{ color: "#212121", padding: "0 10%", fontSize: "200%", margin: "0 0" }}><b>Title</b></p>
        <input type="text"
          style={{
            margin: "1%  10%", fontSize: "200%", color: "#212121", backgroundColor: "transparent", border: "none",
            borderBottom: "2px solid #212121"
          }} placeholder="Your title goes here" onChange={( e ) => this.story.title = e.target.value}/>

        <div style={{ textAlign: "center", height: "60%" }}>
          <textarea style={{
            width: "80% ",
            height: "95%",
            color: "#212121",
            backgroundColor: "transparent",
            border: "2px solid #212121",
            fontSize: "150%"
          }} placeholder="Type your story here!" name="Your story" wrap="hard" onChange={( e ) => this.story.text = e.target.value}>
        
          </textarea>
        </div>

        <p style={{ color: "#212121", padding: "0 10%", fontSize: "200%", margin: "0 0" }}><b>Tags</b></p>
        <input type="text"
          style={{
            margin: "1%  10%",
            fontSize: "200%",
            color: "#212121",
            backgroundColor: "transparent",
            border: "none",
            width: "80%"
          }}
          placeholder="Tag your story with as many tags as you want! (separated by spaces and without #)"
          onChange={( e ) => this.story.tags = e.target.value}/>
        <div style={{ textAlign: "center" }}>
          <button id='submitButton' style={{backgroundColor:"grey",borderRadius:"10%",fontSize:'200%'}}  onClick={this.create} >Submit</button>
        </div>
      </div>
    );
  }
}

CreateStory.propTypes = {
  cookies: instanceOf( Cookies ).isRequired
};

export default withCookies( CreateStory );
