import React from 'react';
import {Link} from 'react-router-dom';
class MyEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      eventList: this.props.myEvents
    }
  }

  componentWillMount(){
    this.props.getMyEvents();
  }

  render(){
    let eventList = [];
    let location;
    if(this.props.myEvents){
      eventList = this.props.myEvents.map( (event, key)=> {
        if(event.location === "ONLINE"){
          location = "Online event";
        }
        if(event.location ==="VENUE"){
          location = event.venue;
        }
        if(event.location ==="TBA"){
          location = "To be announced";
        }
        let img= <img id="event-icon" src={window.placeholder} alt="" />
        if(event.imageUrl){
          img = <img id="event-icon" src={event.imageUrl} alt="" />
        }
        return(
          <li id="event-list-item" key={key}>
            <div id="left">
              <div id="date">
                <span id="month">{new Date(event.start).toLocaleString('default', {month: 'short'}).toUpperCase()}</span>
                <span id="day">{new Date(event.start).getDate()}</span>
              </div>
              <div id="img-icon">{img}</div>
              <div id="details">
                <div id="title">{event.title}</div>
                <div>
                  <div id="location">{location}</div>
                  <div id="time">{event.start}</div>
                </div>
              </div>
            </div>
            <div id="right">
              <div id="stats">0/44
                <div id="progress"></div>
              </div>
              <div id="stats">$0.00</div>
              <div id="stats">Past</div>
              <input type="checkbox" id={"kebab-focus"+key} className="kebab-focus"></input>
              <label htmlFor={"kebab-focus" + key} id="kebab-wrap">
                <i className="fas fa-ellipsis-v kebab" id="kebab"></i>
                <ul className="kebab">
                  <li>HELLO</li>
                  <li>HELLO</li>
                  <li>HELLO</li>
                </ul>
              </label>
            </div>
          </li>
        )
      })
    }
      return(
        <div id="my-events">
          <section id="my-events-header">
            <div id="title-header">
              <span id="title">Events</span>
              <span id="create-event-button">
                <Link to="/events/create/"><button id="create-button" className="form-submit-button">Create Event</button></Link>
                </span>
            </div>
            <div id="search-header">
              <label id="search-events-input">
                <div id="search-icon"><i className="fas fa-search"></i></div>
                <input type="text" id="events-search" placeholder="Search events"></input>
              </label>
             
              <label id="select-status-input"><p>Event status</p>
                <select>
                  <option value="All">All</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Past">Past</option>
                </select>
              </label>
              <label id="select-organizer-input"><p>Organizer</p>
              </label>
            </div>
          </section>
          <section id="all-events">
            <div id="all-events-header">
              
            </div>
            <div id="events-list-header">
              <div id="left">
                <span id="heading">Event</span>
              </div>
              <div id="right">
                <span id="heading">Sold</span>
                <span id="heading">Gross</span>
                <span id="heading">Status</span>
              </div>
            </div>
            <ul id="events-list">
              {eventList}
            </ul>
          </section>
        </div>
      )
    }
}

export default MyEvents;