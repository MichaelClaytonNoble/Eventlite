import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import EventList from '../display_events/event_list';
import LikeButtonContainer from '../like_button/like_button_container';

class Splash extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      relevantEvents: this.props.events,
      popularIn: "Online Events",
      featuredCollections: this.props.featuredCollections,
      currentCollection: 0,
      follows: this.props.follows
    }

    this.changeEventList = this.changeEventList.bind(this); 
    this.changeFeaturedCollections = this.changeFeaturedCollections.bind(this);
    this.createFeaturedCollection = this.createFeaturedCollection.bind(this); 
  }
  componentDidMount(){
    this.props.getCategories(); 
    if(this.props.myId){this.props.clearMyEvents(this.props.myId)};
    this.props.getFeaturedCollections()
    .then( ()=>this.setState({featuredCollections: this.props.featuredCollections})); 
    this.props.getEvents("location", "ONLINE")
    .then( ()=>this.setState({relevantEvents: this.props.events})); 
  }
  componentWillMount(){
    this.props.getFollows().then( ()=>this.setState({follows: this.props.follows}));
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

  changeFeaturedCollections(direction){
    return (e)=>{
  
      let currentCollection = this.state.currentCollection;
      if(direction === "forward"){
        if(this.state.currentCollection < this.state.featuredCollections.length-1){
          currentCollection+=1;
          this.updateArrows(currentCollection);
          this.setState({currentCollection: currentCollection});
        }
      }
      if(direction === "backward"){
        if(this.state.currentCollection > 0){
          currentCollection-=1;
          this.updateArrows(currentCollection);
          this.setState({currentCollection: currentCollection});
        }
      }
    }
  }
  updateArrows(currentCollection){
    if(currentCollection-1 < 0){
      document.getElementById('left-arrow').classList.add('endArrow');
      document.getElementById('left-arrow').classList.remove('forwardArrow');
    }
    else{
      document.getElementById('left-arrow').classList.add('forwardArrow');
      document.getElementById('left-arrow').classList.remove('endArrow');
      
    }
    if(currentCollection+1 >= this.state.featuredCollections.length){
      document.getElementById('right-arrow').classList.add('endArrow');
      document.getElementById('right-arrow').classList.remove('forwardArrow');
    }
    else{
      document.getElementById('right-arrow').classList.add('forwardArrow');
      document.getElementById('right-arrow').classList.remove('endArrow');
    }
  }
  createFeaturedCollection(){
    if(this.state.featuredCollections.length===0){
      return (<div></div>);
    }
    let collection = this.state.featuredCollections[this.state.currentCollection];
    return (
      <div id="content">
        <div id="content-background"></div>
        <div id="summary">
          <h2><img id="collections-icon" src="https://cdn.evbuc.com/images/100912392/438776807040/1/original.20200513-210241" alt="creator" />{collection.title}</h2>
          <p>{collection.description}</p>
        </div>
          <img src={collection.imageUrl}/>
      </div>
    )
  }
  convertDateToLocalAsJSON(date){
    return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON()).slice(0,16);
  }

  getCurrentDateTime(){
    return this.convertDateToLocalAsJSON(new Date()).slice(0,16);
  }

  toggleFollow(eventId){
    return (e)=>{
      e.stopPropagation();
      if(this.state.follows.includes(eventId)){
        delete this.state.follows[this.state.follows.indexOf(eventId)];
        this.props.unfollow(eventId).then( ()=> this.state.follows = this.props.follows);
        e.currentTarget.classList.remove('follow');
        e.currentTarget.classList.add('unfollow');
      }
      else{
        this.props.follow(eventId).then( ()=>this.state.follows = this.props.follows);
        e.currentTarget.classList.remove('unfollow');
        e.currentTarget.classList.add('follow'); 
      }
    }
  }

  render(){
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'};

    let categories, featured, featuredMessage, followStatus = '';
    let relevantEvents = this.state.relevantEvents;
    if(this.props.categories.length){
      categories = this.props.categories.map( (category,key) => {
        return <li key={key}>{category.name}</li>
      })
    }
    if(this.state.popularIn === 'Online Events'){
      relevantEvents=relevantEvents.sort((a,b)=>new Date(a.start) - new Date(b.start));
      featuredMessage = <h1>Events in {this.state.popularIn}</h1>;
      featured =
          <div id="favorite-collections">
            <div id="header">
              <span id="left">
                <h2>Our favorite collections</h2>
                <p>Browse through some of the best collections in Online Events hand picked by people who know the area best.</p>
              </span>
              <span id="right">
                  {/* <span></span> */}
                  <span id="buttons">
                    <button className="endArrow"id="left-arrow" onClick={this.changeFeaturedCollections("backward")}>←</button>
                    <button className="forwardArrow" id="right-arrow" onClick={this.changeFeaturedCollections("forward")}>→</button>
                  </span>
              </span>
            </div>
            {this.createFeaturedCollection()}

          </div>
    }
    return(
      <div id="splash">
        <div id="feed-header">
          <div id="grey-box">
            <div id="feed">
                <h2 id="top-header" className="header">Connect through</h2>
                <h1 id="main-header"className="header">online events</h1>
              <Link to="/events/browse" className="header link"><span>Browse events  →</span></Link>
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
            <EventList events={relevantEvents.slice(0,17)} card={true} />
   
        </div>
        <button id="see-more-button" onClick={()=>this.props.history.push(`/events/browse/${this.state.popularIn}`)}>See more</button>
      </div>
    );
  }
}

export default withRouter(Splash); 