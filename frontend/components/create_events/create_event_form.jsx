import React from 'react';

class CreateEventForm extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="create-event-form">
        <span id="basic-info-icon"> [] </span>
        <h1 id="create-event-header">Basic Info</h1>
        <p id="create-event-description">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique</p>
        <form id="create-event-info-form">

            <input id="large-input"
                  placeholder="Event Title"/>
            <br /><br /><br />
            <input id="large-input"
                  placeholder ="Organizer"/>
            
            <select name="categories" id="categories">
              <option value="music">Music</option>
            </select>
          
        </form>
      </div>
    )
  }
}

export default CreateEventForm; 