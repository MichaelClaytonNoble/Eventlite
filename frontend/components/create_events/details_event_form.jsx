import React from 'react';
 
class DetailsEventForm extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      id: this.props.match.params.eventId,
      description: '',
      about: ''
    }
    this.errors = [];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.errors = [];
    this.props.clearErrors();
    this.errors.concat(this.props.errors);
    if(this.state.description===''){
      this.errors.push("Summary is required");
    }
    if(this.state.about ===''){
      this.errors.push("About is required");
    }
    if(this.errors.length === 0){
      this.props.updateEvent(this.state)
      .then( ()=>{
        alert("Event Fully Created"); 
        this.props.history.push('/'); 
      });
    }
  }

  handleInputChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  render(){
    let eventExistErr, summaryErr, aboutErr = '';
    this.errors.forEach((error) => {
      let err = this.props.errorList[error];
      let message = <p className='form-error-message'>{error}</p>
      switch (err) {
        case "eventExist":
          return eventExistErr = message;
        case "eventSummary":
          return summaryErr = message;
        case "eventAbout":
          return aboutErr = message;
        default:
          return;
      }
    });
    return(
      <div id="details-event-form">

        <form id="details-event-info-form" onSubmit={this.handleSubmit}>

          <section className="info-section">
            <h1 id="create-event-header"><i className="far fa-images create-event-form-icons"></i>Main Event Image</h1>
            <p id="create-event-description">This is the first image attendees will see at the top of your listing. Use a high quality image: 2160x1080px (2:1 ratio).</p>
            <button id="add-event-images">
              <i className="fas fa-images button-icon"></i>
              <h1>Click to add main event image.</h1>
              <p>JPEG or PNG, no larger than 10MB.</p>
            </button>
          </section>
          <hr />
          <section className="info-section">
            <h1 id="create-event-header"><i className="far fa-edit create-event-form-icons"></i>Description</h1>
            <p id="create-event-description">Add more details to your event like your schedule, sponsors, or featured guests.</p>

            <label className='larger-input-label'><p>Summary</p>
              <textarea className="larger-input" onChange={this.handleInputChange('description')} value={this.state.description} />
            </label>
            {summaryErr}
            <label className='larger-input-label-2'><p>About</p>
              <textarea className="larger-input" onChange={this.handleInputChange('about')} value={this.state.about} />
            </label>
            {aboutErr}{eventExistErr}
          </section>

          <hr />
        
          <div id="form-buttons">
            <button className="form-discard-button" type="reset">Discard</button>
            <button className="form-submit-button">Save & Continue</button>
          </div>
        </form>
      </div>
    )
  }

}

export default DetailsEventForm; 