import React from 'react';
import {Link} from 'react-router-dom';

class Splash extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      relevantEvents: this.props.events
    }
    this.props.getEvents("location", "ONLINE")
    .then( ()=>this.setState({relevantEvents: this.props.events})); 
  }
  componentDidMount(){
 
    this.props.getEvents("location", "ONLINE"); 
    this.setState({})
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
        <div id="popular-events">
          <h1>Popular in Online Events</h1>
          <ul id="nav-bar">
            <li>Today</li>
            <li>This weekend</li>
            <li>Black History Month</li>
            <li>Free</li>
            <li>Music</li>
            <li>Food & Drink</li>
            <li>Charity & Causes</li>
          </ul>
          <div id="featured-icon"></div>
          <div id="favorite-collections">
            <div id="header">
              <span id="left">
                <h2>Our favorite collections</h2>
                <p>Browse through some of the best collections in Online Events hand picked by people who know the area best.</p>
              </span>
              <span id="right">
                  <span></span>
                  <span id="buttons">

                  <button id="left-arrow">←</button>
                  <button id="right-arrow">→</button>
                </span>
              </span>
            </div>
            <div id="content">
              <div id="summary">
                <h2>Educate Yourself: Online Racial Equity Workshops</h2>
                <p>
                  Black History Month is a time for celebrating Black achievement. Black History Month is a time is celebrate and remember important people that are a part of this African diaspora. Come celebrate our brothers by learning and participating in one of many racial equity and history workshops. 
                </p>
                <button>View Upcoming Events</button>
              </div>
                <img src={window.blackHM}/>

            </div>


          </div>
        </div>
      
        <div id="relevant-events">
          <h1>Events in Online Events</h1>
          <div id="event-grid">

          {
            
            this.state.relevantEvents.reverse().map( (event, i)=>{

              if(i<8){
                let img=<i className="far fa-image"></i>;
                if(event.imageUrl){
                  img = <img src={event.imageUrl} alt="" />
                }
                return(
                  <div id={i}key={i}>
                  <span id="image">{img}</span>
                  <span id="start">{new Date(event.start).toGMTString()}</span>
                  <span id="title"><p>{event.title}</p></span>
                </div>
              )
            }
          })
        }
        </div>

        </div>
      </div>


    );

  }
}

export default Splash; 