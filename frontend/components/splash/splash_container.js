import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Splash from './splash';
import {getEventsByType, clearEvents, clearMyEvents} from '../../actions/events';
import {pullCategories} from '../../actions/categories'; 
import {getFeaturedCollections} from '../../actions/featured_collections';
import {createFollow, deleteFollow, fetchFollows} from '../../actions/follows';

const mSTP = state => {
  return({  
    events: Object.values(state.entities.events).sort( (a,b)=> new Date(a.start) - new Date(b.start)),
    categories: Object.values(state.entities.categories),
    myId: state.session.currentUser.id,
    featuredCollections: Object.values(state.entities.featuredCollections),
    follows: state.entities.following
  })
}
    
const mDTP = dispatch => {
  return({
    getEvents: (col,val)=>dispatch(getEventsByType(col,val)),
    getCategories: ()=>dispatch(pullCategories()),
    clearEvents: ()=>dispatch(clearEvents()),
    clearMyEvents: id=>dispatch(clearMyEvents(id)),
    getFeaturedCollections: ()=>dispatch(getFeaturedCollections()),
    getFollows: ()=>dispatch(fetchFollows()),
    follow: event_id=>dispatch(createFollow(event_id)),
    unfollow: event_id => dispatch(deleteFollow(event_id))
  })
}

const SplashContainer = connect(mSTP, mDTP)(Splash);
export default SplashContainer;