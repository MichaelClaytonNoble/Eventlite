import TicketModal from './ticket_modal';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
const mSTP = state => ({
  modal: state.ui.modal,
});

const mDTP = dispatch => ({
  closeModal: ()=> dispatch(closeModal())
});


const TicketModalContainer = connect(mSTP, mDTP)(TicketModal); 
export default TicketModalContainer;