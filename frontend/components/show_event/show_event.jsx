
import React from 'react';
import Link from 'react-router-dom'; 

class ShowEvent extends React.Component{

  render(){
    return (
      <div id="event-show-wrap">

        <div id="event-show-overlay"></div>
        <div id="event-show">
          <div id="head">
            <div id="head-image"><img src={window.blackHM} /></div>
            <div id="head-description">
              <div id="date">APR 24</div>
              <div id="title">The 2nd Annual National Antiracist Book Festival</div>
              <div id="organizer">BU CENTER FOR antiracisc research</div>
              <div id="ticket-price">$10 - $250</div>
            </div>
            <div id="ticket">
              <div id="like">♡</div>
              <button id="buy-ticket-button">Tickets</button>
            </div>
            <div id="event-description">
              <div id="left">
                <div id="title"></div>
                <div id="about-title">About this Event</div>
                <div id="description">

                </div>
                <div id="ticket-message">Tickets are now on sale</div>
              </div>
            </div>
          </div>
          <div id="right">
            <div id="top">
              <div id="date-title" className="right-title">Date And Time</div>
              <div id="date">Sat, April 24, 2021</div>
              <div id="time">6:00 AM - 3:00PM PDT</div>
            </div>
            <div id="middle">
              <div id="location-title" className="right-title">Location</div>
              <div id="location"> Online Event</div>
            </div>
            <div id="bottom">
              <div id="refund-title" className="right-title">Refund Policy</div>
              <div id="refund">Contact the organizer to request a refund. Eventlite's fee is nonrefundable</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowEvent;
