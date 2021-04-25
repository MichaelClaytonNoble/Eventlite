import React from 'react';
import {withRouter} from 'react-router-dom'; 
import LikeButtonContainer from '../like_button/like_button_container';

const EventListItem = ({event, convertDateToLocalAsJSON, history, following}) => {

  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'};
  let start = (new Date(convertDateToLocalAsJSON(new Date(event.start))).toLocaleTimeString("en-US", options)); 
  let img = window.placeholder
  let location = "Online"
  let followStatus = "unfollow";


  if(event.imageUrl){img = event.imageUrl}
  if(event.location === "VENUE"){
    location = event.venue;
  }
  if(event.location === "TBA"){
    location = "To be announced"; 
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
