import React from 'react';
import Dropzone from 'react-dropzone';
import merge from 'lodash'; 
class DetailsEventForm extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      id: this.props.match.params.eventId,
      description: '',
      imageFile: '',
      imageUrl: '',
      about: ''
    }
    this.errors = [];
    this.props.clearErrors();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this); 
  }

  componentDidMount(){
    this.props.getEvent().then( ()=>this.setState({
      description: this.props.event.description,
      about: this.props.event.about,
      imageUrl: this.props.event.imageUrl
    }));
  }
  handleFile(files) {

    const file = files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result })
    }
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  onImageDrop(image){
    this.setState({image})
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
      
      
      const formData = new FormData();
      formData.append('event[id]', this.state.id);
      formData.append('event[description]', this.state.description);
      formData.append('event[about]', this.state.about);
      
      if(this.state.imageFile){
        formData.append('event[image]', this.state.imageFile);
      }
      this.props.updateEvent(formData)
      .then( ()=>{
        this.props.history.push(`/events/${this.state.id}/tickets/create`); 
      });
    }
  }

  handleInputChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  render(){
    const preview = this.state.imageUrl ? <img alt="signup-form" id="add-image-preview" src={this.state.imageUrl} /> : null;
    let eventExistErr, summaryErr, aboutErr = '';
    let imgDropzone = <div>
                        <i className="fas fa-images button-icon"></i>
                        <h1>Drag & drop or click to add main event image.</h1>
                        <p>JPEG or PNG, no larger than 10MB.</p>
                      </div>;
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
    if(this.state.imageFile || this.state.imageUrl){
      imgDropzone = preview;
    }
    return(
      <div id="details-event-form" className="create-form">
        <form id="details-event-info-form" onSubmit={this.handleSubmit}>

          <section className="info-section">
            <h1 className="create-header"><i className="far fa-images create-event-form-icons"></i>Main Event Image</h1>
            <p className="create-description">This is the first image attendees will see at the top of your listing. Use a high quality image: 2160x1080px (2:1 ratio).</p>
            <Dropzone multiple={false} accept="image/*" onDrop={this.handleFile}>
              {({getRootProps, getInputProps}) => (
                <section id="add-event-images">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {imgDropzone}
                  </div>
                </section>
              )}
            </Dropzone>
          </section>
          <hr />
          <section className="info-section">
            <h1 className="create-header"><i className="far fa-edit create-event-form-icons"></i>Description</h1>
            <p className="create-description">Add more details to your event like your schedule, sponsors, or featured guests.</p>

            <label id='larger-input-label' className="larger-input-label"><p>Summary</p>
              <textarea className="larger-input" onChange={this.handleInputChange('about')} value={this.state.about} />
            </label>
            {summaryErr}
            <label id='larger-input-label-2' className="larger-input-label"><p>About</p>
              <textarea className="larger-input" onChange={this.handleInputChange('description')} value={this.state.description} />
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