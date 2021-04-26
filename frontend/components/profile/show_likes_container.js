

import {connect} from 'react-redux';
import ShowLikes from './show_likes';
import {getMyEventsByType, clearEvents} from '../../actions/events';
import { fetchFollows } from '../../actions/follows';

const mSTP = state =>({ 
  followedEvents: Object.values(state.entities.events).sort( (a,b)=> new Date(a.start) - new Date(b.start)),
});

const mDTP = dispatch => ({
  getFollowedEvents: ()=> dispatch(getMyEventsByType("followed_events")),
  clearEvents: ()=>dispatch(clearEvents()),
  getFollows: ()=>dispatch(fetchFollows())
});

const ShowLikesContainer = connect(mSTP, mDTP)(ShowLikes);
export default ShowLikesContainer;