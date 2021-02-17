import { get } from 'lodash';
import React from 'react';

class CreateEventForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: '', organizer: '', venue: '', recurring: false, category_id: 1, location: 'VENUE',
      start: this.getCurrentDateTime(),
      end: this.getCurrentDateTime(),
      timezone: '',
    }
    this.disabled = true;
    // let d = this.getLocale(new Date())
    // console.log(d.toJSON());
    // console.log(new Date()); 
    this.getCurrentDateTime = this.getCurrentDateTime.bind(this); 
  }

  convertDateToLocalAsJSON(date){
    return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON());
  }

  getCurrentDateTime(){
    return this.convertDateToLocalAsJSON(new Date()).slice(0,16);
  }

  //changes the start and end datetime objects into their respective locale 
  // getLocale(date, locale){
  //   this.setState({
  //     start: 
  //   }};
  //   return new Date(date.toLocaleString("en-US", { timeZone: locale}));
  // }

  handleInputChange(field){
    return (e)=>{
      this.setState({[field]: e.target.value});
    };
  }
  
  handleSubmit(){
    //before submit change recurring into a boolean value 
  
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
      if(field === 'recurring'){
      
      }
      this.setState({[field]: e.currentTarget.value});
    }
  }


  render(){

    let locationOption = '';
    return(
      <div id="create-event-form">
        <form id="create-event-info-form">

        <section className="info-section">
        <h1 id="create-event-header">Basic Info</h1>
        <p id="create-event-description">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique</p>

            <input className="large-input" onChange={this.handleInputChange('title')} value={this.state.title}
                  placeholder="Event Title"/>
            <input className="large-input"  onChange={this.handleInputChange('organizer')} value={this.state.organizer}
                  placeholder ="Organizer"/>
            
            <select name="categories" id="categories">
              <option value="" >Category</option>
              <option value="music">Music</option>
            </select>
        </section>
        <section className="info-section">

        <h1 id="create-event-header">Location</h1>
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

        <input type="text" className="large-input" value={this.state.venue} onChange={this.handleInputChange('venue')}
            placeholder="Venue Address" disabled={this.disabled}/>
        </section>
        <section className="info-section">

        <h1 id="create-event-header">Date and time</h1>
        <p id="create-event-description">Tell event-goers when your event starts and ends so they can make plans to attend.</p>

          <div id="create-event-radio-buttons">
            <input type="radio" id="single" name="recurring" value='false' checked={this.state.recurring === 'false'}
                  onChange={this.handleRadioChange('recurring')} />
            <label htmlFor="single">Single Event</label>
            <input type="radio" id="recurring" name="recurring" value='true' checked={this.state.recurring === 'true'} 
                  onChange={this.handleRadioChange('recurring')} />
            <label htmlFor="recurring">Recurring Events</label>
          </div>

        <label className="event-time">Event starts<br /> 
          <input type="datetime-local" className="date-input" min={this.getCurrentDateTime()}
              onChange={this.handleInputChange('start')} />
        </label>
        <label className="event-time">Event ends<br />
          <input type="datetime-local" className="date-input" min={this.getCurrentDateTime()} 
              onChange={this.handleInputChange('end')}/>
        </label>

        <select name="timezones" id="timezones">
          {
            this.props.timezones.map( (timezone, i) =>{
              return <option value={timezone} key={i}>{timezone.zone}</option>
            })
          }
        </select>

        </section>
        </form>
      </div>
    )
  }
}

export default CreateEventForm; 