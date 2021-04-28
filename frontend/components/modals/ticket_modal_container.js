import TicketModal from './ticket_modal';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import {createRegistration} from '../../actions/registrations';


const mSTP = state => ({
  modal: state.ui.modal,
});

const mDTP = dispatch => ({
  closeModal: ()=> dispatch(closeModal()),
  createRegistration: registration => dispatch(createRegistration(registration))
});


const TicketModalContainer = connect(mSTP, mDTP)(TicketModal); 
export default TicketModalContainer;