import React from 'react'

class CreateTicketForm extends React.Component{

  constructor(props){
    super(props);

    this.state={
      payment: "PAID",
      name:'',
      disabled: false
    }
  }

  handleInputChange(field){
    return (e)=>{
      this.setState({[field]: e.target.value});
    };
  }
  handleRadioChange(field){
    return (e)=>{
      if(field === 'payment'){
        this.setState({disabled:true}); 
        if(e.currentTarget.value === "FREE"){
          this.state.price = '';
          this.setState({disabled:true});
        }
      }
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render(){

    return(
      <div id="create-ticket-form">
        <form id="create-event-info form"> 
          <section className="info-section">
          <div id="create-event-radio-buttons">

            <input type="radio" id="PAID" name="payment" value="PAID"  checked={this.state.payment === 'VENUE'} 
                    onChange={this.handleRadioChange('payment')}/>
            <label htmlFor="VENUE">Venue</label>
            <input type="radio" id="FREE" name="payment" value="FREE" checked={this.state.payment === 'ONLINE'} 
                    onChange={this.handleRadioChange('payment')}/>
            <label htmlFor="FREE">Free</label>

          </div>

          <label className='large-input-label'><p>Name</p>
            <input className="large-input" onChange={this.handleInputChange('name')} value={this.state.name}/>
          </label>  
          {/* {titleErr} */}
        </section>

        </form>
      </div>
    )
  }


};

export default CreateTicketForm;