import React from 'react';
import {Link} from 'react-router-dom';


class HeaderNavBar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.state);
    console.log(this.props); 
    return(
      <div id="header-nav-bar">
        <span id="header-nav-bar-left">
          <Link to="/" id="logo-link">Eventlite</Link>
          <span id="search-bar-input-span">
            <i className="fas fa-search"></i>
            <input id="search-bar-input" placeholder="Search for events"/>
            </span>
        </span>
        <span id="header-nav-bar-right">
          <span id="host-event-dropdown">Host an event</span>
          <span id="help-dropdown">Help</span>
          <span id="signin-link">
            <Link to="/signin">Sign In</Link>
            </span>
        </span>
      </div>
    )
  }
}

export default HeaderNavBar;