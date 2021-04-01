import React from 'react';

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
    if(this.props.myEvents){
      eventList = this.props.myEvents.map( (event, key)=> {
        return(
          <li id="event-list-item" key={key}>
            {event.date}
            {event.title}
            
          </li>
        )
      })
    }
      return(
        <div id="my-events">
          <section id="my-events-header">
            <div id="title-header">
              <span id="title">Events</span>
              <span id="create-event-button"><button className="form-submit-button">Create Event</button></span>
            </div>
            <div id="search-header"></div>
          </section>
          <section id="all-events">
            <div id="all-events-header">
              
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