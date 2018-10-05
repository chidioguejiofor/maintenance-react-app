import React, { Component } from 'react';
import Form from '../../components/Form';
import Header from '../../components/Header';
/**
 *contains logic for the LoginPage.
 */
class SignUp extends Component {
  /**
   * this creates a new instance of Login class.
   * The super constructor is called here and the state is initialized
   * @param {object} props contains the props sent from its parent
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      success: false,
    };

    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = () => {};
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
   * this renders a presentation component with values gotten from state
   *@returns {JSX} returns JSX to be rendered in the DOM
   */
  render() {
    const { password, success, email } = this.state;
    const inputs = [
      {
        name: 'email',
        placeholder: 'Email',
        value: email,
        type: 'email'
      },
      {
        name: 'password',
        placeholder: 'New Password',
        value: password,
        type: 'password'
      },
      {
        name: 'confirm-password',
        placeholder: 'Confirm Password',
        value: password,
        type: 'password'
      },

    ];

    const errorMessages = [];
    const links = [
      { caption: 'Sign Up', to: '/signup' },
      { caption: 'Login', to: '/login' }
    ];
    return (
      <div>
        <Header />
        <Form
          formTitle="Reset Password"
          errorMessages={errorMessages}
          success={success}
          inputs={inputs}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          links={links}
        />
      </div>

    );
  }
}
export default SignUp;
