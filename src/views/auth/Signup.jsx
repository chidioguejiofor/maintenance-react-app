import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import { signUp as signUpAction } from '../../actions/authAction';
import Header from '../../components/Header';
/**
 *contains logic for the LoginPage.
 */
export class SignUp extends Component {
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
      email: '',
    };

    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   *
   * this calls resetPage function that dispatches an action to reset
   * the signup store
   *@returns {void} resets the signup redux state and returns void
   */
  componentWillUnmount() {
    const { resetPage } = this.props;
    resetPage();
  }

  /**
   * @param {object} newProps the props that is about to be received
   * @returns {void} performs an action and returns nothing
   *
   */
  componentWillReceiveProps(newProps) {
    const { history } = this.props;

    if (newProps.signup.success) {
      setTimeout(() => {
        history.push('/login');
      }, 1500);
    }

    if (newProps.signup.errors.statusCode === 409) {
      newProps.signup.errors.errorMessages.push('Try Again');
    }
  }


  /**
   * this handles all the change events that occurs in this Login
   * component
   * @param {obejct} e contains info about the event
   * @param {object} param1 contains the value and other properties
   * of the targe
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
    const { username, password, email } = this.state;
    const { sendSignUpRequest } = this.props;
    sendSignUpRequest({ username, password, email, userType: 'client' });

    // dispatch action here
  }

  /**
   * this renders a presentation component with values gotten from state
   *@returns {JSX} returns JSX to be rendered in the DOM
   */
  render() {
    const { username, password, email } = this.state;
    const inputs = [
      {
        name: 'email',
        placeholder: 'Email',
        value: email,
        type: 'email'
      },
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
      },

    ];
    const { signup } = this.props;

    const links = [
      { caption: 'Login', to: '/login' },
    ];

    return (
      <div>
        <Header />
        <Form
          loading={signup.isLoading}
          errorMessages={signup.errors.errorMessages}
          messageTitle={signup.errors.message || signup.data.message}
          success={signup.success}
          inputs={inputs}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          links={links}
        />
      </div>

    );
  }
}

SignUp.propTypes = {
  sendSignUpRequest: PropTypes.func.isRequired,
  signup: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  resetPage: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ signup }) => ({
  signup,
});

export const mapDispatchToProps = dispatch => ({
  sendSignUpRequest: user => dispatch(signUpAction(user)),
  resetPage: () => {
    dispatch({ type: 'SIGN_UP_RESET' });
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
