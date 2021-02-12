
import {connect} from 'react-redux';
import { findUserByEmailForSession, login } from '../../actions/session';
import SessionEmailForm from './session_email_form';
import { selectSessionErrors } from '../../reducers/selectors/session_selectors';
const mSTP = (state, ownProps) =>{
  return ({
    emailExists: state.session.newSession.emailExists,
    errors: selectSessionErrors(state), 
    formType: "emailForm"
  });
}

const mDTP = dispatch =>{
  const formUser = {
    email: "Example.Account@demo.com",
    password: "123456"
  }
  return({
    findIfEmailExists: (email) => dispatch(findUserByEmailForSession(email)),
    demoLogin: () => dispatch(login(formUser))
  })
}

const SessionEmailFormContainer = connect(mSTP, mDTP)(SessionEmailForm);
export default SessionEmailFormContainer;