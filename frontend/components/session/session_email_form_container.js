
import {connect} from 'react-redux';
import { findUserByEmailForSession } from '../../actions/session';
import SessionEmailForm from './session_email_form';

const mSTP = (state, ownProps) =>{
  return ({
    emailExists: state.session.newSession.emailExists,
    formType: "emailForm"
  });
}

const mDTP = dispatch =>{
  return({
    findIfEmailExists: (email) => dispatch(findUserByEmailForSession(email))
  })
}

const SessionEmailFormContainer = connect(mSTP, mDTP)(SessionEmailForm);
export default SessionEmailFormContainer;