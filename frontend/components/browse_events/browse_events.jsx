import React from 'react';


class BrowseEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dateFilter: 'Any',
      priceFilter: 'Any',
      categoryFilter: 'Any',
      events: this.props.events,
      categories: this.props.categories
    }

    this.createCategoryMenu = this.createCategoryMenu.bind(this); 
    this.showFilterMenu = this.showFilterMenu.bind(this);
  }
  setFilter(filterType){
    return (e)=> {
      let val = e.target.innerText;
      if(val.includes('Any')){val = 'Any'};
      this.setState({[filterType]: val})
      this.showMainMenu(e.currentTarget, val);
    }
  }
  componentDidMount(){
    this.categoryMenu = document.getElementById('category-menu');
    this.dateMenu = document.getElementById('date-menu');
    this.priceMenu = document.getElementById('price-menu');
  }
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
      this.setState({categoryFilter: "Any"}); 
    }
    if(this.currentMenuEvent.id.toLowerCase().includes("date")){
      this.currentMenuEvent.innerHTML = "Date<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({dateFilter: "Any"});
    }
    if(this.currentMenuEvent.id.toLowerCase().includes("price")){
      this.currentMenuEvent.innerHTML = "Price<img class=\"chevron\" src=\"https://img.icons8.com/metro/52/000000/chevron-right.png\"/>";
      this.setState({priceFilter: "Any"});
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
    return this.props.categories.map( (category,key) => {
      return <li key={key} className="filter-menu-options">
                  {category.name}
                </li>
    })
  }
  render(){
    return (
      <div id="browse-events">
        <div id="filters">
          <div id="title">Filters</div>
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
            <li className="filter-menu-options">Any category</li>
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
        <div id="events-list">
          <div id="search">
            <input type="text"/>
            <button>Search</button>
          </div>
        </div>
      </div>
    )
  }
}

export default BrowseEvents;