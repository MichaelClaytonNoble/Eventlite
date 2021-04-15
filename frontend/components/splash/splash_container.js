import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Splash from './splash';
import {getEventsByType, clearEvents} from '../../actions/events';
import {pullCategories} from '../../actions/categories'; 


const mSTP = state => {
  return({  
    events: Object.values(state.entities.events).sort( (b,a)=> new Date(a.start) - new Date(b.start)),
    categories: Object.values(state.entities.categories)
  })
}
    
const mDTP = dispatch => {
  return({
    getEvents: (col,val)=>dispatch(getEventsByType(col,val)),
    getCategories: ()=>dispatch(pullCategories()),
    clearEvents: ()=>dispatch(clearEvents())
  })
}

const SplashContainer = connect(mSTP, mDTP)(Splash);
export default SplashContainer;