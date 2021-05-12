import MyEvents from './my_events'; 
import {connect} from 'react-redux'; 
import {getMyEventsByType} from '../../actions/events';
import {analyzeEvents} from '../../reducers/selectors/events_selectors';
import { openModal } from '../../actions/modal';

const mSTP = state => {
  let myEvents = []; 
  let organizers = [];
  if(state.entities.userEvents[state.session.currentUser.id]){
    myEvents = Object.values(state.entities.userEvents[state.session.currentUser.id]).sort( (a, b)=> new Date(a.start) - new Date(b.start));
  }
  return ({
    myEvents: myEvents,
    organizers: Array.from(new Set(myEvents.map( (event)=> event.organizer).filter( (organizer)=> organizer))),
    modal: state.ui.modal
  });
}


const mDTP = (dispatch, ownProps) => {
  return ({
    getMyEvents: ()=>dispatch(getMyEventsByType('creator_id',ownProps.match.params.myId)),
    openModal: (type)=>dispatch(openModal(type))
  })
}

const MyEventsContainer = connect(mSTP, mDTP)(MyEvents); 
export default (MyEventsContainer);