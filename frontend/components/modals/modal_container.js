
import {connect} from 'react-redux';
import { deleteEvent } from '../../actions/events';
import { closeModal} from '../../actions/modal'; 

import Modal from './modal';

const mSTP = state => {
  return ({
    modal: state.ui.modal
  });
}

const mDTP = dispatch => {
  return ({
    closeModal: ()=> dispatch(closeModal()),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId))
  });
}
const ModalContainer = connect(mSTP, mDTP)(Modal);
export default ModalContainer;