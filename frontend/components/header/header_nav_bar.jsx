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
    let signoutButton, signinLink, menuDropdown = '';

    if(!this.props.loggedIn){
      signinLink = <span id="signin-link">
        <Link to="/signin">Sign In</Link>
      </span>
    }
    else{
      signoutButton = <button onClick={this.signOut}>Sign Out</button>
      menuDropdown = (
        <ul id="menu-dropdown">
          <li className="menu-dropdown-li"><span><div id="icon"><img src={window.stickManGrey}/></div>{this.props.self.email}</span></li>
          <li className="menu-dropdown-li">Browse events</li>
          <li className="menu-dropdown-li">Manage my events</li>
          <li className="menu-dropdown-li">Following</li>
          <li className="menu-dropdown-li">Tickets</li>
          <li className="menu-dropdown-li">{signoutButton}</li>
        </ul>
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
          {/* {signoutButton} */}
        </span>
      </div>
    )
  }
}

const mSTP = state =>{
  return ({
  loggedIn: state.session.currentUser.id,
  self: state.entities.users[state.session.currentUser.id]
  })
}

const mDTP = (dispatch) => {
  return ({
    logout: () => dispatch(logout())
  });
}

const HeaderNavBarContainer = connect(mSTP, mDTP)(HeaderNavBar);
export default withRouter(HeaderNavBarContainer);