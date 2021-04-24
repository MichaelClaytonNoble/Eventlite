import React from 'react';
import Link from 'react-router-dom';

class BrowseEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dateFilter: 'Any',
      priceFilter: 'Any',
      categoryFilter: 'Any',
      categoryIdFilter: 'Any',
      locationFilter: "Any",
      searchFilter: "",
      events: this.props.events,
      categories: this.props.categories,
      loading: true
    }

    this.createCategoryMenu = this.createCategoryMenu.bind(this); 
    this.showFilterMenu = this.showFilterMenu.bind(this);
    this.createEventsList = this.createEventsList.bind(this); 
    this.filterEvents=this.filterEvents.bind(this); 
    this.filter = this.filter.bind(this);
    this.filterEventsByDate = this.filterEventsByDate.bind(this);
    this.getCurrentDateTime = this.getCurrentDateTime.bind(this); 
  }

   componentDidMount(){
     window.scrollTo(0, 0);
    this.categoryMenu = document.getElementById('category-menu');
    this.dateMenu = document.getElementById('date-menu');
    this.priceMenu = document.getElementById('price-menu');
    this.props.getCategories().then( ()=>{
      
      this.setState({categories: this.props.categories, loading:false});
      this.props.getEvents().then( ()=>{
        this.setState({events: this.props.events})

        if(this.props.initialCategory){
          console.log(this.props.initialCategory); 
          if(this.props.initialCategory === "Online Events"){
            document.getElementById('location-select').value = "ONLINE";
            this.setState({locationFilter: "ONLINE"});
          }
          else{
            document.getElementById('category-filter-value').click();
            document.getElementById(`category-${this.props.initialCategory}`).click();
            this.setState({categoryFilter: this.props.initialCategory});
          }
        }
      });
    });
  }
  componentWillMount(){
    this.props.getEvents();
    this.props.getCategories(); 
  }
  componentDidUpdate(prevProps){
    if(this.state.loading){
      this.filterEvents();
      this.setState({loading: false});
    }
    if(prevProps.events !== this.props.events){
      this.setState({events: this.props.myEvents});
    }
  }

  //display filter menu 

  showMainMenu(e, val){
    e.style.display = "none"; 
    let filter = val;
    let id = e.id; 
      if(filter !== "Any"){
        this.currentMenuEvent.classList.add('filter-selected');
        this.currentMenuEvent.innerHTML = `${filter}`;
        this.currentMenuEvent.innerHTML += `<img id=\"${id+'x'}\" class=\"x\" onClick="{e => e.stopPropagation()}" src=\"https://img.icons8.com/metro/26/3d64ff/delete-sign.png\"/>`;
      }
      else{
        this.resetMenu.bind(this)();
      }
  }
  resetMenu(){
    this.currentMenuEvent.classList.remove('filter-selected');
    if(this.currentMenuEvent.id.toLowerCase().includes("category")){
      this.currentMenuEvent.innerHTML = "Category<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({categoryFilter: "Any", categoryIdFilter: "Any", loading: true}); 
    }
    if(this.currentMenuEvent.id.toLowerCase().includes("date")){
      this.currentMenuEvent.innerHTML = "Date<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({dateFilter: "Any", loading: true});
    }
    if(this.currentMenuEvent.id.toLowerCase().includes("price")){
      this.currentMenuEvent.innerHTML = "Price<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({priceFilter: "Any", loading: true});
    }
  }
  showFilterMenu(e){
    let id=e.target.id;
    this.currentMenuEvent = e.target;
    if(e.target.classList.contains("chevron")){
      this.currentMenuEvent = e.target.parentElement;
    }
    if(id.includes('x')){
      this.currentMenuEvent = e.target.parentElement;
      this.resetMenu.bind(this)();
    }
    else{
      switch(this.currentMenuEvent.id){
        case 'date-filter-value':
          this.dateMenu.style.display="unset";
          break;
        case 'category-filter-value':
          this.categoryMenu.style.display="unset";
          break; 
        case 'price-filter-value':
          this.priceMenu.style.display="unset";
          break;
        default: 
          break; 
      }
    }
  }
  createCategoryMenu(){
    return this.props.categories.map( (category, key) => {
      return <li key={key} className="filter-menu-options" id={`category-${category.name}`}data-category_id={category.id}>
                  {category.name}
                </li>
    });
  }


  //filter the events

  setFilter(filterType){
    return (e)=> {
      let val = e.target.innerText;
      if(val.includes('Any')){
        val = 'Any'
      }
      else{
        if(filterType === 'categoryFilter'){
          let categoryId = parseInt(e.target.dataset.category_id)
          this.setState({[filterType]: val, loading: true, categoryIdFilter: categoryId})
        }
        else{
          this.setState({[filterType]: val, loading: true})
        }
      }
      this.showMainMenu(e.currentTarget, val);
    }
  }
  filter(field){
    if(field === 'loading'){
      return (e)=>{
        e.preventDefault(); 
        this.setState({[field]: true})
      }
    }
    return (e)=>{
      this.setState({[field]: e.target.value})
    }
  }
  filterEvents(){
    let relevantEvents = this.props.events;

    if(this.state.categoryFilter !== "Any"){
      relevantEvents = relevantEvents.filter( event=> event.category_id === this.state.categoryIdFilter);
    }
    if(this.state.locationFilter !== "Any"){
      relevantEvents = relevantEvents.filter( event=> event.location === this.state.locationFilter);
    }
    if(this.state.searchFilter !== ""){
      relevantEvents = relevantEvents.filter( event => {
        return event.title.toLowerCase().includes(this.state.searchFilter.trim().toLowerCase())
      })
    }
    // if(this.state.filterPrice !== "All"){
    //   relevantEvents = relevantEvents.filter( event=> event.price === this.state.filterStatus);
    // }
    if(this.state.dateFilter !== "Any" && !this.state.dateFilter.includes("Pick")){
      relevantEvents = this.filterEventsByDate(relevantEvents);
    }
    this.setState({events: relevantEvents, loading: true});
  }
  filterEventsByDate(relevantEvents){

    //day of the week => days away from the weekend 
    const weekendOffset = {
      0: -2, 1:4, 2:3, 3:2, 4:1, 5:0, 6:-1
    }
    switch(this.state.dateFilter){
      case 'Pick a date...':
        break;
      case 'Today':
        relevantEvents = relevantEvents.filter( event => {
          let today = JSON.stringify(this.getCurrentDateTime());
          let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

          start = new Date(JSON.parse(start));
          today = new Date(JSON.parse(today)); 
          if(start.getMonth() === today.getMonth() && start.getYear() === today.getYear() && start.getDate() === today.getDate()){
            if(start >= today){return true;}
          }
        });
        break;
      case 'Tomorrow':
        relevantEvents = relevantEvents.filter( event => {
          let today = JSON.stringify(this.getCurrentDateTime());
          let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

          start = new Date(JSON.parse(start));
          today = new Date(JSON.parse(today)); 
          if(start.getMonth() === today.getMonth() && start.getYear() === today.getYear() && start.getDate() === today.getDate()+1){
            return true;
          }
        });
        break;
      case 'This weekend':
        relevantEvents = relevantEvents.filter( event => {
          let today = JSON.stringify(this.getCurrentDateTime());
          let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

          start = new Date(JSON.parse(start));
          today = new Date(JSON.parse(today)); 

          let friday = new Date(today.toJSON());
          let sunday = new Date(today.toJSON());
          friday.setDate(today.getDate()+weekendOffset[today.getDay()]);
          sunday.setDate(today.getDate()+weekendOffset[today.getDay()]+2);
          sunday.setHours(23,59,59);

          if(today > friday){
            friday = today;
          }
          if(start <= sunday && start >= friday){
            return true;
          }
        });
        break;
      case 'This week':
        relevantEvents = relevantEvents.filter( event => {
          let today = JSON.stringify(this.getCurrentDateTime());
          let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

          start = new Date(JSON.parse(start));
          today = new Date(JSON.parse(today));  

          let monday = new Date(today.toJSON());
          let sunday = new Date(today.toJSON());

          monday.setDate(today.getDate()-today.getDay()+1);
          monday.setHours(0,0,0);
          sunday.setDate(monday.getDate()+6);
          sunday.setHours(23,59,59);
          if(today > monday){
            monday = today;
          }
          if(start <= sunday && start >= monday){
            return true;
          }
        });
        break;
      case 'Next week':
        relevantEvents = relevantEvents.filter( event => {
          let today = JSON.stringify(this.getCurrentDateTime());
          let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

          start = new Date(JSON.parse(start));
          today = new Date(JSON.parse(today));  

          let monday = new Date(today.toJSON());
          let sunday = new Date(today.toJSON());

          monday.setDate(today.getDate()-today.getDay()+1+7);
          monday.setHours(0,0,0);

          sunday.setDate(monday.getDate()+6);
          sunday.setHours(23,59,59);

          if(today > monday){
            monday = today;
          }
          if(start <= sunday && start >= monday){
            return true;
          }
        });
        break;
      case 'This month':
        relevantEvents = relevantEvents.filter( event => {
          let today = JSON.stringify(this.getCurrentDateTime());
          let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

          start = new Date(JSON.parse(start));
          today = new Date(JSON.parse(today));  

          if(start >= today && start.getMonth()=== today.getMonth()){
            return true;
          }
        });
        break;
      case 'Next month':
        relevantEvents = relevantEvents.filter( event => {
          let today = JSON.stringify(this.getCurrentDateTime());
          let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

          start = new Date(JSON.parse(start));
          today = new Date(JSON.parse(today));  

          if(start >= today && start.getMonth()=== today.getMonth()+1){
            return true;
          }
        });
        break;
      default:
        break;
    }
    return relevantEvents;
  }
  convertDateToLocalAsJSON(date){
    return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON()).slice(0,16);
  }

  getCurrentDateTime(){
    return this.convertDateToLocalAsJSON(new Date()).slice(0,16);
  }

 
  createEventsList(){
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'};

    if(!this.state.events){return []}
    return this.state.events.map( (event, key) => {
      let start = (new Date(this.convertDateToLocalAsJSON(new Date(event.start))).toLocaleTimeString("en-US", options)); 
      let img = window.placeholder
      let location = "Online"
      if(event.imageUrl){img = event.imageUrl}
      if(event.location === "VENUE"){
        location = event.venue;
      }
      if(event.location === "TBA"){
        location = "To be announced"; 
      }

      return <li key={key}>
        <div id="events-left">
          <div id="title-wrap" onClick={()=>this.props.history.push(`/events/${event.id}`)}><div id="title">{event.title}</div></div>
          <div id="start">{start}</div>
          <div id="location">{location}</div>
        </div>
        <div id="events-right">
          <div id="event-img" onClick={()=>this.props.history.push(`/events/${event.id}`)}><img src={img} alt="event-img" /></div>
          <div id="like-button">♥
          </div>
        </div>
      </li>
    });
  }
  
  render(){
    let eventsList = this.createEventsList();
    if(!eventsList.length && !this.state.loading){
      eventsList = <p id="no-events-message">Please select another filter</p>
    };
    
    return (
      <div id="browse-events">
        <div id="filters">
          <div id="title"><span>Filt</span><span>ers</span></div>
          <ul id="date-menu" className="filter-menu" onClick={this.setFilter('dateFilter')}>
            <li className="filter-menu-options">Any day</li>
            <li className="filter-menu-options">Pick a date...</li>
            <li className="filter-menu-options">Today</li>
            <li className="filter-menu-options">Tomorrow</li>
            <li className="filter-menu-options">This weekend</li>
            <li className="filter-menu-options">This week</li>
            <li className="filter-menu-options">Next week</li>
            <li className="filter-menu-options">This month</li>
            <li className="filter-menu-options">Next month</li>
          </ul>
          <ul id="category-menu" className="filter-menu" onClick={this.setFilter('categoryFilter')}>
            <li className="filter-menu-options" id="category-Any" data-category_id="Any">Any category</li>
            {this.createCategoryMenu()}
          </ul>
          <ul id="price-menu" className="filter-menu" onClick={this.setFilter('priceFilter')}>
            <li className="filter-menu-options">Any price</li>
            <li className="filter-menu-options">Free</li>
            <li className="filter-menu-options">Paid</li>
          </ul>
          <div id="date-filter" className="filter" onClick={this.showFilterMenu}><span id="date-filter-value">Date<img className="chevron" src="https://img.icons8.com/metro/52/000000/chevron-right.png"/></span></div>
          <div id="category-filter" className="filter" onClick={this.showFilterMenu}><span id="category-filter-value">Category<img className="chevron" src="https://img.icons8.com/metro/52/000000/chevron-right.png"/></span></div>
          <div id="price-filter" className="filter" onClick={this.showFilterMenu}><span id="price-filter-value">Price<img className="chevron" src="https://img.icons8.com/metro/52/000000/chevron-right.png"/></span></div>
        </div>
        <div id="events-list-wrap">
              <form onSubmit={this.filter('loading')}>
          <div id="location-filter-wrap">
            <div id="location-filter">
                <div id="search-icon">
                  <i className="fas fa-search"></i>
                  <input type="text" id="location-input"placeholder="Search events" value={this.state.searchFilter} onChange={this.filter('searchFilter')}/>
                </div>
                <div id="search-icon">
                  <i className="fas fa-map-marker-alt"></i>
                  {/* <input list="location-select" name="locations" id="locations" onChange={this.filter('locationFilter')} value={this.state.location}/> */}
                  <select id="location-select" onChange={this.filter('locationFilter')} value={this.state.locationFilter}>
                    <option value="Any">Any</option>
                    <option value="ONLINE">Online</option>
                    <option value="TBA">To be announced</option>
                    <option value="VENUE">Venue</option>
                  </select>
                </div>
            </div>
            <button>Search</button>
          </div>
              </form>
          <ul id="events-list">
            <div id="border"><hr /></div>
            {eventsList}
          </ul>
        </div>
      </div>
    )
  }
}

export default BrowseEvents;