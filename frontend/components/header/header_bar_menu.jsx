import React from 'react';
import {Link} from 'react-router-dom';


class HeaderBarMenu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div id="header-bar-menu">
        <span id="header-bar-menu-left">
          <Link to="/">Eventlite</Link>
          <input id="search-bar-input" />
        </span>
        <span id="header-bar-menu-right">
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

export default HeaderBarMenu;