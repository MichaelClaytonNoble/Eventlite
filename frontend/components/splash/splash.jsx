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
          <div id="grey-box"></div>
          <div id="feed">
              

              <h2 id="top-header" className="header">Celebrate and honor</h2>
              <h1 id="main-header"className="header">Black Excellence</h1>
            <Link to="#browseEvents" className="header link"><span>Browse events  →</span></Link>

          </div>
          <div id="feed-image">
            <img src={window.feedImage}/>
          </div>
        </div>
        
      </div>
    );

  }
}

export default Splash; 