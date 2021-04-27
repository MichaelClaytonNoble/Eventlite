import React from 'react'
import {withRouter} from 'react-router-dom';

class CreateTicketForm extends React.Component{

  constructor(props){
    super(props);

    this.state={
      paid: '',
      max_quantity: '',
      name:'',
      price: '',
      disabled: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(field){
    return (e)=>{
      this.setState({[field]: e.target.value});
    };
  }
  handleRadioChange(field){
    return (e)=>{
      if(field === 'paid'){
        if(e.currentTarget.value ==='false'){
          this.setState({price: '0.00', disabled:true, paid: 'false'});
        }
        else{
          this.setState({price: '', disabled: false, paid: 'true'})
        }
      }
    };
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state);

    this.props.createTicket(this.state)
      .then( ()=> this.props.nextPage());
    
  }

  render(){
    let nameErr, quantityErr, priceErr, paidErr = '';

    this.props.errors.forEach( (error)=>{
      let err = this.props.errorList[error]; 
      let message = <p className='form-error-message'>{error}</p>
      switch(err){
        case "ticketName":
          return nameErr = message;
        case "ticketQuantity":
          return quantityErr = message;
        case "ticketPrice":
          return priceErr = message;
        case "ticketPaid":
          return paidErr = message;
        default:
          return;
      }
    });
    return(
      <div id="create-ticket-form" className="create-form">
        <form id="create-event-info-form" className="create-info-form" onSubmit={this.handleSubmit}>

        <section className="info-section">
            <h1 className="create-header"><i className="far fa-edit create-event-form-icons"></i>Add tickets</h1>
            <p className="create-description">Create a ticket for your event. Users will be able to purchase tickets until the event ends.</p>

          <label className='large-input-label'><p>Name</p>
            <input className="large-input" onChange={this.handleInputChange('name')} value={this.state.name}/>
          </label>  
          {nameErr}
          <label className='large-input-label'><p>Quantity</p>
          <input className="large-input" onChange={this.handleInputChange('max_quantity')} value={this.state.maxQuantity}/>
          </label>
          {quantityErr}
          <div id="create-event-radio-buttons" className="radio-buttons">
            <input type="radio" id="paid" name="paid" value='true' checked={this.state.paid === 'true'}
                  onChange={this.handleRadioChange('paid')} />
            <label htmlFor="paid">Paid</label>
            <input type="radio" id="free" name="paid" value='false' checked={this.state.paid === 'false'} 
                  onChange={this.handleRadioChange('paid')} />
            <label htmlFor="free">Free</label>
          </div>
          {paidErr}
          <label className='large-input-label'><p>Price</p>
          <input className="large-input"  onChange={this.handleInputChange('price')} 
              value={this.state.price} disabled={'false' === this.state.paid}
                placeholder='$ 0.00'
                pattern="^\d+(,\d{3})*(\.\d{2})?$"/>
          </label>
          {priceErr}
        </section>
        <div id="form-buttons">
          <button className="form-discard-button" type="reset">Discard</button>
          <button className="form-submit-button">Save & Continue</button>
        </div>
        </form>
      </div>
    )
  }


};

export default CreateTicketForm;