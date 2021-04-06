
import {connect} from 'react-redux';
import { deleteEvent } from '../../actions/events';
import { closeModal} from '../../actions/modal'; 

import Modal from './modal';

const mSTP = state => {
  return ({
    modal: state.ui.modal,
    myId: state.session.currentUser.id
  });
}

const mDTP = (dispatch, ownProps) => {

  return ({
    closeModal: ()=> dispatch(closeModal()),
    deleteEvent: (myId) => dispatch(deleteEvent(ownProps.eventId, myId))
  });
}
const ModalContainer = connect(mSTP, mDTP)(Modal);
export default ModalContainer;