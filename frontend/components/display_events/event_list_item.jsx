import React from 'react';
import {withRouter} from 'react-router-dom'; 
import LikeButtonContainer from '../like_button/like_button_container';

const EventListItem = ({event, convertDateToLocalAsJSON, history, card, key}) => {

  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'};
  let start = (new Date(convertDateToLocalAsJSON(new Date(event.start))).toLocaleTimeString("en-US", options)); 
  let location = "Online"
  let followStatus = "unfollow";

  let img = window.placeholder
  if(card){img = <i className="far fa-image"></i>;}
  if(event.imageUrl){img = event.imageUrl}

  if(event.location === "VENUE"){
    location = event.venue;
  }
  if(event.location === "TBA"){
    location = "To be announced"; 
  }
  if(card){
    if(event.imageUrl){
      img = <img src={event.imageUrl} alt="event" />
    }
    return (<div id={key} key={key} className="event-cell" onClick={()=>history.push(`/events/${event.id}`)}>
            <span id="image">{img}</span>
            <span id="title"><p>{event.title}</p></span>
            <span id="start">{start}</span>
            <LikeButtonContainer eventId={event.id} />
    </div>)
  }


  return (
    <li>
      <div id="events-left">
        <div id="title-wrap" onClick={()=>history.push(`/events/${event.id}`)}><div id="title">{event.title}</div></div>
        <div id="start">{start}</div>
        <div id="location">{location}</div>
      </div>
      <div id="events-right">
        <div id="event-img" onClick={()=>history.push(`/events/${event.id}`)}><img src={img} alt="event-img" /></div>
        <LikeButtonContainer eventId={event.id} />
      </div>
    </li>
  )
};
export default withRouter(EventListItem);
