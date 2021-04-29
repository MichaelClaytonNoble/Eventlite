
import CreateEventForm from './create_event_form';
import {connect} from 'react-redux'; 
import {createEvent, clearErrors, getMyEventsByType, updateEvent} from '../../actions/events'; 
import { CREATE_EVENT_FORM_ERROR_LIST } from '../../reducers/selectors/error_selectors';
import {pullCategories} from '../../actions/categories'; 
import {TIMEZONES} from '../../constants/constants'; 

const mSTP = (state, ownProps) =>{
  let err = [];
  if (state.errors.events){
    err = state.errors.events;
  }
  return ({
    errors: err,
    errorList: CREATE_EVENT_FORM_ERROR_LIST,
    timezones: TIMEZONES,
    categories: Object.values(state.entities.categories),
    edit: (()=>{ if(ownProps.match.params.eventId){return true;} else{return false}})(),
    event: state.entities.events[ownProps.match.params.eventId]
  });
}

const mDTP = (dispatch, ownProps) =>{
  return({
    createEvent: (event)=>dispatch(createEvent(event)),
    updateEvent: (formEvent)=>dispatch(updateEvent(formEvent)),
    clearErrors: ()=>dispatch(clearErrors()),
    getCategories: ()=>dispatch(pullCategories()),
    getEvent: ()=> dispatch(getMyEventsByType('id', ownProps.match.params.eventId))
  })
}

const CreateEventFormContainer = connect(mSTP, mDTP)(CreateEventForm);
export default CreateEventFormContainer;