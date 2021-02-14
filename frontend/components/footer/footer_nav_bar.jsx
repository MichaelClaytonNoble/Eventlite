import React from 'react';
import {Link} from 'react-router-dom';

class FooterNavBar extends React.Component{

  render(){
    return(
      <div id="footer-nav-bar">

        <span id="footer-nav-bar-stamp">2021 Eventlite</span>
        <ul id="footer-nav-bar-menu">
          <li><Link to="/about">About</Link></li>
          <li><a href="https://github.com/makonobo/eventlite/wiki">Github</a></li>
          <li><a href="https://linkedin.com/in/michaelclaytonnoble/">Linked In</a></li>
        </ul>
        <span>

        </span>
      </div>
    )
  }
}

export default FooterNavBar; 