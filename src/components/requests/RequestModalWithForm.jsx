
import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Form from '../Form';

const RequestModalWithForm = ({
  onSubmit,
  onChange,
  onClick,
  title, description, location, image,
  update,
  buttonLoading,
  success,
  loading,
  messageTitle,
  errorMessages,
  open,

}) => {
  const options = {
    iconUrl: image || 'https://image.flaticon.com/icons/svg/263/263128.svg',
    formTitle: update ? 'Update Request' : 'Create Request',
    handleSubmit: onSubmit,
    success,
    messageTitle,
    loading,
    handleChange: onChange,
    errorMessages,
    submitLoading: buttonLoading,
    inputs: [{
      name: 'title',
      placeholder: 'Title',
      value: title,
      type: 'text'
    },
    {
      name: 'description',
      placeholder: 'Description',
      value: description,
      type: 'text'
    },
    {
      name: 'location',
      placeholder: 'Location',
      value: location,
      type: 'text'
    },
    {
      name: 'image',
      src: image,
      type: 'file'
    }],
  };


  return (
    <span className="request-button">
      <Modal
        trigger={(
          <Button
            className={update ? 'update-btn' : 'create-btn'}
            color={update ? 'orange' : 'green'}
            size="small"
            content={update ? 'Update' : 'Create'}
            onClick={onClick}
          />
        )}
        open={open}
      >

        <Modal.Content>
          <Form {...options} />
        </Modal.Content>
      </Modal>

    </span>
  );
};

RequestModalWithForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  update: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  messageTitle: PropTypes.string.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
};

export default RequestModalWithForm;
