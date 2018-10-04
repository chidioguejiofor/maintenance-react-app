import { Form, Container, Header, Icon, Message } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopNav from '../Header';

const AuthForm = ({
  formType, handleSubmit, success, messageTitle,
  loading, handleChange, inputs, errorMessages,
  links
}) => (
  <div id="auth-form">
    <TopNav />
    <Container>
      <div className="form">
        <Form
          loading={loading}
          onSubmit={handleSubmit}
          error={!!errorMessages.length}
          success={success}
        >

          <Header as="h2" icon textAlign="center">
            <Icon name="user circle" />
            <Header.Content>{formType}</Header.Content>
          </Header>
          <Message
            header={messageTitle}
            error={!!errorMessages.length}
            success={success}
            list={errorMessages}
            hidden={!success && !errorMessages.length}
          />
          {inputs.map((input, index) => (
            <Form.Input
              key={index}
              label={input.placeholder}
              placeholder={input.placeholder}
              name={input.name}
              value={input.value}
              onChange={handleChange}
              type={input.type}
            />
          ))}
          <Form.Button
            disabled={success}
            positive
            content="Submit"
          />
          {links.map((linkObj, index) => (
            <span key={index} className="link">
              <Link to={linkObj.to}>{linkObj.caption}</Link>
            </span>

          ))}
        </Form>
      </div>

    </Container>
  </div>


);

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  formType: PropTypes.string,
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  success: PropTypes.bool,
  messageTitle: PropTypes.string,
  loading: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.object),
};
AuthForm.defaultProps = {
  formType: 'Sign Up',
  errorMessages: [],
  success: true,
  messageTitle: '',
  loading: false,
  links: [],
};
export default AuthForm;
