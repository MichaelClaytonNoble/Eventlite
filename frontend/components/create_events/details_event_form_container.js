import {connect} from 'react-redux';
import { EVENT_DETAILS_FORM_ERROR_LIST } from '../../reducers/selectors/error_selectors';
import DetailsEventForm from './details_event_form';
import { clearErrors, updateEvent, uploadImage, getMyEventsByType } from '../../actions/events';
const mSTP = (state, ownProps) => {
  return({
    errors: state.errors.events,
    errorList: EVENT_DETAILS_FORM_ERROR_LIST,
    event: state.entities.events[ownProps.match.params.eventId]
  })
}

const mDTP = (dispatch, ownProps) => {
  return({
    updateEvent: event=>dispatch(updateEvent(event)),
    clearErrors: ()=>dispatch(clearErrors()),
    getEvent: ()=> dispatch(getMyEventsByType('id', ownProps.match.params.eventId))
  })
}

const DetailsEventFormContainer = connect(mSTP, mDTP)(DetailsEventForm);

export default DetailsEventFormContainer;