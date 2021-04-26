import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {logout} from '../../actions/session';
import {connect} from 'react-redux'; 

class HeaderNavBar extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.signOut = this.signOut.bind(this); 
  }

  signOut(e){
    this.props.logout().then( ()=>{
      this.props.history.push('/');
      window.location.reload();
    });
  }

  render(){
    let signinLink, menuDropdown, likesLink, ticketsLink, aboutLink, createLink = '';

    if(!this.props.loggedIn){
      signinLink = <span id="signin-link">
        <Link to="/signin">Sign In</Link>
      </span>
      aboutLink = <span id="help-dropdown" onClick={()=>this.props.history.push('/about')}>About</span>
      createLink = <span id="host-event-dropdown" onClick={()=>this.props.history.push('/events/create')}>Host an event</span>
    }
    else{

      menuDropdown = (
        <span id="menu-dropdown">
          {this.props.self.email}<br />
        <ul id="menu-dropdown">
          <li className="menu-dropdown-li"
            onClick={()=>{if(this.props.history.location.pathname === '/events/browse'){window.location.reload();} this.props.history.push(`/events/browse`)}}
            >Browse events</li>
          <li className="menu-dropdown-li"
            onClick={()=>{this.props.history.push(`/${this.props.myId}/events`)}}
            >Manage my events</li>
          <li className="menu-dropdown-li">Following</li>
          <li className="menu-dropdown-li" 
            onClick={()=>this.props.history.push(`/${this.props.myId}/likes/events`)}
            >Likes</li>

          <li className="menu-dropdown-li">Tickets</li>
          <li className="menu-dropdown-li" onClick={()=>this.props.history.push('/about')}>About</li>
          <li className="menu-dropdown-li"
            onClick={this.signOut}
            >Sign Out</li>
        </ul>
        </span>
      );

      createLink = <span className="nav-icon-link" id="create-icon-link" onClick={()=>this.props.history.push('/events/create')}>
        <img src="https://img.icons8.com/android/24/3d64ff/plus.png"/>
        <p>Create Event</p>
        </span>
      likesLink = <span className="nav-icon-link" onClick={()=>this.props.history.push(`/${this.props.myId}/likes/events`)}>
        <img src="https://img.icons8.com/metro/26/39364f/like.png"/>
        <p>Likes</p>
        </span>
      ticketsLink = <span className="nav-icon-link" onClick={()=>this.props.history.push('/events/create')}>
        <img src="https://img.icons8.com/carbon-copy/50/39364f/ticket.png"/>
        <p>Tickets</p>
        </span>
    }
    return(
      <div id="header-nav-bar">
        <span id="header-nav-bar-left">
          <Link to="/" id="logo-link"><span>even</span>tlite</Link>
          <span id="search-bar-input-span">
            <i className="fas fa-search"></i>
            <input id="search-bar-input" placeholder="Search for events"/>
            </span>
        </span>
        <span id="header-nav-bar-right">
          {aboutLink}
          {createLink}
          {likesLink}
          {ticketsLink}
          {menuDropdown}
          {signinLink}
        </span>
      </div>
    )
  }
}

const mSTP = state =>{
  return ({
  loggedIn: state.session.currentUser.id,
  self: state.entities.users[state.session.currentUser.id],
  myId: state.session.currentUser.id
  })
}

const mDTP = (dispatch) => {
  return ({
    logout: () => dispatch(logout())
  });
}

const HeaderNavBarContainer = connect(mSTP, mDTP)(HeaderNavBar);
export default withRouter(HeaderNavBarContainer);