
import React from 'react';


class CreateEventForm extends React.Component{
  constructor(props){
    super(props);
    let findTimezone = this.props.timezones.filter( timezone => {
      return timezone.locale === Intl.DateTimeFormat().resolvedOptions().timeZone;
    })
    this.state = {
      title: '', organizer: '', venue: '', recurring: 'false', category_id: 1, location: 'VENUE',
      start: '',
      end: '',
      timezone: findTimezone[0].zone,
    }

    this.disabled = false;
    this.getCurrentDateTime = this.getCurrentDateTime.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  convertDateToLocalAsJSON(date){
    return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON());
  }

  getCurrentDateTime(){
    return this.convertDateToLocalAsJSON(new Date()).slice(0,16);
  }

  handleInputChange(field){
    return (e)=>{
      this.setState({[field]: e.target.value});
    };
  }
  
  handleSubmit(e){
    //before submit change recurring into a boolean value 
    e.preventDefault(); 
    this.props.createEvent(this.state); 
  }

  handleRadioChange(field){
    return (e)=>{
      if(field === 'location'){
        this.disabled = true; 
        if(e.currentTarget.value === "VENUE"){
          this.state.venue = '';
          this.disabled = false;
        }
      }
      this.setState({[field]: e.currentTarget.value});
    }
  }
  
  handleTimezoneChange(){
    return (e)=>{
      this.setState({timezone: e.currentTarget.value});
    }
  }

  render(){

    return(

      <div id="create-event-form">

        <form id="create-event-info-form" onSubmit={this.handleSubmit}>

        <section className="info-section">
            <h1 id="create-event-header"><i className="far fa-edit create-event-form-icons"></i>Basic Info</h1>
        <p id="create-event-description">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique</p>

            <label className='large-input-label'><p>Event title</p>
              <input className="large-input" onChange={this.handleInputChange('title')} value={this.state.title}/>
            </label>  
            <label className='large-input-label'><p>Organizer</p>
            <input className="large-input"  onChange={this.handleInputChange('organizer')} value={this.state.organizer}/>
            </label>
            
            <select name="categories" id="categories">
              <option value="" >Category</option>
              <option value="music">Music</option>
            </select>
        </section>
        <hr />
        <section className="info-section">

            <h1 id="create-event-header"><i className="far fa-map create-event-form-icons"></i>Location</h1>
        <p id="create-event-description">Help people in the area discover your event and let attendees know where to show up.</p>
          
        <div id="create-event-radio-buttons">

          <input type="radio" id="VENUE" name="location" value="VENUE"  checked={this.state.location === 'VENUE'} 
                  onChange={this.handleRadioChange('location')}/>
          <label htmlFor="VENUE">Venue</label>
          <input type="radio" id="ONLINE" name="location" value="ONLINE" checked={this.state.location === 'ONLINE'} 
                  onChange={this.handleRadioChange('location')}/>
          <label htmlFor="ONLINE">Online event</label>
          <input type="radio" id="TBA" name="location" value="TBA" checked={this.state.location === 'TBA'} 
                  onChange={this.handleRadioChange('location')}/>
          <label htmlFor="TBA">To be announced</label>
        </div>

        <label className='large-input-label'><p>Venue address</p>
          <input type="text" className="large-input" value={this.state.venue} onChange={this.handleInputChange('venue')} disabled={this.disabled}/>
        </label>
        </section>

        <hr /> 
        <section className="info-section">

            <h1 id="create-event-header"><i className="far fa-calendar-alt create-event-form-icons"></i>Date and time</h1>
        <p id="create-event-description">Tell event-goers when your event starts and ends so they can make plans to attend.</p>

          <div id="create-event-radio-buttons">
            <input type="radio" id="single" name="recurring" value='false' checked={this.state.recurring === 'false'}
                  onChange={this.handleRadioChange('recurring')} />
            <label htmlFor="single">Single Event</label>
            <input type="radio" id="recurring" name="recurring" value='true' checked={this.state.recurring === 'true'} 
                  onChange={this.handleRadioChange('recurring')} />
            <label htmlFor="recurring">Recurring Events</label>
          </div>

        <div id='date-elements'>
          <label className="event-time"><p>Event starts</p>
            <input type="datetime-local" className="date-input" min={this.getCurrentDateTime()}
                onChange={this.handleInputChange('start')} />
          </label>
          <label className="event-time"><p>Event ends</p>
            <input type="datetime-local" className="date-input" min={this.getCurrentDateTime()} 
                onChange={this.handleInputChange('end')}/>
          </label>
        </div>

        <label id="timezone-label"><p>TimeZone</p>
          <select name="timezones" id="timezones" value={this.state.timezone} 
            onChange={this.handleInputChange('timezone')}>
          {
            this.props.timezones.map( (timezone, i) =>{
              return <option value={timezone.zone} key={i}>{timezone.zone}</option>
            })
          }
          </select>
        </label>

        </section>

        <div id="form-buttons">
          <button className="form-discard-button" type="reset">Discard</button>
          <button className="form-submit-button">Save & Continue</button>
        </div>
        </form>
      </div>
    )
  }
}

export default CreateEventForm; 