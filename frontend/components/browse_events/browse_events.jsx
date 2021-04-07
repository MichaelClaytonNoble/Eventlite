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