
import {connect} from 'react-redux';
import {signup} from '../../actions/users';
import {clearSessionErrors} from '../../actions/session';
import {selectAllErrors} from '../../reducers/selectors/session_selectors';
import SessionSignupForm from './session_signup_form';

const mSTP = (state, ownProps) => {
  return ({
    errors: selectAllErrors(state),
    formType: "signup"
  })
}

const mDTP = (dispatch) => { 
  return ({
    signup: (formUser)=> dispatch(signup(formUser)),
    clearErrors: () => dispatch(clearSessionErrors())
  })
}

const SessionSignupFormContainer = connect(mSTP, mDTP)(SessionSignupForm)

export default SessionSignupFormContainer;