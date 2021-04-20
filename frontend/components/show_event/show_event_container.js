

import {connect} from 'react-redux';
import { getEventsByType } from '../../actions/events';
import ShowEvent from './show_event';
import {withRouter} from 'react-router-dom';

const mSTP = (state, ownProps) => ({
  event: state.entities.events[ownProps.match.params.eventId]
});

const mDTP = (dispatch, ownProps) => {
  console.log(ownProps.match.params.eventId)
  return{
  getEvent: ()=>dispatch(getEventsByType('id', ownProps.match.params.eventId))
  }
};


const ShowEventContainer = connect(mSTP, mDTP)(ShowEvent);
export default withRouter(ShowEventContainer);