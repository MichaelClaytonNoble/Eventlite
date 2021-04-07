import React from 'react';


class BrowseEvents extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="browse-events">
        <div id="filters">
          <div id="title">Filters</div>
          <div id="date-menu" className="filter-menu">
            <span className="filter-menu-options">Today</span>
            <span className="filter-menu-options">Tomorrow</span>
            <span className="filter-menu-options">This weekend</span>
            <span className="filter-menu-options">This week</span>
            <span className="filter-menu-options">Next week</span>
            <span className="filter-menu-options">This month</span>
            <span className="filter-menu-options">Next month</span>
          </div>
          <div id="category-menu" className="filter-menu">
            <span className="filter-menu-options"></span>
            <span className="filter-menu-options"></span>
            <span className="filter-menu-options"></span>
          </div>
          <div id="price-menu" className="filter-menu">
            <span className="filter-menu-options"></span>
            <span className="filter-menu-options"></span>
            <span className="filter-menu-options"></span>
          </div>
          <div id="date-filter" className="filter"><span>Date<img src="https://img.icons8.com/metro/52/000000/chevron-right.png"/></span></div>
          <div id="category-filter" className="filter"><span>Category<img src="https://img.icons8.com/metro/52/000000/chevron-right.png"/></span></div>
          <div id="price-filter" className="filter"><span>Price<img src="https://img.icons8.com/metro/52/000000/chevron-right.png"/></span></div>
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