

import React from 'react';

class EventList extends React.Component(){

  constructor(props){
    super(props);
    
  }

  render(){
    let eventsList = this.createEventsList();
    if(!eventsList.length && !this.state.loading){
      return <p id="no-events-message">Please select another filter</p>
    };
    return (
      <ul id="events-list">
        <div id="border"><hr /></div>
            {eventsList}
      </ul>
    )
  }

}


createEventsList(){
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'};

    if(!this.state.events){return []}
    return this.state.events.map( (event, key) => {
      let start = (new Date(this.convertDateToLocalAsJSON(new Date(event.start))).toLocaleTimeString("en-US", options)); 
      let img = window.placeholder
      let location = "Online"
      let followStatus = "unfollow";
      if(this.state.follows.includes(event.id)){
        followStatus = "follow";
      }
      let toggleFollow = <div id="like-button" className={followStatus}
                            onClick={this.toggleFollow(event.id)}>♥</div>
      if(event.imageUrl){img = event.imageUrl}
      if(event.location === "VENUE"){
        location = event.venue;
      }
      if(event.location === "TBA"){
        location = "To be announced"; 
      }

      return <li key={key}>
        <div id="events-left">
          <div id="title-wrap" onClick={()=>this.props.history.push(`/events/${event.id}`)}><div id="title">{event.title}</div></div>
          <div id="start">{start}</div>
          <div id="location">{location}</div>
        </div>
        <div id="events-right">
          <div id="event-img" onClick={()=>this.props.history.push(`/events/${event.id}`)}><img src={img} alt="event-img" /></div>
          {toggleFollow}
        </div>
      </li>
    });
  }