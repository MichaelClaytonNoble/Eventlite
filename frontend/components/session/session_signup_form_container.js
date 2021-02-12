
import {connect} from 'react-redux';
import {signup} from '../../actions/users';
import {selectUsersErrors} from '../../reducers/selectors/users_selectors';
import SessionSignupForm from './session_signup_form';

const mSTP = (state, ownProps) => {
  return ({
    errors: selectUsersErrors(state),
    formType: "signup"
  })
}

const mDTP = (dispatch) => { 
  return ({
    signup: (formUser)=> dispatch(signup(formUser))
  })
}

const SessionSignupFormContainer = connect(mSTP, mDTP)(SessionSignupForm)

export default SessionSignupFormContainer;