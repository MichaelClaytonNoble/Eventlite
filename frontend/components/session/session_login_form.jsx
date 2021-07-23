import React from "react";
import { Link } from "react-router-dom";

class SessionLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearErrors = false;
  }

  componentDidMount() {
    this.props.clearErrors();
    this.clearErrors = true;
    if (localStorage.email === undefined) {
      this.state.email = "";
    } else {
      this.state.email = localStorage.email;
    }
    localStorage.clear();
  }
  componentWillUnmount() {
    this.props.clearErrors();
  }
  componentDidUpdate() {
    localStorage.email = this.state.email;
    if (this.clearErrors) {
      this.props.clearErrors();
    }
    this.clearErrors = false;
  }

  handleSubmit(e) {
    this.props.login(this.state);
    this.setState();
  }

  handleChange(field) {
    return (e) => {
      this.clearErrors = true;
      this.setState({ [field]: e.target.value });
    };
  }
  handleEmail(e) {
    localStorage.email = e.target.value;
  }

  render() {
    let message,
      header,
      or = "";

    header = <h1 id="header">Welcome back</h1>;
    message = (
      <p id="session-login-message">Please enter your password to log in.</p>
    );

    return (
      <div id="session-login-form">
        <span id="session-form-header">
          <img id="header-image" src={window.stickMan} />
        </span>
        <form id="session-form" onSubmit={this.handleSubmit}>
          {header}
          {message}
          <label className="session-form-input-label">
            <p>Email address</p>
            <input
              className="session-form-input"
              type="text"
              required
              onChange={this.handleChange("email")}
              value={this.state.email}
            />
          </label>
          <label className="session-form-input-label">
            <p>Password</p>
            <input
              className="session-form-input"
              type="password"
              onChange={this.handleChange("password")}
            />
          </label>
          <ul id="session-login-form-errors">
            {this.props.errors.map((error, i) => {
              return <li key={i}>{error}</li>;
            })}
          </ul>
          <button id="session-form-submit">Log in</button>
        </form>
        <Link to="/signin/signup" id="link-to-signup-login">
          Sign Up
        </Link>
      </div>
    );
  }
}
export default SessionLoginForm;
