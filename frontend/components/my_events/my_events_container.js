import MyEvents from './my_events'; 
import {connect} from 'react-redux'; 
import {clearMyEvents, getMyEventsByType, searchEvents} from '../../actions/events';
import {analyzeEvents} from '../../reducers/selectors/events_selectors';
import { openModal } from '../../actions/modal';
import { decrementPage, incrementPage, resetPage, resetPaginate } from '../../actions/paginate';

const mSTP = state => {
  let myEvents = []; 
  let organizers = [];
  if(state.entities.userEvents[state.session.currentUser.id]){
    myEvents = Object.values(state.entities.userEvents[state.session.currentUser.id]).sort( (a, b)=> new Date(a.start) - new Date(b.start));
  }
  return ({
    myEvents: myEvents,
    organizers: Array.from(new Set(myEvents.map( (event)=> event.organizer).filter( (organizer)=> organizer))),
    modal: state.ui.modal,
    paginate: state.ui.paginate
  });
}

const mDTP = (dispatch, ownProps) => {
  let defaultSearch = {
    page: 1,
    creator_id: true,
    per_page: 12,
  }
  return ({
    searchEvents: (options)=> {
      options["page"] = options["page"] || defaultSearch["page"];
      options["creator_id"] = options["creator_id"] || defaultSearch["creator_id"];
      options["per_page"] = options["per_page"] || defaultSearch["per_page"];
      return dispatch(searchEvents(options));
    },
    getMyEvents: ()=>dispatch(getMyEventsByType('creator_id',ownProps.match.params.myId)),
    openModal: (type)=>dispatch(openModal(type)),
    changePage: (option) => option === "prev" ? dispatch(decrementPage()) : dispatch(incrementPage()),
    resetPage: ()=> dispatch(resetPage()),
    clearEvents: ()=> dispatch(clearMyEvents(ownProps.match.params.myId))
  })
}

const MyEventsContainer = connect(mSTP, mDTP)(MyEvents); 
export default (MyEventsContainer);