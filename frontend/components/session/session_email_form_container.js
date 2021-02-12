
import {connect} from 'react-redux';
import { findUserByEmailForSession } from '../../actions/session';
import SessionEmailForm from './session_email_form';
import { selectSessionErrors } from '../../reducers/selectors/session_selectors';
const mSTP = (state, ownProps) =>{
  console.log(state);
  console.log(state.session);
  return ({
    emailExists: state.session.newSession.emailExists,
    errors: selectSessionErrors(state), 
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