

import {connect} from 'react-redux';
import { getEventsByType, clearEvents } from '../../actions/events';
import ShowEvent from './show_event';
import {fetchFollows} from '../../actions/follows';
import {fetchTickets} from '../../actions/tickets';



const mSTP = (state, ownProps) => ({
  event: state.entities.events[ownProps.match.params.eventId],
  relevantEvents: Object.values(state.entities.events).filter( event=>{
    return event.id !== parseInt(ownProps.match.params.eventId)
  })
});

const mDTP = (dispatch, ownProps) => ({

  clearEvents: ()=>dispatch(clearEvents()),
  getEvent: ()=>dispatch(getEventsByType('any_id', ownProps.match.params.eventId)),
  getRelevantEvents: (category_id)=>dispatch(getEventsByType('category_id', category_id)),
  getFollows: ()=>dispatch(fetchFollows()),
  getTickets: ()=>dispatch(fetchTickets(ownProps.match.params.eventId))

});


const ShowEventContainer = connect(mSTP, mDTP)(ShowEvent);
export default (ShowEventContainer);