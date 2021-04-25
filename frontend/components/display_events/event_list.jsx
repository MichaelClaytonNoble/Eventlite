import React from 'react';
import EventListItem from './event_list_item';



class EventList extends React.Component{

  constructor(props){
    super(props);
    
  }

  createEventsList(){
    if(!this.props.events){return [];}
    return this.props.events.map( (event, key) => {
      return <EventListItem event={event} key={key} convertDateToLocalAsJSON={this.props.convertDateToLocalAsJSON}/>
    })
  }
  render(){
    const eventsList = this.createEventsList();
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
  