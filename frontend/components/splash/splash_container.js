import React from 'react';
import {connect} from 'react-redux';
import Splash from './splash';


const mSTP = state => {
  return({
    // pullEvents: 
  })
}

const mDTP = dispatch => {
  return({

  })
}

const SplashContainer = connect(mSTP, mDTP)(Splash);
export default SplashContainer;