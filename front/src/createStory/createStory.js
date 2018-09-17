import React, { Component } from 'react'

export class CreateStory extends Component {

  


  render() {
    return (
      <div style={{backgroundColor:"#455059",height:"100%",paddingTop:"30px",width:"100%"}}>
        <h1 style={{textAlign:'center',color:"white",fontSize:"400%",margin:'0 0'}}>New Story</h1>
        <p style={{color:"white",padding:"0 10%", fontSize:"200%",margin:"0 0"}}><b>Title</b></p>
        <input type="text" 
        style={{margin:"1%  10%", fontSize:"200%",color:"white",backgroundColor:"transparent", border: 'none',
    borderBottom: '2px solid white'}} placeholder="Your title goes here" />
        

        <div style={{textAlign:'center',height:"60%"}}>
        <textarea style={{width:"80% ",height:"95%",color:'white',backgroundColor:'transparent',border:'2px solid white',fontSize:'150%'}} name="Your story" wrap="hard">
        Type your story here! 
        </textarea>
        </div>
        
        <p style={{color:"white",padding:"0 10%", fontSize:"200%",margin:"0 0"}}><b>Tags</b></p>
        <input type="text" 
        style={{margin:"1%  10%", fontSize:"200%",color:"white",backgroundColor:"transparent", border: 'none', width:"80%"}} 
        placeholder="Tag your story with as many tags as you want! (separated by spaces and without #)" />
        <div style={{textAlign:'center'}}>
        <button>Submit!</button>
        </div>
      </div>
    )
  }
}
