import React from 'react';

class CreateEventForm extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="create-event-form">
        <form id="create-event-info-form">

        <section className="info-section">
        <h1 id="create-event-header">Basic Info</h1>
        <p id="create-event-description">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique</p>

            <input className="large-input"
                  placeholder="Event Title"/>
            <input className="large-input"
                  placeholder ="Organizer"/>
            
            <select name="categories" id="categories">
              <option value="" >Category</option>
              <option value="music">Music</option>
            </select>
        </section>
        <section className="info-section">

        <h1 id="create-event-header">Location</h1>
        <p id="create-event-description">Help people in the area discover your event and let attendees know where to show up.</p>
          
        <div id="location-radio-buttons">

          <input type="radio" id="VENUE" name="location" value="VENUE" />
          <label htmlFor="VENUE">Venue</label>
          <input type="radio" id="ONLINE" name="location" value="ONLINE" />
          <label htmlFor="ONLINE">Online event</label>
          <input type="radio" id="TBA" name="location" value="TBA" />
          <label htmlFor="TBA">To be announced</label>
        </div>

        <input type="text" className="large-input"
            placeholder="Venue Address" />
        </section>
        <section className="info-section">

        </section>
        <h1 id="create-event-header">Date and time</h1>
        <p id="create-event-description">Tell event-goers when your event starts and ends so they can make plans to attend.</p>

        
        </form>
      </div>
    )
  }
}

export default CreateEventForm; 