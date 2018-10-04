import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthForm from '../../components/auth/AuthForm';
import { login as loginAction } from '../../actions/authAction';

/**
 *contains logic for the LoginPage.
 */
export class Login extends Component {
  /**
   * this creates a new instance of Login class.
   * The super constructor is called here and the state is initialized
   * @param {object} props contains the props sent from its parent
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * @param {object} newProps the props that is about to be received
   * @returns {void} performs an action and returns nothing
   *
   */
  componentWillReceiveProps(newProps) {
    const { history } = this.props;

    if (newProps.login.success) {
      setTimeout(() => {
        history.push('/dashboard');
      }, 3000);
    }
  }

  /**
   * this handles all the change events that occurs in this Login
   * component
   * @param {object} e contains info about the event
   * @param {object} param1 contains the value and other properties
   * of the target
   * @returns {void} handles the event and returns nothing
   */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /**
   *makes an api call once the form is submitted
   * @returns {void} dispatches an action and return void
   */
  handleSubmit() {
    const { username, password } = this.state;
    const { sendLoginRequest } = this.props;
    sendLoginRequest({ username, password, userType: 'client' });
  }

  /**
   * this renders a presentation component with values gotten from state
   *@returns {JSX} returns JSX to be rendered in the DOM
   */
  render() {
    const { username, password } = this.state;
    const { login } = this.props;
    const inputs = [
      {
        name: 'username',
        placeholder: 'Username',
        value: username
      },
      {
        name: 'password',
        placeholder: 'Password',
        value: password,
        type: 'password'
      }
    ];
    const links = [
      { caption: 'Sign Up', to: '/signup' },
      { caption: 'Reset Password', to: '/reset-password' }
    ];
    return (
      <AuthForm
        loading={login.isLoading}
        errorMessages={login.errors.errorMessages}
        messageTitle={login.errors.message || 'Login Successfully'}
        success={login.success}
        formType="Login"
        inputs={inputs}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        links={links}
      />
    );
  }
}

Login.propTypes = {
  sendLoginRequest: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};


export const mapStateToProps = ({ login }) => ({
  login,
});

export const mapDispatchToProps = dispatch => ({
  sendLoginRequest: user => dispatch(loginAction(user)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);