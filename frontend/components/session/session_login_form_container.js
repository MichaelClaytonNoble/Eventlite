import { connect } from "react-redux";
import { login, clearSessionErrors } from "../../actions/session";
import { selectSessionErrors } from "../../reducers/selectors/session_selectors";
import SessionLoginForm from "./session_login_form";

const mSTP = (state, ownProps) => {
  return {
    errors: selectSessionErrors(state),
    formType: "login"
  };
};

const mDTP = (dispatch) => {
  return {
    login: (formUser) => dispatch(login(formUser)),
    clearErrors: () => dispatch(clearSessionErrors())
  };
};

const SessionLoginFormContainer = connect(mSTP, mDTP)(SessionLoginForm);

export default SessionLoginFormContainer;
