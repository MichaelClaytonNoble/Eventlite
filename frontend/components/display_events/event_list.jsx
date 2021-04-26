import React from 'react';
import EventListItem from './event_list_item';



class EventList extends React.Component{

  constructor(props){
    super(props);
    
  }
  convertDateToLocalAsJSON(date){
    return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON()).slice(0,16);
  }
  createEventsList(){
    if(!this.props.events){return [];}
    return this.props.events.map( (event, key) => {
      return <EventListItem card={this.props.card} 
            event={event} key={key} carousel={this.props.carousel}
            convertDateToLocalAsJSON={this.convertDateToLocalAsJSON}/>
    })
  }
  render(){
    const eventsList = this.createEventsList();

    if(this.props.carousel){
      return eventsList
    }
    if(this.props.card){
      return (
        <div id="event-grid">
          {eventsList}
        </div>
      )
    }

    
    if(!eventsList.length){
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

export default EventList;
  