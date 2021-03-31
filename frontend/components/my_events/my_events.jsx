import React from 'react';

class MyEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      eventList: this.props.myEvents,
      loaded: false
    }
  }

  componentWillMount(){
    //load all my events here 
    this.props.getMyEvents().then(()=>{console.log('hello'); this.setState({loaded: true})});
  }

  componentDidMount(){
    //load all my events here 
    this.props.getMyEvents().then(()=>{console.log('hello'); this.setState({loaded: true})});
  }
  render(){
    if(this.state.loaded){
    let eventList = [];
    if(this.state.eventList){
      eventList = this.state.eventList.map( event=> {
        return(
          <li id="event-list-item">
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
    else{return null;}

  }
}

export default MyEvents;