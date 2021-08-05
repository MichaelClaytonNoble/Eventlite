import React, { useEffect, useState } from "react";
import ModalContainer from "../modals/modal_container";
import TicketModalContainer from "../modals/ticket_modal_container";
import LikeButtonContainer from "../like_button/like_button_container";
import { convertDateToLocalAsJSON } from "../../helpers/helper";
import Carousel from "../display_events/carousel"; 
const ShowEvent = (props) => {
  let [modal, setModal] = useState("");
  let [load, setLoad] = useState(''); 
  useEffect(() => {
    setModal(props.modal);
  }, [props.modal]);

  useEffect(() => {
    window.scrollTo(0,0); 
    props.clearEvents();
    props.getEvent();

    props.clearTickets();
    props.getTickets();

    if( !props.follows.length ) props.getFollows();
    setLoad(true); 
  }, []);

  useEffect( ()=> {
    if (props.event) props.getRelevantEvents(props.event.category_id);
    
  }, [load]);

  if (!props.event) return null;
  let dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  let timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  let startDate = new Date(
    convertDateToLocalAsJSON(new Date(event.start))
  ).toLocaleTimeString("default", dateOptions);
  let endDate = new Date(
    convertDateToLocalAsJSON(new Date(event.end))
  ).toLocaleTimeString("default", dateOptions);
  let startTime = new Date(
    convertDateToLocalAsJSON(new Date(event.start))
  ).toLocaleTimeString("default", timeOptions);
  let endTime = new Date(
    convertDateToLocalAsJSON(new Date(event.end))
  ).toLocaleTimeString("default", timeOptions);
  let month = new Date(
    convertDateToLocalAsJSON(new Date(event.start))
  ).toLocaleDateString("en-EN", { month: "short" });
  let day = new Date(
    convertDateToLocalAsJSON(new Date(event.start))
  ).toLocaleDateString("en-EN", { day: "numeric" });

  return (
    <div id="event-show-wrap">
      {modal === "ticketMenu" ? (
        <TicketModalContainer event={props.event} tickets={props.tickets} />
      ) : (
        <ModalContainer />
      )}
      <div id="event-show-overlay-overlay"></div>
      <div id="event-show-overlay">
        <img src={props.event.imageUrl} alt="blurred"></img>
      </div>
      <div id="event-show">
        <div id="head">
          <div id="head-image">
            <img src={props.event.imageUrl} alt="img"></img>
          </div>
          <div id="head-description">
            <div id="date">
              <div id="month">{props.event.month}</div>
              <div id="day">{props.event.day}</div>
            </div>
            <div id="title-wrap">
              <div id="title">{props.event.title}</div>
              <div id="organizer">by {props.event.organizer}</div>
            </div>
            <div id="ticket-price">$10 - $250</div>
          </div>
        </div>
        <div id="ticket">
          <div id="like">
            <LikeButtonContainer eventId={props.event.id} />
          </div>
          <span>
            <div id="ticket-price-sticky">$10 - $250</div>
            <button onClick={props.openTicketModal} id="buy-ticket-button">
              Tickets
            </button>
          </span>
        </div>
        <div id="event-description">
          <div id="left">
            <div id="title"></div>
            <div id="about-title">About this Event</div>
            <div id="description">{props.event.description}</div>
            <div id="ticket-message">Tickets are now on sale</div>
          </div>

          <div id="right">
            <div id="top">
              <div id="date-title" className="right-title">
                Date And Time
              </div>
              <div id="date">{startDate}</div>
              <div id="time">{startTime}</div>
              <br />
              <div id="date-title" className="right-title">
                until
              </div>
              <br />
              <div id="date">{endDate}</div>
              <div id="time">{endTime}</div>
            </div>
            <div id="middle">
              <div id="location-title" className="right-title">
                Location
              </div>
              <div id="location"> Online Event</div>
            </div>
            <div id="bottom">
              <div id="refund-title" className="right-title">
                Refund Policy
              </div>
              <div id="refund">
                Contact the organizer to request a refund. Eventlite's fee is
                nonrefundable
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.relevantEvents ? <Carousel events={props.relevantEvents}/> : ''}
    </div>
  );
};

export default ShowEvent;
