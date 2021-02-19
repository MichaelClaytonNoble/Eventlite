import React from 'react';
import {connect} from 'react-redux';
import Splash from './splash';
import {getEventsByType} from '../../actions/events';


const mSTP = state => {
  return({  
    
  })
}

const mDTP = dispatch => {
  return({
    getEvents: (col,val)=>dispatch(getEventsByType(col,val))
  })
}

const SplashContainer = connect(mSTP, mDTP)(Splash);
export default SplashContainer;