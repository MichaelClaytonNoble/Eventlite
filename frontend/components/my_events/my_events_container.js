import MyEvents from './my_events'; 
import {connect} from 'react-redux'; 
import {getEventsByType, clearEvents} from '../../actions/events';
import {analyzeEvents} from '../../reducers/selectors/events_selectors';

const mSTP = state => {
  let myEvents = []; 
  let organizers = [];
  if(state.entities.userEvents[state.session.currentUser.id]){
    myEvents = Object.values(state.entities.userEvents[state.session.currentUser.id]);
  }
  return ({
    myEvents: analyzeEvents(myEvents),
    organizers: myEvents.map( (event)=> event.organizer).filter( (organizer)=> organizer)
  })
}


const mDTP = (dispatch, ownProps) => {
  return ({
    getMyEvents: ()=>dispatch(getEventsByType('creator_id',ownProps.match.params.myId)),
  })
}

const MyEventsContainer = connect(mSTP, mDTP)(MyEvents); 
export default MyEventsContainer;