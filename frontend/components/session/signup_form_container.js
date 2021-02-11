
import {connect} from 'react-redux';
import {signup} from '../../actions/users';
import selectUsersErrors from '../../reducers/selectors/users_selectors';
import SessionForm from './session_form';

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

const SignupFormContainer = connect(mSTP, mDTP)(SessionForm)