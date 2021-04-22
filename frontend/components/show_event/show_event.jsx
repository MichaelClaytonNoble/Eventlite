
import React from 'react';
import Link from 'react-router-dom'; 



class ShowEvent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      event: this.props.event,
      relevantEvents: this.props.relevantEvents,
      loading: true
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.event){
      if(this.state.event !== this.props.event && this.state.loading){
        this.props.getRelevantEvents(this.props.event.creator_id).then( (e)=>{
          console.log('ehou',e);
          this.setState({event: this.props.event, relevantEvents: this.props.relevantEvents, loading: false});
        })
      }
  }
  }

  componentWillMount(){
    this.props.clearEvents()

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

  createCarousel(){

    return this.state.relevantEvents.map( (event,key) => {
      let online = '';
      if(event.location ==='ONLINE'){
        online = <div className="online-sticker">Online</div>
      }
      return (
      <div  key={key}className="carousel-cell" onClick={()=>{this.setState({loading: true});this.props.history.push(`/events/${event.id}`)}}>
        <img src={event.imageUrl} alt="carousel" />
        <div className="info">
          <div className="date-time">
            {event.start}
          </div>
          <div className ="title">
            {event.title}
          </div>
          {online}
        </div>

      </div>)
    });
  }
  moveCarousel(direction){
    this.props.history.location.pathname;
    return (e)=>{
      let element = document.getElementById('carousel-child');

      let left = window.getComputedStyle(element,null).getPropertyValue('left').replace(/[^-\d\.]/g, '');
      let width = window.getComputedStyle(element,null).getPropertyValue('width').replace(/[^-\d\.]/g, '');
      left = parseInt(left);
      let cellWidth = (parseInt(width)*.3 + parseInt(width)*.01);
      width = (cellWidth*this.state.relevantEvents.length-parseInt(width))*-1;
      if(direction ==='left'){
        left += cellWidth;
        if(left > 0){left = 0;}
      }
      if(direction ==='right'){
        left -= cellWidth;
        if(left < width){
          left=width;
        }
      }
      element.style.left = left.toString()+'px';
    }
  }

  render(){
    var dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};
    var timeOptions = {hour: 'numeric', minute: 'numeric', hour12: true }
    let img, month, day, title, organizer, description = '';
    let startDate, endDate, startTime, endTime = '';
    let event = this.state.event;
    let date = new Date();
    if(this.state.event){
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
            <div id="like">♡</div>
            <span>
              <div id='ticket-price-sticky'>$10 - $250</div>
              <button id="buy-ticket-button">Tickets</button>
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

        <div id="carousel-wrap">
          <div id="title">Other Events You May Like</div>
          <div id="carousel">
            <div id="chevron-right" onMouseDown={this.moveCarousel('right')}><img className="chevron" src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"/></div>
            <div id="chevron-left" onMouseDown={this.moveCarousel('left')}><img className="chevron" src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png"/></div>
            <div id="carousel-child">{this.createCarousel()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowEvent;
