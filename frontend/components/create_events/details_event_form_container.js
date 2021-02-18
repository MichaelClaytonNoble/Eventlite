import {connect} from 'react-redux';
import { EVENT_DETAILS_FORM_ERROR_LIST } from '../../reducers/selectors/error_selectors';
import DetailsEventForm from './details_event_form';
import { clearErrors, updateEvent } from '../../actions/events';
const mSTP = state => {
  return({
    errors: state.errors.events,
    errorList: EVENT_DETAILS_FORM_ERROR_LIST

  })
}

const mDTP = dispatch => {
  return({
    updateEvent: event=>dispatch(updateEvent(event)),
    clearErrors: ()=>dispatch(clearErrors())
  })
}

const DetailsEventFormContainer = connect(mSTP, mDTP)(DetailsEventForm);

export default DetailsEventFormContainer;