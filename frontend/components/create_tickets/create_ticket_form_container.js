import {connect} from 'react-redux'
import CreateTicketForm from './create_ticket_form'; 
import {CREATE_TICKET_FORM_ERROR_LIST} from '../../reducers/selectors/error_selectors';
import { createTicket } from '../../actions/tickets';

const mSTP = state => ({
  errors: state.errors.tickets,
  errorList: CREATE_TICKET_FORM_ERROR_LIST
});

const mDTP = (dispatch, ownProps) => ({
    createTicket: ticket=>dispatch(createTicket(Object.assign(ticket, {event_id: ownProps.match.params.eventId})))
});


const CreateTicketFormContainer = connect(mSTP, mDTP)(CreateTicketForm);

export default CreateTicketFormContainer;