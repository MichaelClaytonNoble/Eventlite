import React from "react";
import { Link } from "react-router-dom";

class SessionSignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.email,
      password: "",
      first_name: "",
      last_name: "",
      emails: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorMessage = "";
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
  }

  render() {
    let passwordErr,
      emailErr,
      confirmEmailErr,
      firstErr,
      lastErr = "";
    if (this.props.errors) {
      this.props.errors.forEach((error) => {
        let err = this.props.errorList[error];
        let message = (
          <p id="session-error-message" className="form-error-message">
            {error}
          </p>
        );
        switch (err) {
          case "sessionPassword":
            return (passwordErr = message);
          case "sessionEmail":
            return (emailErr = message);
          case "sessionConfirmEmail":
            return (confirmEmailErr = message);
          case "sessionFirst":
            return (firstErr = message);
          case "sessionLast":
            return (lastErr = message);
          default:
            return;
        }
      });
    }
    let message,
      header = "";
    header = <h1 id="header">Welcome</h1>;
    message = <p id="session-login-message">Create an account.</p>;

    return (
      <div id="session-signup-form">
        <span id="session-form-header">
          <img id="header-image" src={window.stickMan} />
        </span>
        <form id="session-signup-info-form" onSubmit={this.handleSubmit}>
          {header}
          {message}
          <label className="session-form-input-label">
            <p>Email address</p>
            <input
              className="session-form-input"
              type="text"
              onChange={this.handleChange("email")}
              value={this.state.email}
            />
          </label>
          {emailErr}
          <label className="session-form-input-label">
            <p>Confirm email</p>
            <input
              className="session-form-input"
              type="text"
              onChange={this.handleChange("emails")}
              value={this.state.emails}
            />
          </label>
          {confirmEmailErr}
          <span id="session-signup-info-form-name">
            <label className="session-form-input-half-label">
              <p>First name</p>
              <input
                className="session-form-half-input"
                type="text"
                onChange={this.handleChange("first_name")}
                value={this.state.first_name}
              />
            </label>
            <label className="session-form-input-half-label">
              <p>Last name</p>
              <input
                className="session-form-half-input"
                type="text"
                onChange={this.handleChange("last_name")}
                value={this.state.last_name}
              />
            </label>
          </span>
          <span id="session-signup-info-form-name-error">
            <span>{firstErr}</span>
            <span>{lastErr}</span>
          </span>
          <label className="session-form-input-label">
            <p>Password</p>
            <input
              className="session-form-input"
              type="password"
              onChange={this.handleChange("password")}
              value={this.state.password}
            />
          </label>
          {passwordErr}

          <button id="session-form-submit" type="submit">
            Sign Up
          </button>
        </form>

        <Link to="/signin" id="link-to-signup-login">
          Log In Instead
        </Link>

        <p id="session-footer">
          By clicking "Sign Up" I accept the Eventlite Terms Of Service,
          <br /> Community Guidelines and have read the Privacy Policy.
        </p>
      </div>
    );
  }
}

export default SessionSignupForm;
