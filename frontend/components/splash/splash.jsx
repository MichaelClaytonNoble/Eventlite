import React from 'react';
import {Link} from 'react-router-dom';

class Splash extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      relevantEvents: this.props.events,
      popularIn: "Online Events"
    }
    this.props.getEvents("location", "ONLINE")
    .then( ()=>this.setState({relevantEvents: this.props.events})); 
    this.changeEventList = this.changeEventList.bind(this); 
  }
  componentDidMount(){
    this.props.getCategories(); 
    this.props.getEvents("location", "ONLINE"); 
    this.setState({})
  }
  changeEventList(e){
    this.props.clearEvents(); 
    let col = "category_id";
    let val, name = '';
    
    if(e.target.innerText === 'All'){
      col = "location";
      val = "ONLINE";
      name="Online Events";
    }
    else{
      let category = this.props.categories.filter(cat => {return cat.name === e.target.innerText})[0]
      val = category.id;
      name = category.name;
    }
    this.props.getEvents(col, val)
    .then( ()=>this.setState({relevantEvents: this.props.events, popularIn: name}));
  }

  render(){
    let categories, featured, featuredMessage = '';
    if(this.props.categories.length){
      categories = this.props.categories.map( (category,key) => {
        return <li key={key}>{category.name}</li>
      })
    }
    if(this.state.popularIn === 'Online Events'){
      featuredMessage = <h1>Events in {this.state.popularIn}</h1>;
      featured =
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
    }
    return(
      <div id="splash">
        <div id="feed-header">
          <div id="grey-box">
            <div id="feed">
                <h2 id="top-header" className="header">Connect through</h2>
                <h1 id="main-header"className="header">online events</h1>
              <Link to="#browseEvents" className="header link"><span>Browse events  →</span></Link>
            </div>
          </div>
            <div id="feed-image">
              <img src={window.feedImage}/>
            </div>
        </div>
        <div id="popular-events">
          <h1>Popular in {this.state.popularIn}</h1>
          <ul id="nav-bar" onClick={this.changeEventList}>
            <li>All</li>
            {categories}
          </ul>
          {featured}
        </div>
      
        <div id="relevant-events">
          {featuredMessage}
          <div id="event-grid">

          {
            this.state.relevantEvents.reverse().map( (event, i)=>{
              if(i<16){
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
      
        <button id="see-more-button">See more</button>
      </div>


    );

  }
}

export default Splash; 