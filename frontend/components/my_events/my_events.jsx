import React from 'react';
import {Link} from 'react-router-dom';
class MyEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      myEvents: this.props.myEvents,
      organizers: this.props.organizers,
      loading: true,
      filterOrganizer: "All",
      filterStatus: "All",
      filterSearch: ""
    }
    this.loadEvents = this.loadEvents.bind(this); 
    this.createEventList = this.createEventList.bind(this); 
    this.filter = this.filter.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  componentWillMount(){
    this.props.getMyEvents();
  }
  componentDidUpdate(){
    if(this.state.loading){
      this.loadEvents();
      this.setState({loading: false});
    }
  }
  showMenu(key){
    return (e)=>{
      let menu = e.currentTarget;
      if(menu.classList.contains('hideMenu')){
        menu.classList.add("showMenu");
        menu.classList.remove("hideMenu");
      }
      window.addEventListener('click', (e)=> {
        if(!menu.contains(e.target)){
          menu.classList.add("hideMenu");
          menu.classList.remove("showMenu");
        }
      });
    }
  }
  filter(field){
    return (e)=>{
      this.setState({[field]: e.target.value, loading: true})
    }
  }
  loadEvents(){
    let relevantEvents = this.props.myEvents;
    if(this.state.filterOrganizer!=="All"){
      relevantEvents = relevantEvents.filter( (event)=> event.organizer === this.state.filterOrganizer);
    }
    if(this.state.filterStatus !== "All"){
      relevantEvents = relevantEvents.filter( event=> event.status === this.state.filterStatus);
    }
    if(this.state.filterSearch !== ""){
      relevantEvents = relevantEvents.filter( event => {
        return event.title.toLowerCase().includes(this.state.filterSearch.trim().toLowerCase())
      })
    }

    this.setState({myEvents: relevantEvents, organizers: this.props.organizers});
  }
  createEventList(){
    let myEvents;
    let location;
    let kebab;
    if(this.state.myEvents){
      return myEvents = this.state.myEvents.map( (event, key)=> {
        if(event.location === "ONLINE"){
          location = "Online event";
        }
        if(event.location ==="VENUE"){
          location = event.venue;
        }
        if(event.location ==="TBA"){
          location = "To be announced";
        }
        let img= <img id="event-icon" src={window.placeholder} alt="" />
        if(event.imageUrl){
          img = <img id="event-icon" src={event.imageUrl} alt="" />
        }

        kebab = [<li>View</li>]
        if(event.status !== 'Past'){
          kebab.push(<li onClick={()=>{this.props.history.push(`/events/${event.id}/edit`)}}>Edit</li>);
        }
        kebab.push(<li>Cancel</li>)
        return(
          <li id="event-list-item" key={key}>
            <div id="left">
              <div id="date">
                <span id="month">{new Date(event.start).toLocaleString('default', {month: 'short'}).toUpperCase()}</span>
                <span id="day">{new Date(event.start).getDate()}</span>
              </div>
              <div id="img-icon">{img}</div>
              <div id="details">
                <div id="title">{event.title}</div>
                <div>
                  <div id="location">{location}</div>
                  <div id="time">{event.start}</div>
                </div>
              </div>
            </div>
            <div id="right">
              <div id="stats">0/44
                <div id="progress"></div>
              </div>
              <div id="stats">$0.00</div>
              <div id="stats">{event.status}</div>
              <div id="stats"></div>

              <div className="kebab-wrap hideMenu" id={"kebab-wrap"+key} onClick={this.showMenu(key)}>
                <i className="fas fa-ellipsis-v kebab" id="kebab"></i>
                <ul className="kebab" id={"my-events-menu" + key}>
                  {kebab}
                </ul>
              </div>
            </div>
          </li>
        )
      });
    }
    return [];
  }

  render(){
    let myEvents = [];
    let organizers=[];
    let location;
    {
      myEvents = this.createEventList();
      organizers = this.state.organizers.map( (organizer, key)=>{
        return <option key={key} value={organizer}>{organizer}</option>
      });
    }
      return(
        <div id="my-events">
          <section id="my-events-header">
            <div id="title-header">
              <span id="title">Events</span>
              <span id="create-event-button">
                <Link to="/events/create/"><button id="create-button" className="form-submit-button">Create Event</button></Link>
                </span>
            </div>
            <div id="search-header">
              <label id="search-events-input">
                <div id="search-icon"><i className="fas fa-search"></i></div>
                <input type="text" id="events-search" placeholder="Search events"
                      onChange={this.filter('filterSearch')} value={this.state.filterSearch}></input>
              </label>
             
              <label id="select-status-input"><p>Event status</p>
                <select onChange={this.filter('filterStatus')} value={this.state.filterStatus}>
                  <option value="All">All</option>
                  <option value="Complete">Complete</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Past">Past</option>
                </select>
              </label>
              <label id="select-organizer-input"><p>Organizer</p>
                <select onChange={this.filter('filterOrganizer')} value={this.state.filterOrganizer}>
                  <option value="All">All</option>
                  {organizers}
                </select>
              </label>
            </div>
          </section>
          <section id="all-events">
            <div id="all-events-header">
              
            </div>
            <div id="events-list-header">
              <div id="left">
                <span id="heading">Event</span>
              </div>
              <div id="right">
                <span id="heading">Sold</span>
                <span id="heading">Gross</span>
                <span id="heading">Status</span>
                <span id="heading"></span>
              </div>
            </div>
            <ul id="events-list">
              {myEvents}
            </ul>
          </section>
        </div>
      )
    }
}

export default MyEvents;