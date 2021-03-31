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
    this.setState({});
    this.props.logout().then( ()=>this.props.history.push('/'));
  }

  render(){
    let signoutButton,manageMyEventsButton, signinLink, menuDropdown = '';

    if(!this.props.loggedIn){
      signinLink = <span id="signin-link">
        <Link to="/signin">Sign In</Link>
      </span>
    }
    else{
      signoutButton = <button onClick={this.signOut}>Sign Out</button>
      manageMyEventsButton = <button onClick={()=>{this.props.history.push(`/${this.props.myId}/events`)}}>Manage my events</button>
      menuDropdown = (
        <span id="menu-dropdown">
          {this.props.self.email}<br />
        <ul id="menu-dropdown">
          <li className="menu-dropdown-li">Browse events</li>
          <li className="menu-dropdown-li">{manageMyEventsButton}</li>
          <li className="menu-dropdown-li">Following</li>
          <li className="menu-dropdown-li">Tickets</li>
          <li className="menu-dropdown-li">{signoutButton}</li>
        </ul>
        </span>
      )
    }
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
          <span id="help-dropdown"><Link to="/about">About</Link></span>
          <span id="host-event-dropdown"><Link to="/events/create">Host an event</Link></span>
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
    logout: () => {dispatch(logout()).then(()=>this.props.history.push('/'))}
  });
}

const HeaderNavBarContainer = connect(mSTP, mDTP)(HeaderNavBar);
export default withRouter(HeaderNavBarContainer);