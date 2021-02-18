import React from 'react';
import {Link} from 'react-router-dom';

class Splash extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div id="splash">
        <div id="feed-header">
          <div id="feed">
            <h2 id="top-header">Celebrate and honor</h2>
            <h1 id="main-header">Black Excellence</h1>
            <Link to="#browseEvents">Browse events</Link>
          </div>
        </div>
        <div id="feed-image">
          <img src={window.feedImage}/>
        </div>
      </div>
    );

  }
}

export default Splash; 