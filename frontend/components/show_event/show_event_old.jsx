
import React from 'react';
import Carousel from '../display_events/carousel';
import TicketModalContainer from '../modals/ticket_modal_container'; 
import ModalContainer from '../modals/modal_container';
import LikeButtonContainer from '../like_button/like_button_container';

class ShowEvent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      event: this.props.event,
      relevantEvents: this.props.relevantEvents
    }
    this.path= this.props.history.location.pathname
         window.scrollTo(0, 0);

  }
  componentDidUpdate(prevProps){

    if(this.props.event){
      if(this.path !== this.props.history.location.pathname){
        window.scrollTo(0, 0);
        this.path = this.props.history.location.pathname;
        this.props.clearTickets();
        this.props.getTickets();
        this.props.getRelevantEvents(this.props.event.creator_id).then( (e)=>{
          this.setState({event: this.props.event, relevantEvents: this.props.relevantEvents});
        })
      }
    }
  }

  componentWillMount(){
    this.props.clearTickets();
    this.props.getTickets();
    this.props.clearEvents();
    this.props.getFollows();
    this.props.getEvent()
      .then( ()=> {
        this.props.getRelevantEvents(this.props.event.category_id)
        .then( ()=>{
          this.setState({event: this.props.event, relevantEvents: this.props.relevantEvents})
        })
    });

  }

   convertDateToLocalAsJSON(date){
    return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON());
  }

  getCurrentDateTime(){
    return this.convertDateToLocalAsJSON(new Date()).slice(0,16);
  }

  render(){
    let modal = '';
    if(this.props.modal){
      modal = <ModalContainer />
    }
    if(this.props.modal === 'ticketMenu'){
      modal = <TicketModalContainer event={this.props.event}tickets={this.props.tickets}/>
    }
    var dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};
    var timeOptions = {hour: 'numeric', minute: 'numeric', hour12: true }
    let img, month, day, title, organizer, description = '';
    let startDate, endDate, startTime, endTime = '';
    let event = this.state.event;
    let eventId = '';
    let date = new Date();
    if(this.state.event){
      eventId = event.id;
      img = <img src={event.imageUrl} alt='blurred'></img>
      startDate = (new Date(this.convertDateToLocalAsJSON(new Date(event.start))).toLocaleTimeString("default", dateOptions)); 
      endDate = (new Date(this.convertDateToLocalAsJSON(new Date(event.end))).toLocaleTimeString("default", dateOptions)); 
      startTime = (new Date(this.convertDateToLocalAsJSON(new Date(event.start))).toLocaleTimeString("default", timeOptions)); 
      endTime = (new Date(this.convertDateToLocalAsJSON(new Date(event.end))).toLocaleTimeString("default", timeOptions)); 
      month = new Date(this.convertDateToLocalAsJSON(new Date(event.start))).toLocaleDateString('en-EN', {month: 'short'});
      day = new Date(this.convertDateToLocalAsJSON(new Date(event.start))).toLocaleDateString('en-EN', {day: 'numeric'});
      title = event.title;
      if (event.organizer){
        organizer = 'by '+event.organizer;
      }
      description = event.description;
    }
    
    return (
      <div id="event-show-wrap">
        {modal}

        <div id="event-show-overlay-overlay"></div>
        <div id="event-show-overlay">{img}</div>
        <div id="event-show">
          <div id="head">
            <div id="head-image">{img}</div>
            <div id="head-description">
              <div id="date"><div id="month">{month}</div><div id="day">{day}</div></div>
              <div id="title-wrap">
                <div id="title">{title}</div>
                <div id="organizer">{organizer}</div>
              </div>
              <div id="ticket-price">$10 - $250</div>
            </div>
          </div>
          <div id="ticket">
            <div id="like"><LikeButtonContainer eventId={eventId}/></div>
            <span>
              <div id='ticket-price-sticky'>$10 - $250</div>
              <button onClick={this.props.openTicketModal} id="buy-ticket-button">Tickets</button>
            </span>
          </div>
          <div id="event-description">
            <div id="left">
              <div id="title"></div>
              <div id="about-title">About this Event</div>
              <div id="description">{description}</div>
              <div id="ticket-message">Tickets are now on sale</div>
            </div>

            <div id="right">
              <div id="top">
                <div id="date-title" className="right-title">Date And Time</div>
                <div id="date">{startDate}</div>
                <div id="time">{startTime}</div>
                <br />
                <div id="date-title" className="right-title">until</div>
                <br />
                <div id="date">{endDate}</div>
                <div id="time">{endTime}</div>
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
        <Carousel events={this.state.relevantEvents}/>
      </div>

    )
  }
}

export default ShowEvent;
