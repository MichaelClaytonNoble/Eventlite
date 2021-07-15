import React from 'react';
import EventList from '../display_events/event_list';
import ModalContainer from '../modals/modal_container';

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
      loading: true,
      updateFilter:false
    }

    this.createCategoryMenu = this.createCategoryMenu.bind(this);
    this.showFilterMenu = this.showFilterMenu.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    this.categoryMenu = document.getElementById('category-menu');
    this.dateMenu = document.getElementById('date-menu');
    this.priceMenu = document.getElementById('price-menu');

    this.props.getCategories().then( ()=>{

      this.setState({categories: this.props.categories});

        if(this.props.initialCategory){
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
        this.search();
    });
  }
  componentWillMount(){
    this.props.getFollows();
  }

  componentDidUpdate(prevProps){
    if(this.state.updateFilter){
      this.props.resetPage();
      this.search();
      this.setState({updateFilter: false});
    }
    if(prevProps.paginate['page'] !== this.props.paginate['page']){
      console.log("componentDidUpdate: ", "this.state.paginate"); 
      this.search();
    }
  }

  search(){
    console.log("search");
    this.props.clear
    let search = Object.assign({}, this.props.paginate);
    search['search'] = this.state.searchFilter;
    search['category'] = this.state.categoryFilter;
    search['location'] = this.state.locationFilter;
    search['price'] = this.state.priceFilter;
    search['date'] = this.state.dateFilter;

    console.log(search); 
    this.props.clearEvents(); 
    this.props.searchEvents(search).then( ()=> {
      this.setState({events: this.props.events});
    });
  }

  //display filter menu
  showMainMenu(e, val){
   console.log("showMainMenu");
    e.style.display = "none";
    let filter = val;
    let id = e.id;
      if(filter !== "Any"){
        this.currentMenuEvent.classList.add('filter-selected');
        this.currentMenuEvent.innerHTML = `${filter}`;
        this.currentMenuEvent.innerHTML += `<img id=\"${id+'x'}\" class=\"x\" onClick="{e => e.stopPropagation()}" src=\"https://img.icons8.com/metro/26/3d64ff/delete-sign.png\"/>`;
      }
      else{
        console.log("showMainMenu ---> resetMenu")
        this.resetMenu.bind(this)();
      }
  }
  
  //GOOD
  resetMenu(){

    this.currentMenuEvent.classList.remove('filter-selected');

    if(this.currentMenuEvent.id.toLowerCase().includes("category")){
      this.currentMenuEvent.innerHTML = "Category<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({categoryFilter: "Any", categoryIdFilter: "Any", updateFilter: true});
    }
    if(this.currentMenuEvent.id.toLowerCase().includes("date")){
      this.currentMenuEvent.innerHTML = "Date<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({dateFilter: "Any", updateFilter: true});
    }
    if(this.currentMenuEvent.id.toLowerCase().includes("price")){
      this.currentMenuEvent.innerHTML = "Price<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({priceFilter: "Any", updateFilter: true});
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
      console.log("setFilter(",filterType,")");
      let val = e.target.innerText;
      if(val.includes('Any')){
        val = 'Any'
      }
      else{
        if(filterType === 'categoryFilter'){
          let categoryId = parseInt(e.target.dataset.category_id);
          this.setState({[filterType]: val, updateFilter: true, categoryIdFilter: categoryId});
        }
        else{

          this.setState({[filterType]: val, updateFilter: true});
        }
      }

      console.log("setFilter ---> showMainMenu");
      this.showMainMenu(e.currentTarget, val);
    }

  }

  render(){
    let modal = '';
    if(this.props.modal){
      modal = <ModalContainer eventId={this.eventId} />
    }

    return (
      <div id="browse-events">
        {modal}
        <div id="filters">
          <div id="title"><span>Filt</span><span>ers</span></div>
          <ul id="date-menu" className="filter-menu" onClick={this.setFilter('dateFilter')}>
            <li className="filter-menu-options">Any day</li>
            {/* <li className="filter-menu-options">Pick a date...</li> */}
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
          <form onSubmit={()=>{}}>
            <div id="location-filter-wrap">
              <div id="location-filter">
                  <div id="search-icon">
                    <i className="fas fa-search"></i>
                    <input type="text" id="location-input"placeholder="Search events" value={this.state.searchFilter} onChange={()=>{}}/>
                  </div>
                  <div id="search-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    {/* <input list="location-select" name="locations" id="locations" onChange={this.filter('locationFilter')} value={this.state.location}/> */}
                    <select id="location-select" onChange={()=>{}} value={this.state.locationFilter}>
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

          <EventList events={this.state.events} />
            <div id="next-page-buttons">
              <button id="prev-page" onClick={()=>this.props.changePage("prev")}>previous</button>
              <button id="next-page" onClick={()=>this.props.changePage("next")}>next</button>
            </div>
        </div>
      </div>
    )
  }
}

export default BrowseEvents;