import {connect} from 'react-redux'
import CreateTicketForm from './create_ticket_form'; 
import {CREATE_TICKET_FORM_ERROR_LIST} from '../../reducers/selectors/error_selectors';

const mSTP = state => ({

  errorList: CREATE_TICKET_FORM_ERROR_LIST
});

const mDTP = dispatch => ({


}); 


const CreateTicketFormContainer = connect(null, null)(CreateTicketForm);

export default CreateTicketFormContainer;