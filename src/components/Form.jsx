import { Form, Container, Header, Icon,
  Message, Image } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthForm = ({
  formTitle, handleSubmit, success, messageTitle,
  loading, handleChange, inputs, errorMessages,
  links, type, iconUrl, submitLoading,
}) => (
  <div id="auth-form">
    <Container>
      <div className={type}>
        <Form
          loading={loading}
          onSubmit={handleSubmit}
          error={!!errorMessages.length}
          success={success}
        >

          <Header as="h2" icon textAlign="center">
            {iconUrl ? null : <Icon name="user circle" />}
            <Header.Content>{formTitle}</Header.Content>
          </Header>
          {iconUrl ? <Image size="medium" centered src={iconUrl} /> : null}

          <Message
            className={success ? 'text-centered' : ''}
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
              src={input.src}
            />
          ))}
          <Form.Button
            disabled={success || submitLoading}
            positive
            content="Submit"
            loading={submitLoading}
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
  formTitle: PropTypes.string,
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  success: PropTypes.bool,
  messageTitle: PropTypes.string,
  loading: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  iconUrl: PropTypes.string,
  submitLoading: PropTypes.bool,
};
AuthForm.defaultProps = {
  formTitle: 'Sign Up',
  errorMessages: [],
  success: true,
  messageTitle: '',
  loading: false,
  links: [],
  type: 'auth',
  iconUrl: '',
  submitLoading: false,
};
export default AuthForm;
